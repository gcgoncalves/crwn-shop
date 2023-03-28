import { useEffect } from "react"
import { 
  Route, 
  Routes,
} from "react-router-dom"
import CategoryPreview from "../category-preview/category-preview.component"
import Category from "../category/category.component"
import { setCategories } from "../../store/category/category.action"
import { Category as CategoryType } from "../../store/category/category.types"
import { getCategories } from "../../util/firebase/firebase.util"
import { useAppDispatch } from "../../store/store.hooks"


const Shop = () => {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    (async () => {
      const categories: CategoryType[] = await getCategories()
      dispatch(setCategories(categories))
    })()
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoryPreview />} />
      <Route path='/:category' element={<Category />} />
    </Routes>
  )
}

export default Shop