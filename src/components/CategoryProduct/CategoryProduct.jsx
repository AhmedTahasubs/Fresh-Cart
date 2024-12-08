import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { cartContext } from '../../Context/Cart.context';
import ProductsCard from '../ProductsCard/ProductsCard';
import { Helmet } from 'react-helmet';

export default function CategoryProduct() {
    const[products,setProducts] = useState(null);
    let {id} = useParams() 
    const [queryParam,setQueryParam] = useSearchParams()
      async function getCategoryProducts(){
        const options={
          url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
          method:"GET"
        }
        const {data} = await axios.request(options);
        setProducts(data.data)
      }
      useEffect(()=>{
        getCategoryProducts()
        window.scrollTo(0,0)
      },[])

  return (
    <>
    <Helmet>
      <title>Categories | {queryParam.get("name")}</title>
    </Helmet>
    {products==null?<Loading/>:
    <>
    <section className='container'>
      <h2 className='font-bold text-lg dark:text-gray-300 mb-3 before:h-5 before:w-1 before:bg-[--main-color] before:-left-2 before:top-1  before:absolute relative before:rounded-lg'>Products</h2>
      {products.length==[]?<>   
       <h2 className='font-bold text-2xl bg-[#f0f3f2] p-5 rounded-md'>Products not found in fresh market database <i className="fa-solid fa-face-sad-tear"></i></h2>
      </>: <div className="grid grid-cols-12 gap-4">{products.map((product)=><ProductsCard key={product._id} product={product} />)}</div> }
    </section>
    </> }
  
    </>
  )
}
