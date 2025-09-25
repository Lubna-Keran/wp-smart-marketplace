import { useState, useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router'


const Cart = ( { onReomveProduct, cart, isAuthenticated }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(cart)

  useEffect( ()=> {
    setCartItems(cart);
  },[cart])

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
  
  const calculateCartTotal = () => {
   return cartItems.reduce( (total, item) =>{
      const price = item.price ? parseFloat(item.price) : 0
      return total + (price * item.quantity)
    }, 0).toFixed(2)
  }

  const goToCheckout = () =>{
    if(isAuthenticated){
      navigate('/checkout')
    }else{
      navigate('/login')
    }

  }

  return (
    <>
       <div className="container">
          <h1 className="my-4">Cart</h1>
      
          <div id="cart-items">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Item Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              
              {
                cartItems.map((item, key)=>(
                  <tr key={key}>
                  <td><img src={item?.images?.[0].src} alt= {item.name} style={{
                    width: "50px",
                  }} /></td>
                  <td>{item?.name}</td>
                  <td>{ renderProductPrice(item) } </td>
                  <td>{item?.quantity}</td>
                  <td>
                  
                    <button className="btn btn-danger" onClick={ () => onReomveProduct(item)}>Remove</button>
                  </td>
                </tr>
                ))

                
              }
                
              </tbody>
            </table>
            <div className="row align-items-center">
              <div className="col">
                <h3>Total: ${ calculateCartTotal() }</h3>
              </div>
              <div className="col text-end">
                
                <button className="btn btn-success" onClick={() => {
                 goToCheckout();
                }}>Checkout</button>
              </div>
            </div>
          </div>
          <div id="empty-cart-message">
          {
            cartItems.length > 0 ? "" : ( <p>Your cart is empty.</p>)
          }
          </div>
        </div>
    </>
  )
}

export default Cart