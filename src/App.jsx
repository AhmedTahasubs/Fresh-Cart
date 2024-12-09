import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Error404 from './components/Error404/Error404'
import "flowbite-react"
import "flowbite"
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import UserProvider from './Context/User.Context'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartProvider from './Context/Cart.context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CategoryProduct from './components/CategoryProduct/CategoryProduct'
import BrandProduct from './components/BrandProduct/BrandProduct'
import Checkout from './components/Checkout/Checkout'
import Orders from './components/Orders/Orders'
import Wishlist from './components/Wishlist/Wishlist'
import WishlistProvider from './Context/Wishlist.context'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'


function App() {
  let Query = new QueryClient()
 let router =  createBrowserRouter([
    {path:'/',element:<ProtectedRoute><Layout/></ProtectedRoute> ,children:[
      {index:true,element:<Home/>},
      {path:'cart',element:<Cart/>},
      {path:'products',element:<Products/>},
      {path:'categories',element:<Categories/>},
      {path:'categoryProduct/:id',element:<CategoryProduct/>},
      {path:'details/:id',element:<ProductDetails/>},
      {path:'brands',element:<Brands/>},
      {path:'brandProduct/:name',element:<BrandProduct/>},
      {path:'checkout',element:<Checkout/>},
      {path:'allorders',element:<Orders/>},
      {path:'wishlist',element:<Wishlist/>},
      {path:'*',element:<Error404/>}
    ]},
    {path:'/auth',element:<Layout/>,children:[
      {path:'register',element:<Register/>},
      {path:'login',element:<Login/>},
      {path:'forgotPassword', element:<ForgotPassword/>},
      {path:'verify',element:<VerifyResetCode/>},
      {path:'reset',element:<ResetPassword/>},
    ]}
  ])
  return (
    <>
    

    
  <QueryClientProvider client={Query}>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router}/>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
  </QueryClientProvider>
          <Toaster position='top-left'/>
    </>
  )
}

export default App
