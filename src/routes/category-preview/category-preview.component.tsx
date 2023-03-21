import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProductCard from "../../components/product-card/product-card.component"
import { selectCategories } from "../../store/category/category.selector"
import Product from '../../store/category/category.types'

import { ProductsContainer } from './category-preview.styles'

const CategoryPreview = () => {
  const categories = useSelector(selectCategories)
  const categoryNames: string[] = Object.keys(categories)

  return (
    <React.Fragment>
    {
      categoryNames.map((categoryName: string) => 
        <React.Fragment key={ categoryName }>
          <h2><Link to={ `${categoryName}` }>{ categoryName.toUpperCase() }</Link></h2>
          <ProductsContainer>
            {
              categories[categoryName]
                .slice(0, 4)
                .map((product: Product) => 
                  <ProductCard key={ product.id } product={ product } />
                )
            }
          </ProductsContainer>
        </React.Fragment>
      )
    }
    </React.Fragment>
  )
}

export default CategoryPreview