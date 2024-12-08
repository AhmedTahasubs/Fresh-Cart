import React, { useContext } from 'react'
import { cartContext } from '../../Context/Cart.context'
import { useNavigate } from 'react-router-dom'

export default function CartItem({productInfo}) {
    let navigate = useNavigate()
    const{count,price,product} = productInfo
    const{title,imageCover,id} = product
    let{removeProductFromCart,updateProductCount} = useContext(cartContext)
  return (
   <div className='container w-11/12'>
    <div className='cart-item flex items-center border border-x-0 p-3 dark:text-gray-300'>
       <img src={imageCover} onClick={
        ()=>{
          navigate(`/details/${id}`)
        }
       } className='w-2/6 md:w-1/6 mr-2 border-[1px] my-2 rounded-md border-[--main-color] cursor-pointer' alt="" />
       <div className='flex flex-wrap md:flex-nowrap items-center justify-between gap-5 w-full'>
       <div>
        <h2 onClick={
        ()=>{
          navigate(`/details/${id}`)
        }
       }
         className='text-2xl font-bold cursor-pointer'>{title}</h2>
        <p className='text-[--main-color] font-semibold my-3'>Price : <span className='font-thin text-slate-600 dark:text-gray-300'>EGP {price}</span></p>
        <button onClick={()=>removeProductFromCart({id:id})} className='font-semibold active:scale-95'><i className="fa-solid fa-trash-can text-[--main-color]"></i> Remove</button>
       </div>
       <div className='flex items-center gap-5'>
        <span onClick={()=>{updateProductCount({productId:id,count: count+1})}} className='w-8 h-8 flex justify-center items-center rounded-lg border-2 border-[--main-color] cursor-pointer active:scale-90'><i className="fa-solid fa-plus text-[--main-color]"></i></span>
        <p>{count}</p>
        <span onClick={()=>{updateProductCount({productId:id,count: count-1})}} className='w-8 h-8 flex justify-center items-center rounded-lg border-2 border-[--main-color] cursor-pointer active:scale-90'><i className="fa-solid fa-minus text-[--main-color]"></i></span>
       </div>
       </div>
      </div>
   </div>
  )
}
