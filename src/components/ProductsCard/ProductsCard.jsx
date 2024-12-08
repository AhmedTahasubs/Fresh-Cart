import React, { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import CartProvider, { cartContext } from '../../Context/Cart.context'
import { wishlistContext } from '../../Context/Wishlist.context'

export default function ProductsCard({product}) {
    let navigate = useNavigate()
    let {addProductToCart} = useContext(cartContext)
    let {addProductToWishlist} = useContext(wishlistContext)
    const {images,title,price,category,ratingsAverage,_id}= product
  return (
    <>
    {product? <div className=' card-hover col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg border-[1.5px] border-[--main-color] rounded-md overflow-hidden dark:bg-gray-800 dark:text-gray-300'>
        <div  className='relative'>
        <img src={images[0]} className='w-full' alt="" />
        <div className="layer-hover absolute w-full h-full left-0 top-0 bg-black bg-opacity-15 flex justify-center items-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-500">
            <div className='w-10 h-10 rounded-full bg-[--main-color] text-lg text-white flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:rotate-12' onClick={(e)=>{
                addProductToWishlist({productId:_id})}}><i className='fa-solid fa-heart'></i></div>
            <div className='w-10 h-10 rounded-full bg-[--main-color] text-lg text-white flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:rotate-12' onClick={(e)=>{
                addProductToCart({productId:_id})}}><i className='fa-solid fa-cart-shopping'></i></div>
            <Link className='w-10 h-10 rounded-full bg-[--main-color] text-lg text-white flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:rotate-12' to={`/details/${_id}`}><i  className='fa-solid fa-eye text-white hover:text-white'></i></Link>
        </div>
        </div>
        <div onClick={(e)=>{
                <Loading/>
                navigate(`/details/${_id}`)
                }} className='p-3 cursor-pointer'>
            <h3 className='text-[--main-color] font-semibold '>{category.name}</h3>
            <h2 className='text-lg font-bold line-clamp-1'>{title}</h2>
            <div className='flex items-center justify-between mt-3'>
                <span>{price} EGP</span>
                <div className='flex items-center gap-1'>
                    <i className='fa-solid fa-star text-yellow-300'></i>
                    <span>{ratingsAverage}</span>
                </div>
            </div>
        </div>
       
    </div>:<Loading/>}
    </>
  )
}
