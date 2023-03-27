import { 
  all, 
  call, 
  put, 
  takeLatest, 
} from 'redux-saga/effects'
import { User as FirebaseUser, UserCredential } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'

import { USER_ACTION_TYPES } from './user.types'
import { 
  signInFailed, 
  signInSuccess, 
  signOutFailed,  
  signOutSusccess,  
  signUpFailed, 
  signUpSuccess, 
} from './user.action'
import { 
  createAuthUserWithEmailAndPassword, 
  createUserDocumentFromAuth, 
  getCurrentUser, 
  signInWithGooglePopup, 
  signInWithUserEmailAndPassword,
  signOutUser, 
} from '../../util/firebase/firebase.util'
import { Action } from '../../util/recucer/reducer.util'

export function* getSnapshotFromUserAuth(
  userAuth: FirebaseUser, 
  additionalInformation: { displayName?: string } = {}
) {
  try {
    console.log('getting userSnapshot...')
    const userSnapshot: DocumentData = yield call(
      createUserDocumentFromAuth, 
      userAuth, 
      additionalInformation
    )
    console.log('userSnapshot:')
    console.log(userSnapshot)
    yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
  } catch(error: unknown) {
    yield put(signInFailed(error as Error))
  }
}

export function* signUp({ payload }: Action) {
  const { 
    email, 
    password, 
    displayName,
  } = payload as {
    email: string, 
    password: string, 
    displayName: string,
  }
  try {
    const { user }: UserCredential = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    )
    yield put(signUpSuccess(user, { displayName }))
  } catch(error: unknown) {
    yield put(signUpFailed(error as Error))
  }
}

export function* signInAfterSignUp({ payload }: Action) {
  console.log(payload)
  const { 
    user, 
    additionalInformation 
  } = payload as { 
      user: FirebaseUser, 
      additionalInformation: {
        displayName: string
      }
  } 
  console.log('unpack success')

  try {
    yield call(getSnapshotFromUserAuth, user, additionalInformation)
  } catch(error: unknown) {
    yield put(signInFailed(error as Error))
  } 
}

export function* isUserAuthenticated() {
  try {
    const user: FirebaseUser | null = yield call(getCurrentUser)
    if (!user) return;
    yield call(getSnapshotFromUserAuth, user)
  } catch(error: unknown) {
    yield put(signInFailed(error as Error))
  }
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup)
    yield call(getSnapshotFromUserAuth, user)
  } catch(error: unknown) {
    yield put(signInFailed(error as Error))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail(action: Action) {
  const { email, password } = action.payload as { email: string, password: string }
  try {
    const { user } = yield call(
      signInWithUserEmailAndPassword, 
      email, 
      password
    )
    yield call(getSnapshotFromUserAuth, user)
  } catch(error: unknown) {
    yield put(signInFailed(error as Error))
  }
}

export function* signOut() {
  try {
    yield call(signOutUser)
    yield put(signOutSusccess())
  } catch (error: unknown) {
    yield put(signOutFailed(error as Error))
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onGetCurrentUser() {
  yield takeLatest(USER_ACTION_TYPES.GET_CURRENT_USER, isUserAuthenticated)
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga() {
  yield all([
    call(onGetCurrentUser), 
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ])
}