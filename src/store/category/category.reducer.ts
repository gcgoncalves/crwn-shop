import { Action } from "../../util/recucer/reducer.util";
import { 
  CATEGORY_ACTION_TYPES, 
  CategoryState, 
  Category
} from "./category.types";

const INITIAL_STATE: CategoryState = {
  categories: [] as Category[]
}

export const categoryReducer = (state: CategoryState = INITIAL_STATE, { type, payload }: Action): CategoryState => {
  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
      return { 
        ...state, 
        categories: payload,
      }
    default:
      return state
  }
}