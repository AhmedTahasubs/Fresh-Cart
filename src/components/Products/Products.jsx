import React, { useEffect, useState } from 'react'
import ProductsCard from '../ProductsCard/ProductsCard'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
export default function Products() {
  const[products,setProducts] = useState(null);
  // //
  const [currentPage, setCurrentPage] = useState(1);
  //using react query to fetch data from api
  // function getData() {
  //   window.scrollTo(0,0)
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}`)
  // }
  // let {data,isError,isLoading,error} = useQuery({
  //   queryKey:['recentProducts'],
  //   queryFn:getData,
  //   staleTime:60000,
  // })
  // if(isLoading){
  //   return <Loading />
  // }

  // using react query to fetch data from api
  async function getProducts(){
    const options={
      url:`https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}`,
      method:"GET"
    }
    const {data} = await axios.request(options);
    setProducts(data)
  }

  // function handleSearch(value){
  //   if(value==""){
  //     setSearchInput(data.data)
  //     console.log(searchInput);
  //   }
  //   else{
  //     setSearchInput(searchInput.filter(item => item.name.toLowerCase().includes(value.toLowerCase))) 
  //     console.log(searchInput);
  //   }
  // }
  //
  useEffect(()=>{
    window.scrollTo(0,0)
    getProducts()
  },[currentPage])
  return (
    <>
    <Helmet>
      <title>Products</title>
    </Helmet>
      {/* <div className='container  flex justify-center items-center text-black my-5 mb-7 w-full md:w-2/3'>
      <input type="text" name="" onInput={(e)=>{handleSearch(e.target.value)}} placeholder='Search By Name...' className='form-control border-[#0aad0a98] flex-grow focus:ring-0' id="" />
      </div> */}
      {products?<>
        <div className='container'>
          <h2 className='font-bold dark:text-gray-300 text-lg mb-3 before:h-5 before:w-1 before:bg-[--main-color] before:-left-2 before:top-1  before:absolute relative before:rounded-lg'>Products</h2>
          <div className="grid grid-cols-12 gap-4">{products?.data.map((product)=><ProductsCard key={product._id} product={product} />)}</div>
      </div>
      <div className="flex justify-center mt-5 "> 
        <button onClick={()=>{
          setProducts(null)
          if(currentPage<=1)
          {
            setCurrentPage(products.metadata.numberOfPages)
          }
          else
          {
            setCurrentPage(currentPage-1)
          }
        }} href="#" className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5H1m0 0 4 4M1 5l4-4" />
          </svg>
        </button>
        <button onClick={()=>{
          setProducts(null)
          if(currentPage>=products.metadata.numberOfPages)
          {
            setCurrentPage(1)
          }
          else
          {
            setCurrentPage(currentPage+1)
          }
        }}
        href="#" className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </div>
      </>:
      <Loading/>}
      


    </>
  )
}




