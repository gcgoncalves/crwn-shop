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
  loading: boolean,
  error: unknown | null,
}

export const CATEGORY_ACTION_TYPES = {
  SET_CATEGORIES: 'category/SET_CATEGORIES',
  FETCH_CATEGORIES_START: 'category/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS: 'category/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED: 'category/FETCH_CATEGORIES_FAILED',
}