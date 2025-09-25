import { useParams } from "react-router-dom"

import { getSingleProduct } from "../Api";
import { useState, useEffect } from "react";
import { myStoreHook } from "../MyStoreContext";
const SingleProduct = ({ onAddToCart, setPageLoading }) => {

const {id} = useParams();
const [singleProducts, setSingleProduct] = useState({});
console.log(id);
const { renderProductPrice} = myStoreHook()
useEffect ( () => {

  const fetchSingleProdDetails = async() => {

    setPageLoading(true);
      const data = await getSingleProduct(id);
      console.log(data);
      setSingleProduct(data);

      setPageLoading(false);
  }

    fetchSingleProdDetails();
    console.log(singleProducts);

  }, [id]);

  

  return (
    <>
    <div className="container my-5">
    <div className="row">
     
      <div className="col-md-6">
        <div className="card">
          <img className="card-img-top" src={singleProducts?.images?.[0]?.src} alt="Product Name" />
        </div>
      </div>
      
      <div className="col-md-6">
        <h1 className="my-4">{ singleProducts.name }</h1>
        <div className="mb-4" dangerouslySetInnerHTML={{
          __html: singleProducts.description
        }}>


          
        </div>
        <div className="mb-4">
          <h5>Price:</h5>
          {renderProductPrice(singleProducts)}
        </div>
        <div className="mb-4">
          <h5>Category:  {singleProducts?.categories?.map( (singleCategory) => singleCategory.name ).join(", ")} </h5>
        </div>
        <button className="btn btn-primary mt-4" onClick={ () => onAddToCart(singleProducts)}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
    </>
  )
}

export default SingleProduct