import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify"
// create Context

const MyStoreContext = createContext();


export const MyStoreProvider = ({ children }) => {
     const [loader, setLoader] =  useState(false);
     const [cart, setCart] = useState([])
     const [isUserData, setUserData] = useState({})
     const [isAuthenticated, setIsAuthenticated] =  useState(false)
  

  useEffect (() =>{
    const token = localStorage.getItem("auth_token")
    if(token){
      setUserLoggedinStatus(true)
    }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || []
    setCart(cartItems)

    const logedInuser = localStorage.getItem("user_data") || []
    setUserData(logedInuser)

  }, [])

    const setPageLoading = (status) =>{
    setLoader(status);
  }

   const renderProductPrice = (product) => {
     if(product.sale_price){
      return <>
        <span className="text-muted text-decoration-line-through"> ${ product.regular_price } </span>
        <span className='text-danger'> ${ product.sale_price } </span>
      </>
     }
     
     return <>
      ${product.regular_price || product.price}
     </>
  }

         // Add to cart

  const addProductToCart = (product) =>{
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productExist = cart.find( item => item.id === product.id)
    if(productExist){
        productExist.quantity += 1
    }else{
        product.quantity = 1
        cart.push(product);
    }
    
    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify(cart))
    toast.success("Product added to cart!");
     console.log(product);
  }

  // Remove item from cart

  const removeItemFromCart = (product) => {


    if(window.confirm("Are you sure to delete an item?")){

      const updateCart = cart.filter((item) => item.id !== product.id)

      setCart(updateCart)
      localStorage.setItem("cart", JSON.stringify(updateCart ))
      toast.success("Product Removed from Cart!")
    }

  }

  // Set user Auth after Login

  const setUserLoggedinStatus = (status) =>{
    setIsAuthenticated(status)
  }

  // User Logout

  const setLogout = () =>{
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUserLoggedinStatus(false)
  }

  // Remove cart Items
  const clearCartItems = () => {
    localStorage.removeItem("cart")
    setCart([])
  }
  
    return(
        <MyStoreContext.Provider value={ { 
            setPageLoading,
            loader, 
            renderProductPrice,
            setLogout,
            isAuthenticated,
            setIsAuthenticated,
            cart,
            addProductToCart,
            removeItemFromCart,
            isUserData,
            setUserData,
            clearCartItems,
            setUserLoggedinStatus
            
            }} >
            { children }
        </MyStoreContext.Provider>
    )
}


// custom Hook

export const myStoreHook = () => useContext(MyStoreContext)