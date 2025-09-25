import { Link } from "react-router-dom";

const NavBar = ( { setLogout, cartItems, isAuthenticated }) => {

  
  return (
   <>
   <nav className="navbar navbar-expand-lg navbar-light">
    <div className='container'>
      
      <Link  className="navbar-brand" to ="/">My Store</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
           <Link  className="nav-link" to ="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link" to ="/products">Products</Link>
        </li>
        <li className="nav-item">
           <Link  className="nav-link" to ="/cart">
            Cart
            {
              isAuthenticated ? (<span className="badge pill bg-secondary">{ cartItems.length }</span> ) : (
                <span className="badge pill bg-secondary">0</span> 
              )
              
            }
            
          </Link>
        </li>

        {
          isAuthenticated ? (
              <>
              <li className="nav-item">
                <Link  className="nav-link" to ="/my-account">My Account</Link>
              </li>
              <li className="nav-item">
                <Link  className="nav-link" to ="/my-orders">My Orders</Link>
              </li>
              <li className="nav-item">
                <Link  className="nav-link" to ="/" onClick={ setLogout }>Logout</Link>
              </li>
              </>
          ) : (
               <li className="nav-item">
                 <Link  className="nav-link" to ="/login">Login/Signup</Link>
                </li>
              )
           }

      </ul>
    </div>

    </div>
  </nav>
  
   </>
  )
}

export default NavBar