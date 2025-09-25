import React, { useEffect, useState } from 'react'
import { getOrdersByUserId, getSingleOrderData, deleteOrder, createStoreProduct } from '../Api';
import swal from 'sweetalert'
const MyOrders = ({ isUserData,  setPageLoading }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [orderItems, setOrderItems] = useState([])
  const [singleOrderData, setSingleOrderData] = useState({})

  const fetchAllOrderDetails = async () => {
    
     setPageLoading(true)
    try {

      const userData = JSON.parse(isUserData);
      const response = await getOrdersByUserId(userData.id)
      console.log(response)
      setOrderItems(response)
      localStorage.setItem("OrderItems", JSON.stringify(response))
      
    } catch (error) {
      console.log(error)
      
    }
    finally{
       setPageLoading(false)
    }
  }

  useEffect( () => {
    const orderItems = JSON.parse(localStorage.getItem("OrderItems"))

    if(orderItems){
      setOrderItems(orderItems)
    }else{
      fetchAllOrderDetails()
    }
  }, [])

  const handleOrderRefresh = () =>{
    fetchAllOrderDetails()
  }

  const  showSingleOrderInfo = async (orderId) =>{
    setPageLoading(true)
   try {
      const response = await getSingleOrderData(orderId)
      console.log(response)
      setShowDetailsModal(true)
      setSingleOrderData(response)
    
   } catch (error) {
    console.log(error)
   }finally{
    setPageLoading(false)
   }
  }

  const deleteSingleOrder = (orderId) =>{
    
    setPageLoading(true)
    try {
      swal({
      title: "Are you sure?",
      text: "You want to delete this order?",
      dangerMode:true,
      buttons: true
      })
      .then( async(willDelete) => {
         setPageLoading(true)
        if(willDelete){
           const response = await deleteOrder(orderId)
           console.log(response)
           fetchAllOrderDetails()
            setPageLoading(false)

            swal("Deleted!","Your order has been deleted.",  "success");

        }else{
           setPageLoading(false)
        }
    
    });
     } catch (error) {
      console.log(error)
      
    }finally{
      setPageLoading(false)
    }
  }

  const handleAddProduct = async () => {

      const data = {
          "name": "Premium Quality 2",
          "type": "simple",
          "regular_price": "21.99",
          "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
          "short_description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
          "categories" : [ { id: 16 } ],
           "sku" : "premium-quality-2",
            "images" :
            [
              {
                "id": 114
              },
              {
                "src" : "http://localhost/headlessStore/wp-app/wp-content/uploads/2025/09/T_2_back.webp"
              }
            ],
            "sale_price" : "!8.99"
      }
      try {
        const response = await createStoreProduct(data)
        console.log(response)
        return response
        
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <>
      <div className="container">
    <h1>My Orders</h1>
    <button style={ { marginLeft: "5px" } } className="btn btn-primary mb-3 float-end" onClick={ handleOrderRefresh }>
      Refresh Orders
    </button>
    <button className="btn btn-primary mb-3 float-end" onClick={ handleAddProduct }>
      Add Product
    </button>
    <div id="orders-container">
      {
        orderItems.length > 0 ? (
          <>
                 <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date (M/D/Y)</th>
            <th>Status</th>
            <th>Total</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="orders-list">
          {
            orderItems.map((item, key) => (

                <tr key={key}>
                  <td>{ item.id }</td>
                  <td>{ new Date(item.date_created).toLocaleDateString() }</td>
                  <td>{ item.status }</td>
                  <td>{ item.currency_symbol }{ item.total } </td>
                  <td>
                    <ul>
                      {
                        item.line_items.map( (prod) => (<li key ={ prod.id }>{ prod.name } ({ prod.quantity })</li>) )
                      }
                      
                    </ul>
                  </td>
                  <td>
                    <button className="btn btn-info me-2" onClick={() => {
                      showSingleOrderInfo(item.id);
                    }}>View</button>
                    {
                      item.status == "pending" ? (<button className="btn btn-danger" onClick ={ () => {
                        deleteSingleOrder(item.id)
                      }} >Delete</button>) : ""
                    }
                    
                  </td>
               </tr>

            ))
          }
        
        
        </tbody>
      </table>
          
          </>
        ) : ( <p>No orders found.</p>)
      }
    </div>

    {
      showDetailsModal && (
                 <div id="order-details-modal" className="modal show d-block" style={{ display: "none"}} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Order Details</h5>
            <button type="button" className="btn-close" onClick={() => {
                setShowDetailsModal(false);
              }} ></button>
          </div>
          <div className="modal-body">
            <p><strong>Order ID:</strong> {singleOrderData.id}</p>
            <p><strong>Date:</strong> { new Date(singleOrderData.date_created).toLocaleDateString() } </p>
            <p><strong>Status:</strong> { singleOrderData.status }</p>
            <p><strong>Total:</strong> {singleOrderData.currency_symbol}{singleOrderData.total}</p>
            <p><strong>Items:</strong></p>
            <ul>
                      {
                        singleOrderData.line_items.map( (prod) => (<li key ={ prod.id }>{ prod.name } ({ prod.quantity })</li>) )
                      }
                      
                    </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => {
                setShowDetailsModal(false);
              }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
      )
    }
  


  </div>
    </>
  )
}

export default MyOrders