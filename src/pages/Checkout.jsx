import React, { useState } from 'react'

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState({
    firstName: "",
    lastName: "",
    address:"",
    city:"",
    email:"",
    phone: "",
    state: "",
    country: "",
    postcode: ""
  });

  const handleOnChange = (event) => {
    const {name, value} = event.target.value;
    setCheckoutData( (prevFormData)=> ({
      ...prevFormData,
      [name]: value 
    }))
   }

    const handleCheckout = (event) => {
      event.preventDefault();

      console.log(checkoutData);
      setCheckoutData({
    firstName: "",
    lastName: "",
    address:"",
    city:"",
    email:"",
    phone: "",
    state: "",
    country: "",
    postcode: ""
  })

    }
    
  return (
    <>
    <div className="container mt-5">
    <h1 className="mb-4">Checkout</h1>
    <form onSubmit={handleCheckout}>
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <label htmlFor="first_name" className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            onChange={handleOnChange}
            value={checkoutData.firstName}
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="last_name" className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
             onChange={handleOnChange}
             value={checkoutData.lastName}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <label htmlFor="address_1" className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            name="address"
             onChange={handleOnChange}
             value={checkoutData.address}
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="city" className="form-label">City:</label>
          <input
            type="text"
            className="form-control"
            name="city"
             onChange={handleOnChange}
             value={checkoutData.city}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <label htmlFor="state" className="form-label">State:</label>
          <input
            type="text"
            className="form-control"
            name="state"
             onChange={handleOnChange}
             value={checkoutData.state}
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="postcode" className="form-label">Postcode:</label>
          <input
            type="text"
            className="form-control"
            name="postcode"
             onChange={handleOnChange}
             value={checkoutData.postcode}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <label htmlFor="country" className="form-label">Country:</label>
          <input
            type="text"
            className="form-control"
            name="country"
             onChange={handleOnChange}
             value={checkoutData.country}
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
             onChange={handleOnChange}
             value={checkoutData.email}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            name="phone"
             onChange={handleOnChange}
             value={checkoutData.phone}
          />
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">Place Order</button>
      </div>
    </form>
  </div>
  
    </>
  )
}

export default Checkout