import React, { useState } from 'react'
import { registerStoreUser } from '../Api';
import { useNavigate } from "react-router-dom"
import { loginUser , getLoggedInUserData } from '../Api';
import { toast } from 'react-toastify';
const Auth = ({ setPageLoading, isAuthenticated, setUserData }) => {

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    login_username: "",
    login_password: ""
  });

  const [signupData, setSignupData] = useState({
    signup_name: "",
    signup_email: "",
    signup_username: "",
    signup_password: ""

  });

  const handleLoginInputChange =(event)=>{
         const {name, value} =  event.target;

         setLoginData((prevFormData) => ({
          ...prevFormData,
          [name]: value
         }))

  }

  const handleSignupInputChange =(event)=>{
         const {name, value} =  event.target;
             setSignupData((prevFormData) => ({
          ...prevFormData,
          [name]: value
         }))
  }

  const handleLoginSubmit = async(event) => {
    event.preventDefault();
    setPageLoading(true)
    try {

     const response = await loginUser({
        username: loginData.login_username,
        password: loginData.login_password
      })

      setLoginData({
      login_username: "",
      password: ""
    })

      console.log(response);

      localStorage.setItem("auth_token", response.token)
      isAuthenticated(true)
      toast.success("User Loggedin Successfully");

      // get user data
      
        const loggedInUserData = {}
        const userData = await getLoggedInUserData(response.token)
        console.log(userData)

        loggedInUserData.id = userData.id
        loggedInUserData.name = userData.name
        loggedInUserData.email = response.user_email
        loggedInUserData.username = response.user_nicename

        localStorage.setItem("user_data", JSON.stringify(loggedInUserData))

        setUserData(JSON.stringify(loggedInUserData))

      navigate('/products');
      
      
    } catch (error) {
      console.log(error)
      toast.error("Invalid login details")
    }finally{
       setPageLoading(false);
    }
    console.log(loginData);
    
  }

  const handleSignupSubmit  = async (event) => {
     event.preventDefault();
     setPageLoading(true);

     try {

      await registerStoreUser({
        name : signupData.signup_name,
        username: signupData.signup_username,
        email: signupData.signup_email,
        password: signupData.signup_password
      })
      setSignupData({
      signup_name: "",
      signup_email: "",
      signup_username: "",
      signup_password: ""
   })
   setPageLoading(false)
   toast.success("User Added in the System!")
      
     } catch (error) {
      console.log(error)
      
     }
     console.log(signupData);
     
  }

  return (
   <>
   <div className="container">
    <div className="toast-container"></div>
    <h1 className="my-4 text-center">Login / Signup</h1>
    <div className="row">
      <div className="col-md-6">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-3">
            <label htmlFor="loginUsername" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name="login_username"
              value={loginData.login_username}
              onChange={handleLoginInputChange}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
             name="login_password"
              value={loginData.login_password}
              onChange={handleLoginInputChange}
            />
          </div>
  
          <button type="submit" className="btn btn-primary mt-3">Login</button>
        </form>
      </div>
  
      <div className="col-md-6">
        <h2>Signup</h2>
        <form onSubmit={handleSignupSubmit}>
          <div className="mb-3">
            <label htmlFor="signupName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              name="signup_name"
              value={signupData.signup_name}
              onChange={handleSignupInputChange}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="signupEmail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name= "signup_email"
              value={signupData.signup_email}
              onChange={handleSignupInputChange}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="signupUsername" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name = "signup_username"
              value = {signupData.signup_username}
              onChange = {handleSignupInputChange}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="signupPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="signup_password"
              value={signupData.signup_password}
              onChange={handleSignupInputChange}
            />
          </div>
  
          <button type="submit" className="btn btn-success mt-3">Signup</button>
        </form>
      </div>
    </div>
  </div>
  
   </>
  )
}

export default Auth