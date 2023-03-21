import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { 
  Route, 
  Routes,
} from "react-router-dom"
import { setCategories } from "../../store/category/category.action"
import { Category as CategoryType } from "../../store/category/category.types"
import { getCategories } from "../../util/firebase/firebase.util"
import CategoryPreview from "../category-preview/category-preview.component"
import Category from "../category/category.component"


const Shop = () => {
  const dispatch = useDispatch()
  
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