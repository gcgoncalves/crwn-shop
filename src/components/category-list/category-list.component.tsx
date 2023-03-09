import { Category } from '../category-item/category-item.component'
import CategoryItem from '../category-item/category-item.component';
import { CategoryListContainer } from './category-list.styles'

const CategoryList = (props: {categories: Category[]}) => {
  const categories = props.categories
  return (
    <CategoryListContainer>
      {
        categories.map((category: Category) => (
          <CategoryItem category={category}  key={category.id} />
        ))
      }
    </CategoryListContainer>
  )
}

export default CategoryList