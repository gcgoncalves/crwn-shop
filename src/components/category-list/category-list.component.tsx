import { Category } from '../category-item/category-item.component'
import CategoryItem from '../category-item/category-item.component';
import './category-list.styles.scss'

const CategoryList = (props: {categories: Category[]}) => {
  const categories = props.categories
  return (
    <div className="categories-container">
      {
        categories.map((category: Category) => (
          <CategoryItem category={category}  key={category.id} />
        ))
      }
    </div>
  )
}

export default CategoryList