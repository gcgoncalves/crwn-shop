import { Action } from "../../util/recucer/reducer.util";
import { 
  CATEGORY_ACTION_TYPES, 
  CategoryState, 
  Category
} from "./category.types";

const INITIAL_STATE: CategoryState = {
  categories: [] as Category[],
  loading: false,
  error: null
}

export const categoryReducer = (state: CategoryState = INITIAL_STATE, { type, payload }: Action): CategoryState => {
  switch (type) {
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { 
        ...state, 
        loading: true,
      }
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { 
        ...state, 
        categories: payload,
        loading: false,
      }
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { 
        ...state, 
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}