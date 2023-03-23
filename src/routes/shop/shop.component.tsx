import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { 
  Route, 
  Routes,
} from "react-router-dom"
import { fetchCategoriesStart } from "../../store/category/category.action"
import CategoryPreview from "../category-preview/category-preview.component"
import Category from "../category/category.component"
import { useAppDispatch } from "../../store/store.hooks"


const Shop = () => {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(fetchCategoriesStart() as any)
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoryPreview />} />
      <Route path='/:category' element={<Category />} />
    </Routes>
  )
}

export default Shop