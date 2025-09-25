import React, { useState, useEffect } from 'react'
import { useNavigate, useNavigation } from 'react-router'
import { getAllProducts } from '../Api';
import { myStoreHook } from '../MyStoreContext';
import { useQuery } from "@tanstack/react-query";
const Products = ({ onAddToCart, setPageLoading }) => {
  const navigate = useNavigate();
  const { renderProductPrice} = myStoreHook()
  //const [products, setProducts] = useState([]);


  const {
  data: products = [],
  isPending,
  isError,
  isFetching
} = useQuery({
  queryKey: ["products"],
  queryFn: getAllProducts,
});
  

if(isPending){
 setPageLoading(true);
}else{
setPageLoading(false)
}
    
// useEffect ( () => {
//       const fetchProducts = async()=> {
        
       
//         const data = await getAllProducts();
//         //setProducts(data);
//         console.log(data);
        
//      } 
//      fetchProducts();   
//   } , [])

 
  return (
    <>
     <div className="container">
    <h1 className="my-4">Products</h1>
    <div className="row">
      {
        products.map( (singleProduct, index) =>(
             <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card product-card">
          <img className="card-img-top" src={ singleProduct?.images[0].src } alt={singleProduct?.name} />
          <div className="card-body">
            <h5 className="card-title" style={{
              cursor:"pointer",
            }} onClick={() => { 
              navigate(`/product/${singleProduct?.id}`)
            }}>
              {singleProduct?.name}
            </h5>
            <p className="card-text">{ renderProductPrice(singleProduct) } </p>
            <p className="card-text" dangerouslySetInnerHTML={{
              __html: singleProduct?.description
            }}></p>
            <p className="card-text">Category: { singleProduct?.categories.map( (category) => category.name ).join(",") } </p>
             <button className="btn btn-primary" onClick={ () => onAddToCart(singleProduct) }>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
        ))
      }
     
      
    </div>
  </div>
    </>
  )
}

export default Products