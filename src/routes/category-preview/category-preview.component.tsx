import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContext } from "../../contexts/category.context";
import { CategoryMap } from "../../interfaces/category.interface";
import Product from "../../interfaces/product.interface";

import './category-preview.styles.scss'

const CategoryPreview = () => {
  const { categories }: { categories: CategoryMap } = useContext(CategoryContext)
  const categoryNames: string[] = Object.keys(categories)

  return (
    <React.Fragment>
    {
      categoryNames.map((categoryName: string) => 
        <React.Fragment key={ categoryName }>
          <h2><Link to={ `${categoryName}` }>{ categoryName.toUpperCase() }</Link></h2>
          <div className="products-container">
            {
              categories[categoryName]
                .slice(0, 4)
                .map((product: Product) => 
                  <ProductCard key={ product.id } product={ product } />
                )
            }
          </div>
        </React.Fragment>
      )
    }
    </React.Fragment>
  )
}

export default CategoryPreview;