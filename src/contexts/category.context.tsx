import {
  createContext, 
  Dispatch, 
  ReactNode, 
  SetStateAction, 
  useEffect, 
  useState
} from 'react'
import { CategoryMap } from '../interfaces/category.interface'
import { getCategories } from '../util/firebase/firebase.util'

export type CategoryContextType = {
  categories: CategoryMap,
  setCategories: Dispatch<SetStateAction<CategoryMap>>,
}

export const CategoryContext = createContext<CategoryContextType>({
  categories: {},
  setCategories: () => null,
})

export const CategoryProvider = ({ children }: { children: ReactNode}) => {
  const [
    categories, 
    setCategories
  ]: [
    CategoryMap, 
    Dispatch<SetStateAction<CategoryMap>>
  ] = useState<CategoryMap>({})

  useEffect(() => {
    (async () => {
      const categoryMap: CategoryMap = await getCategories()
      setCategories(categoryMap)
    })()
  }, [])

  const value = { categories, setCategories }
  
  return <CategoryContext.Provider value={ value }>{ children }</CategoryContext.Provider>
}