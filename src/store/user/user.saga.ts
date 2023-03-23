import { 
  takeLatest, 
  all, 
  call, 
  put, 
} from 'redux-saga/effects'

import { USER_ACTION_TYPES } from './user.types'

import { signInSuccess, signInFailed } from './user.action'

import { User as FirebaseUser } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'
import { getCurrentUser, createUserDocumentFromAuth } from '../../util/firebase/firebase.util'

export function* getSnapshotFromUserAuth(
  userAuth: FirebaseUser, 
  additionalInformation: { displayName?: string } = {}
) {
  try {
    const userSnapshot: DocumentData = yield call(
      createUserDocumentFromAuth, 
      userAuth, 
      additionalInformation
    )
    yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
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

export function* onGetCurrentUser() {
  yield takeLatest(USER_ACTION_TYPES.GET_CURRENT_USER, isUserAuthenticated)
}

export function* userSaga() {
  yield all([call(onGetCurrentUser)])
}