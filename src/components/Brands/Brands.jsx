import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../Loading/Loading';
import CategoryComp from '../CategoryComp/CategoryComp';
import BrandsComp from '../BrandsComp/BrandsComp';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
export default function Brands() {
  //using react query to fetch data from api
  function getProducts() {
    window.scrollTo(0,0)
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
  let {data,isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 60000,
  })
  if(isLoading){
    return <Loading/>
  }
  
  // using useEffect to fetch data from api
  // const[products,setProducts] = useState(null);
  // async function getProducts(){
  //   const options={
  //     url:"https://ecommerce.routemisr.com/api/v1/brands",
  //     method:"GET"
  //   }
  //   const {data} = await axios.request(options);
  //   setProducts(data.data)
  // } 
  // useEffect(()=>{
  //   // getProducts()
  //   window.scrollTo(0,0)   
  // },[])
  return (
    <>
    <Helmet>
      <title>Brands</title>
    </Helmet>
    <div className='container'>
    <h2 className='font-bold dark:text-gray-300 text-lg mb-3 before:h-5 before:w-1 before:bg-[--main-color] before:-left-2 before:top-1  before:absolute relative before:rounded-lg'>Brands</h2>
      <div className="grid grid-cols-12 gap-4">{data.data.data.map((product)=><BrandsComp key={product._id} product={product} />)}</div>
      </div>
    </>
  )
}
