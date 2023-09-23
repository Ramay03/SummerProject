import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import Home from './page/Home'
import About from './page/About'
import Contact from './page/Contact'
import Product from './page/Product'
import Login from './page/Login'
import Register from './page/Register'
import Profile from './page/Profile'
import Admin from './page/Admin'
import Cart from './page/Cart'
import Address from './page/Address'
import Orderdetails from './page/OrderDetails'
import Search from './page/Search'
import { store } from './redux/index'
import { Provider } from 'react-redux'
import MyOrder from './page/MyOrder'
import { Orders } from './page/Orders'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element = {<App/>}>
        <Route index element = {<Home/>}/>
        <Route path='login' element = {<Login/>}/>
        <Route path='register' element = {<Register/>}/>
        <Route path='product' element = {<Product/>}/>
        <Route path='about' element = {<About/>}/>
        <Route path='contact' element = {<Contact/>}/>
        <Route path='cart' element = {<Cart/>}/>
        <Route path='address' element = {<Address/>}/>
        <Route path='orderdetails' element = {<Orderdetails/>}/>
        <Route path='myorder' element = {<MyOrder/>}/>
        <Route path='profile' element = {<Profile/>}/>
        <Route path='search' element = {<Search/>}/>
        <Route path='admin' element = {<Admin/>}/>
        <Route path='orders' element = {<Orders/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store = {store}>
  <RouterProvider router={router}/>
  </Provider>
);
