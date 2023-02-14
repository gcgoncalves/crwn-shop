import {
  createContext, 
  Dispatch, 
  ReactNode, 
  SetStateAction, 
  useState
} from 'react'
import SHOP_DATA from '../shop-data.json'

export interface Product {
  "id": number,
  "name": string,
  "imageUrl": string,
  "price": number
}

export type ProductContextType = {
  products: Product[],
  setProducts: Dispatch<SetStateAction<Product[]>>,
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => null,
})

export const ProductProvider = ({ children }: { children: ReactNode}) => {
  const [
    products, 
    setProducts
  ]: [
    Product[], 
    Dispatch<SetStateAction<Product[]>>
  ] = useState<Product[]>(SHOP_DATA)

  const value = { products, setProducts }
  
  return <ProductContext.Provider value={ value }>{ children }</ProductContext.Provider>
}