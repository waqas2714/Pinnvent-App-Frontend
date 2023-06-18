import axios from "axios";
import { toast } from "react-toastify";

export const createProduct = async (Data) => {
  const response = await axios.post("http://localhost:5000/api/products", Data);
  if (response.statusText === "OK") {
    toast.success("User Registered Successfully!");
  }
  return response.data;
};

//Get Products
export const getProducts = async () => {
  const response = await axios.get("http://localhost:5000/api/products");
  
  return response.data;
};

//Delete Product
export const deleteProduct = async (id) => {
  const response = await axios.delete("http://localhost:5000/api/products/"+id);
  
  return response.data;
};

//Get Product
export const getProduct = async (id) => {
  const response = await axios.get("http://localhost:5000/api/products/"+id);
  
  return response.data;
};

//Update a Product
export const updateProduct = async (id,formData) => {
  const response = await axios.put("http://localhost:5000/api/products/"+id, formData);
  
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