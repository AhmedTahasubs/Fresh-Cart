import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../../components/Loading/Loading'
import CategoryComp from '../../components/CategoryComp/CategoryComp';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
export default function Categories() {
  const[products,setProducts] = useState(null);
  //using react query to fetch data from api
  function getCategories(){
    window.scrollTo(0,0)
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  let {data,isLoading}=useQuery({
  queryKey: ['categories'],
  queryFn:getCategories,
  staleTime: 60000,
  })
  if(isLoading){
    return <Loading/>
  }
  
  
  
  // using useEffect to fetch data from api
  // async function getProducts(){
  //   const options={
  //     url:"https://ecommerce.routemisr.com/api/v1/categories",
  //     method:"GET"
  //   }
  //   const {data} = await axios.request(options);
  //   setProducts(data.data)
  // }
  // useEffect(()=>{
  //   // getProducts()
  // },[])
  return (
    <>
    <Helmet>
      <title>Categories</title>
    </Helmet>
    <div className='container'>
    <h2 className='font-bold dark:text-gray-300 text-lg mb-3 before:h-5 before:w-1 before:bg-[--main-color] before:-left-2 before:top-1  before:absolute relative before:rounded-lg'>Categories</h2>
      <div className="grid grid-cols-12 gap-4">{data.data.data.map((product)=><CategoryComp key={product._id} product={product} />)}</div>
      </div>
    </>
  )
}
