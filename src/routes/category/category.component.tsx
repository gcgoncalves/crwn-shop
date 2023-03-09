import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContext } from "../../contexts/category.context";
import { CategoryMap } from "../../interfaces/category.interface";
import Product from "../../interfaces/product.interface";

import { CategoryTitle, ProductsContainer } from './category.styles'

const Category = () => {
  const { categories }: { categories: CategoryMap } = useContext(CategoryContext)
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
      <ProductsContainer>
        { products &&
          products.map((product: Product) => 
            <ProductCard key={ product.id } product={ product } />
          )
        }
      </ProductsContainer>
    </React.Fragment>
  )
}

export default Category