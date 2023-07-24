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
import { store } from './redux/index'
import { Provider } from 'react-redux'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element = {<App/>}>
        <Route index element = {<Home/>}/>
        <Route path='product' element = {<Product/>}/>
        <Route path='about' element = {<About/>}/>
        <Route path='contact' element = {<Contact/>}/>
        <Route path='cart' element = {<Cart/>}/>
        <Route path='login' element = {<Login/>}/>
        <Route path='register' element = {<Register/>}/>
        <Route path='profile' element = {<Profile/>}/>
        <Route path='admin' element = {<Admin/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store = {store}>
  <RouterProvider router={router}/>
  </Provider>
);
