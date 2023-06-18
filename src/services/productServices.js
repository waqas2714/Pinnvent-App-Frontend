import axios from "axios";
import { toast } from "react-toastify";

export const createProduct = async (Data) => {
  const response = await axios.post("https://pinvent-app-backend-99s4.onrender.com/api/products", Data);
  if (response.statusText === "OK") {
    toast.success("User Registered Successfully!");
  }
  return response.data;
};

//Get Products
export const getProducts = async () => {
  const response = await axios.get("https://pinvent-app-backend-99s4.onrender.com/api/products");
  
  return response.data;
};

//Delete Product
export const deleteProduct = async (id) => {
  const response = await axios.delete("https://pinvent-app-backend-99s4.onrender.com/api/products/"+id);
  
  return response.data;
};

//Get Product
export const getProduct = async (id) => {
  const response = await axios.get("https://pinvent-app-backend-99s4.onrender.com/api/products/"+id);
  
  return response.data;
};

//Update a Product
export const updateProduct = async (id,formData) => {
  const response = await axios.put("https://pinvent-app-backend-99s4.onrender.com/api/products/"+id, formData);
  
  return response.data;
};

const productService ={
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct
}

export default productService