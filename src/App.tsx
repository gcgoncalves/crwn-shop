import { useEffect } from "react"
import { Routes,  Route } from "react-router-dom"
import { User as FirebaseUser } from "firebase/auth"
import { NextFn } from "firebase/auth"

import Authentication from "./routes/authentication/authentication.component"
import { Category } from "./components/category-item/category-item.component"
import CategoryList from "./components/category-list/category-list.component"
import Checkout from "./routes/checkout/checkout.component"
import Home from "./routes/home/home.component"
import ProductDetails from "./routes/product-details/product-details.component"
import Shop from "./routes/shop/shop.component"
import { createUserDocumentFromAuth,  onAuthStateChangedListener } from "./util/firebase/firebase.util"
import { useDispatch } from "react-redux"
import { setCurrentUser } from "./store/user/user.action"

const startingCategories: Category[] = [
  {
    "id": 1,
    "title": "hats",
    "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
  },
  {
    "id": 2,
    "title": "jackets",
    "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
  },
  {
    "id": 3,
    "title": "sneakers",
    "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
  },
  {
    "id": 4,
    "title": "womens",
    "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
  },
  {
    "id": 5,
    "title": "mens",
    "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
  }
]

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const listener : NextFn<FirebaseUser | null> = (user: FirebaseUser | null) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user))
    }
    const unsubscribe = onAuthStateChangedListener(listener)
    return unsubscribe
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<CategoryList categories={startingCategories} />} />
        <Route path='/shop/*' element={<Shop />} />
        <Route path='/product' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/auth' element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App
