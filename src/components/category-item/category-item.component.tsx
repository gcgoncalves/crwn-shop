import { useNavigate } from 'react-router-dom'
import {
  CategoryContainer,
  BackgroundImage,
  CategoryBodyContainer,
  StyledH2,
  StyledP,
} from './category-item.styles'

export interface Category {
  id: number,
  title: string,
  imageUrl: string,
}


const CategoryItem = (props: {category: Category}) => {
  const category: Category  = props.category
  const navigate = useNavigate()

  return (
    <CategoryContainer onClick={ () => navigate(`shop/${category.title}`) }>
      <BackgroundImage imageUrl={ category.imageUrl }/>
      <CategoryBodyContainer>
        <StyledH2>{category.title}</StyledH2>
        <StyledP>Shop now</StyledP>
      </CategoryBodyContainer>
    </CategoryContainer>
  )
}

export default CategoryItem