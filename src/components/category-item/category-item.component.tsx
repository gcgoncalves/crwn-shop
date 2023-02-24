import './category-item.styles.scss'

export interface Category {
  id: number,
  title: string,
  imageUrl: string,
}

const CategoryItem = (props: {category: Category}) => {
  const category: Category  = props.category

  return (
    <div className="category-container">
      <div 
        className='background-image'
        style={{backgroundImage: `url(${category.imageUrl})`}} 
      />
      <div className="category-body-container">
        <h2>{category.title}</h2>
        <p>shop now</p>
      </div>
    </div>
  )
}

export default CategoryItem