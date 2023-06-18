import React, { useEffect } from 'react'
import useRedirectLoggedoutUser from '../../Custom Hooks/useRedirectLoggedoutUser'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from '../../redux/features/product/productSlice';
import ProductList from '../product/ProductList';
import ProductSummary from '../product/ProductSummary';

const Dashboard = () => {
  useRedirectLoggedoutUser("/login");
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {products, isLoading, isError, message} = useSelector((state)=>state.product)

  useEffect(()=>{
    if (isLoggedIn===true) {
      dispatch(getProducts());
    }
    
    if (isError) {
      console.log(message);
    }
  },[isLoggedIn,isError,message,dispatch])

  return (
    <div> 
        <ProductSummary products={products} />
        <ProductList products={products} isLoading={isLoading}/>
    </div>
  )
}

export default Dashboard