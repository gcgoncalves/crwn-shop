import { createAction } from "../../util/recucer/reducer.util"
import { CATEGORY_ACTION_TYPES, Category } from "./category.types"


export const setCategories = (categories: Category[]) => { 
  return createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categories)
}