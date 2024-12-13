import React, { useContext, useEffect } from 'react'
import Loading from '../../components/Loading/Loading'
import { cartContext } from '../../Context/Cart.context'
import empty from '/empty_cart.svg'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CartItem from '../../components/CartItem/CartItem'
export default function Cart() {
  let {getCartProducts,cartInfo,clearCart} =  useContext(cartContext)
   useEffect(()=>{
    getCartProducts()
    window.scrollTo(0,0)
  },[])
  return (
    <>
    <Helmet>
      <title>Cart</title>
    </Helmet>
      {cartInfo==null? <Loading/>: <section className=''>
        {cartInfo.numOfCartItems == 0 ?  <div className='text-center'>
          <img src={empty} className='mx-auto w-1/3' alt="emptyCart" />
          <p className='text-center text-3xl font-extrabold my-4 dark:text-gray-300'>Your Cart Is Empty</p>
          <Link to="/" className='bg-[--main-color] text-white font-bold px-4 py-3 rounded-lg hover:text-white border border-[--main-color] active:scale-95'>Continue Shopping</Link>
        </div>: 
       <>
        <div className='text-center flex items-center dark:text-gray-300 justify-center gap-3 relative before:absolute before:bottom-0 before:left-[50%] before:w-24 before:rounded-lg before:h-1 before:top-full before:-translate-x-1/2 before:bg-[--main-color]'>
        <i className='fa-brands fa-opencart text-2xl'></i>
        <h2 className='font-bold text-2xl'>Your Cart</h2>
      </div>
      <div className='flex items-center justify-around mt-5 '>
      <p className='text-[--main-color] font-semibold my-3'>Total Price : <span className='font-thin text-slate-600 dark:text-gray-300'>EGP {cartInfo.data.totalCartPrice}</span></p>
      <button onClick={clearCart} className='font-semibold active:scale-95 text-lg  bg-red-500 text-white px-3 py-[6px] rounded-lg'><i className="fa-solid fa-trash-can"></i> Clear Cart</button>
      </div>
        <div className='mt-4'>
          {cartInfo.data.products.map((product)=><CartItem key={product._id} productInfo={product}/>)}
        </div>
        <Link to="/checkout" className='bg-[--main-color] mt-5 w-fit mx-auto text-white font-bold px-4 py-3 rounded-lg hover:text-white border border-[--main-color] active:scale-95 flex justify-center items-center'><span>Checkout</span> <img className='w-8' src="/checkout.svg" alt="" /></Link>
        </>}
        </section>}
    </>
  )
}

