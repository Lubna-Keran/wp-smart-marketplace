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
import '../public/style.css';
import './Api.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  

  return (
    <>
    <Router>
      <NavBar />
    <Routes>
       <Route path="/" element= {<Home />} />
       <Route path="/products" element= {<Products />} />
       <Route path="/cart" element= {<Cart />} />
       <Route path="/checkout" element= {<Checkout />} />
       <Route path="/my-orders" element= {<MyOrders />} />
       <Route path="/my-account" element= {<MyAccount />} />
       <Route path="/login" element= {<Auth />} />
       <Route path='/product/:id' element = { <SingleProduct />} />
      </Routes>  
    </Router>
    
      
    </>
  )
}

export default App
