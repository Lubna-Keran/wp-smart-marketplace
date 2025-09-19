import { useNavigate, useNavigation } from 'react-router'


const Cart = () => {
  const navigate = useNavigate();
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
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         
          <tr>
            <td><img src="product-image.jpg" alt="Product Name" style={{
              width: "50px",
            }} /></td>
            <td>Product Name</td>
            <td>$25.00</td>
            <td>2</td>
            <td>
             
              <button className="btn btn-danger">Remove</button>
            </td>
          </tr>
          
        </tbody>
      </table>
      <div className="row align-items-center">
        <div className="col">
          <h3>Total: $50.00</h3>
        </div>
        <div className="col text-end">
          
          <button className="btn btn-success" onClick={() => {
            navigate('/checkout');
          }}>Checkout</button>
        </div>
      </div>
    </div>
    <div id="empty-cart-message">
      <p>Your cart is empty.</p>
    </div>
  </div>
      
    </>
  )
}

export default Cart