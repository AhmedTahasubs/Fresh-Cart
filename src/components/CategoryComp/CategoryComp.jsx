import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function CategoryComp({product}) {
  return (
    <>
      {product?<Link to={`/categoryProduct/${product._id}?name=${product.name}`} className='col-span-6 md:col-span-4 lg:col-span-3  shadow-lg border-[1.5px] border-[--main-color] rounded-md overflow-hidden'>
        <img src={product.image} className='w-full object-cover h-[320px]' alt="" />
        <div className='flex justify-center items-center'>
            <h2 className='p-4 font-bold text-xl text-[--main-color]'>{product.name}</h2>
        </div>
      </Link>:<Loading/>}
    </>
  )
}
