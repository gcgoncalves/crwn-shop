import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import ProductCard from "../../components/product-card/product-card.component"
import { Spinner } from "../../components/spinner/spinner.component"
import { selectCategories, selectCategoriesLoading } from "../../store/category/category.selector"
import Product, { CategoryMap } from "../../store/category/category.types"

import { CategoryTitle, ProductsContainer } from './category.styles'

const Category = () => {
  const categories: CategoryMap = useSelector(selectCategories)
  const loading: boolean = useSelector(selectCategoriesLoading)
  const { category } = useParams<{
    category: string
  }>()

  const [
    products, 
    setProducts
  ]: [
    Product[], 
    Dispatch<SetStateAction<Product[]>>
  ] = useState(categories[category as string])

  useEffect(() => setProducts(categories[category as string])
  , [category, categories])

  return (
    <React.Fragment>
      <CategoryTitle>{ category?.toUpperCase() }</CategoryTitle>
      {
        loading ? (<Spinner />) :
        (
          <ProductsContainer>
            { products &&
              products.map((product: Product) => 
                <ProductCard key={ product.id } product={ product } />
              )
            }
          </ProductsContainer>
        )
      }
    </React.Fragment>
  )
}

export default Category