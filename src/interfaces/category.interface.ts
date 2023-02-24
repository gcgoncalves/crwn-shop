import Product from "./product.interface";

export interface CategoryCollection {
  title: string,
  items: Product[],
}

export type CategoryMap = {
  [key: string]: Product[]
}