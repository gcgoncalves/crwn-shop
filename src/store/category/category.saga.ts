import { 
  takeLatest, 
  all, 
  call, 
  put, 
} from 'redux-saga/effects'
import { getCategories } from '../../util/firebase/firebase.util'
import {  
  fetchCategoriesSuccess,
  fetchCategoriesFailed, 
} from './category.action'
import { Category, CATEGORY_ACTION_TYPES } from './category.types'

export function* fetchCategoriesAsync() {
  try {
    const categories: Category[] = yield call(getCategories)
    yield put(fetchCategoriesSuccess(categories))
  } catch(error: unknown) {
    yield put(fetchCategoriesFailed(error))
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)])
}