import { useEffect } from "react"
import { 
  Route, 
  Routes,
} from "react-router-dom"
import CategoryPreview from "../category-preview/category-preview.component"
import Category from "../category/category.component"
import { fetchCategoriesAsync } from "../../store/category/category.action"
import { useAppDispatch } from "../../store/store.hooks"


const Shop = () => {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    (async () => {
      dispatch(fetchCategoriesAsync() as any)
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