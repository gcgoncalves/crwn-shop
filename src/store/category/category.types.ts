export default interface Product {
  "id": number,
  "name": string,
  "imageUrl": string,
  "price": number
}

export interface CategoryCollection {
  title: string,
  items: Product[],
}

export type Category = {
  title: string,
  items: Product[]
}

export type CategoryMap = {
  [key: string]: Product[]
}

export type CategoryState = {
  categories: Category[],
}

export const CATEGORY_ACTION_TYPES = {
  SET_CATEGORIES: 'category/SET_CATEGORIES',
}