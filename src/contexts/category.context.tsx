import {
  createContext, 
  Dispatch, 
  ReactNode, 
  useEffect, 
  useReducer, 
} from 'react'
import { CategoryMap } from '../interfaces/category.interface'
import Product from '../interfaces/product.interface'
import { getCategories } from '../util/firebase/firebase.util'
import { Action, createAction } from '../util/recucer/reducer.util'

export type CategoryStateType = {
  categories: CategoryMap,
}

export type CategoryContextType = {
  categories: CategoryMap,
  setCategories: Function,
}

export const CATEGORY_ACTION_TYPES = {
  SET_CATEGORIES: 'SET_CATEGORIES',
}

export const CategoryContext = createContext<CategoryContextType>({
  categories: {},
  setCategories: () => null,
})

const categoryReducer = (state: CategoryStateType, { type, payload }: Action) => {
  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
      return { 
        ...state, 
        categories: payload,
      }
    default:
      throw new Error(`Unhandled type ${type}`)
  }
}

const INITIAL_STATE = {
  categories: [] as Product[]
}

export const CategoryProvider = ({ children }: { children: ReactNode}) => {
  const [ { categories } , dispatch]: 
    [CategoryStateType, Dispatch<Action>] = useReducer(categoryReducer, INITIAL_STATE)

  const setCategories = (categoryMap: CategoryMap | null) => { 
    dispatch(createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoryMap))
  }

  useEffect(() => {
    (async () => {
      const categoryMap: CategoryMap = await getCategories()
      setCategories(categoryMap)
    })()
  }, [])

  const value = { categories, setCategories }
  
  return <CategoryContext.Provider value={ value }>{ children }</CategoryContext.Provider>
}