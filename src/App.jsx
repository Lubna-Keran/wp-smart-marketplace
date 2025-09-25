import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './layouts/NavBar'
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import MyAccount from './pages/MyAccount';
import Auth from './pages/Auth';
import SingleProduct from './pages/SingleProduct';
import Footer from './layouts/Footer.jsx';
import '../public/style.css';
import './Api.js'
import './assets/loading.css'
import Loader from './layouts/Loader.jsx';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify'
import { myStoreHook } from './MyStoreContext.jsx';
function App() {

  const { setPageLoading,
           loader,
           setLogout,
           isAuthenticated,
           setIsAuthenticated,
           cart,
           addProductToCart,
           removeItemFromCart,
           isUserData,
           setUserData,
           clearCartItems,
           setUserLoggedinStatus,
         } = myStoreHook()

  return (
    <>
    <Router>
      <NavBar setLogout ={ setLogout } isAuthenticated = { isAuthenticated } cartItems= { cart } />
      <div className='container'>

        <ToastContainer />

        { loader && <Loader /> }

        <Routes>
       <Route path="/" element= {<Home />} />
       <Route path="/products" element= {<Products onAddToCart = { addProductToCart } setPageLoading = { setPageLoading } />} />
       <Route path="/cart" element= {<Cart isAuthenticated = { isAuthenticated } onReomveProduct = { removeItemFromCart } cart = { cart } />} />
       <Route path="/checkout" element= {<Checkout isUserData ={ isUserData } clearCartItems = { clearCartItems } />} />
       <Route path="/my-orders" element= {<MyOrders isUserData = { isUserData } setPageLoading = { setPageLoading }  />} />
       <Route path="/my-account" element= {<MyAccount isUserData = { isUserData }/>} />
       <Route path="/login" element= {<Auth  setUserData = { setUserData }isAuthenticated = { setIsAuthenticated }  setPageLoading = { setPageLoading }  />} />
       <Route path='/product/:id' element = { <SingleProduct onAddToCart = { addProductToCart } setPageLoading = { setPageLoading } />} />
      </Routes> 
      </div>
     
      < Footer />
    </Router>
    
      
    </>
  )
}

export default App
