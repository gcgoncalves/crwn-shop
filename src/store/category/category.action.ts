import { Dispatch } from "redux"
import { getCategories } from "../../util/firebase/firebase.util"
import { createAction } from "../../util/recucer/reducer.util"
import { CATEGORY_ACTION_TYPES, Category } from "./category.types"

export const setCategories = (categories: Category[]) => { 
  return createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categories)
}

export const fetchCategoriesStart = () => { 
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, null)
}

export const fetchCategoriesSuccess = (categories: Category[]) => { 
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)
}

export const fetchCategoriesFailed = (error: unknown) => { 
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
}

export const fetchCategoriesAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchCategoriesStart())
  try {
    const categories = await getCategories()
    dispatch(fetchCategoriesSuccess(categories))
  } catch(error: unknown) {
    dispatch(fetchCategoriesFailed(error))
  }
}