
import axios from "axios";
import CryptoJS from "crypto-js";
import { use } from "react";


const CONSUMER_KEY = "ck_7261ccd894964b6689cbd200d5ba77d8f6265195"
const CONSUMER_SECRET = "cs_0427bf94feb1c2266a320ddb39a4adf76bccbe4c"
const PROJECT_URL = "http://localhost/headlessStore/wp-app/"
const API_URL = PROJECT_URL + "wp-json/wc/v3"
const WP_USER_API_URL = `${PROJECT_URL}wp-json/wp/v2/users`

// Function to generate OAuth signature
const generateOAuthSignature = (url, method = 'GET', params = {}) => {
  const nonce = Math.random().toString(36).substring(2);
  const timestamp = Math.floor(Date.now() / 1000);

  const oauthParams = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_version: '1.0',
  };

  const allParams = { ...oauthParams, ...params };

  const paramString = Object.keys(allParams)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
    .join('&');

  const baseUrl = url.split('?')[0]; // Ensure no query params in the base URL
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(paramString)}`;
  const signingKey = `${encodeURIComponent(CONSUMER_SECRET)}&`;

  const signature = CryptoJS.HmacSHA1(baseString, signingKey).toString(CryptoJS.enc.Base64);

  return { ...oauthParams, oauth_signature: encodeURIComponent(signature) };
};

const api = axios.create({
    baseURL: API_URL
})

// get all products from woocommerce


export const getAllProducts = async () => {
    try {
        const url = `${API_URL}/products`
        const oauthParams = generateOAuthSignature(url);
        const response = await api.get("/products",{
            params: oauthParams
        })
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

// get single product data

export const getSingleProduct = async (productId) => {
    try {
        const url = `${API_URL}/products/${productId}`
        const oauthParams = generateOAuthSignature(url)
        const response = await api.get(`/products/${productId}`, {
            params: oauthParams
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

// Register User

export const registerStoreUser = async(userInfo) => {
    try {
        const response =  await api.post(WP_USER_API_URL, userInfo, {
            headers:{
                "Authorization" : "Basic " + btoa("admin:1234")
            }
        })
        return response.data
        
    } catch (error) {
        console.log(error)
        
    }
}

export const loginUser = async (userInfo) => {
    try {
        const response = await api.post(`${PROJECT_URL}wp-json/jwt-auth/v1/token`, userInfo)
             return response.data
        }
     catch (error) {
        console.log(error)
        
    }
}

// Create an Order in Woocommerce

export const createAnOrder = async(userInfo) => {
    try {
     const cartItems = JSON.parse(localStorage.getItem("cart")) || []

        if(!cartItems.length){
            console.log("Cart is empty")
            return false
        }
        
        const lineItems = cartItems.map( (item) => ({
             product_id: item.id,
            quantity: item.quantity
        }))
       
        const data = {
            ...userInfo,
            line_items: lineItems
        }

        const url = `${API_URL}/orders`
        const oauthParams = generateOAuthSignature(url, "POST")
        const oauthHeader = Object.keys(oauthParams).map( (key) => `${key}=${encodeURIComponent(oauthParams[key])}` ).join(", ")


        
         const response = await api.post("/orders", data, {
      headers: {
        Authorization: `OAuth ${oauthHeader}`
      }
    })
        
        return response.data

    } catch (error) {
        console.log(error)
    }


}

// To get User Data
export const getLoggedInUserData = async(token) => {

  try{

    const response = await api.get(`${WP_USER_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch(error){
    console.log(error)
  }
}

// Fetch all orders by user id

export const getOrdersByUserId = async(userId) => {
    try {
        const url = `${API_URL}/orders`
        const oauthParams =  generateOAuthSignature(url, "GET",{
            customer: userId
        })

        const response = await api.get("/orders", {
            params: {
                ...oauthParams,
                customer: userId
            }
        })

        return response.data
        
    } catch (error) {
        console.log(error)
        
    }

}

// get sinle order

export const getSingleOrderData = async (orderId) => {
    try {
        const url =     `${API_URL}/orders/${orderId}`
        const oauthParams = generateOAuthSignature(url)
        const response = await api.get(`orders/${orderId}`,{
            params: oauthParams
        })
        return response.data
        
    } catch (error) {
        console.log(error)
        
    }
}


export const deleteOrder = async(orderId) => {
  try{
    const url = `${API_URL}/orders/${orderId}`

    const oauthParams = generateOAuthSignature(url, "DELETE")
    
    // Generate OAuth Header
    const oauthHeader = Object.keys(oauthParams).map( (key) => `${key}="${ encodeURIComponent(oauthParams[key]) }"` ).join(", ")

    const response = await api.delete(`/orders/${orderId}`, {
      headers: {
        Authorization: `OAuth ${oauthHeader}`
      }
    })

    return response.data
  } catch(error){
    console.log(error)
  }
}

// Add product to woocommerce store
export const createStoreProduct = async (productData) => {
    try{
    const url = `${API_URL}/products`

    const oauthParams = generateOAuthSignature(url, "POST")
    
    // Generate OAuth Header
    const oauthHeader = Object.keys(oauthParams).map( (key) => `${key}="${ encodeURIComponent(oauthParams[key]) }"` ).join(", ")

    const response = await api.post("/products", productData, {
      headers: {
        Authorization: `OAuth ${oauthHeader}`
      }
    })

    return response.data
  } catch(error){
    console.log(error)
  }
}