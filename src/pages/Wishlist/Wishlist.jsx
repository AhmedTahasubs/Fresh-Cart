import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cartContext } from '../../Context/Cart.context'
import { wishlistContext } from '../../Context/Wishlist.context'
import { Helmet } from 'react-helmet'
import Loading from '../../components/Loading/Loading'
export default function Wishlist() {
    let {getWishlistProducts,wishlistInfo,removeProductFromWishlist} = useContext(wishlistContext)
    let {addProductToCart} = useContext(cartContext)
    let navigate = useNavigate()
    useEffect(()=>{
        getWishlistProducts()
        window.scrollTo(0,0)
      },[])
  return (
    <>
    <Helmet>
      <title>Wishlist</title>
    </Helmet>
      {wishlistInfo==null? <Loading/>: <section className=''>
        {wishlistInfo.count == 0 ?  <div className='text-center'>
          <img src="/empty_wishlist.svg" className='mx-auto w-1/3' alt="empty wishlist" />
          <p className='text-center text-3xl font-extrabold my-4 dark:text-gray-300'>Your Wishlist Is Empty</p>
          <Link to="/" className='bg-[--main-color] text-white font-bold px-4 py-3 rounded-lg hover:text-white border border-[--main-color] active:scale-95'>Continue Shopping</Link>
        </div>:<>
        <div className="text-center flex items-center dark:text-gray-300 justify-center gap-2 relative before:absolute before:bottom-0 before:left-[50%] before:w-24 before:rounded-lg before:h-1 before:top-full before:-translate-x-1/2 before:bg-[--main-color]">
        <i className="fa-solid fa-heart text-2xl text-[--main-color]"></i>
          <h2 className="font-bold text-2xl">Your Wishlist</h2>
        </div>
            <div className='rounded-lg overflow-hidden w-full md:w-8/12  border-[1px] mt-4 border-b-[0px] border-[--main-color] mx-auto'>
            <table className='w-full text-center font-bold table-fixed'>
              <thead className='items-center  bg-[--main-color] text-white'>
                 <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th></th>
                  </tr>     
              </thead>
              <tbody className='dark:text-gray-300'>
                  {wishlistInfo.data.map((product)=>
                      <tr key={product.id} className='border-b border-[--main-color]'>
                      <td onClick={()=>{navigate(`/details/${product.id}`)}} className='cursor-pointer'><img className='w-16 md:ml-10 p-1 rounded-lg' src={product.imageCover} alt="" /></td>
                      <td onClick={()=>{navigate(`/details/${product.id}`)}} className='cursor-pointer'>{product.title.split(" ").slice(0,5).join(" ")}</td>
                      <td>EGP {product.price}</td>
                      <td className='flex gap-2 flex-col items-center md:flex-row md:justify-center md:mt-5'>
                      <div className='w-10 h-10 rounded-full bg-[--main-color] text-lg text-white flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:rotate-12' onClick={(e)=>{addProductToCart({productId:product.id})}}><i className='fa-solid fa-cart-shopping'></i></div>
                      <div className='w-10 h-10 rounded-full bg-red-600 text-lg text-white flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:rotate-12' onClick={(e)=>{removeProductFromWishlist({id:product.id})}}><i className='fa-solid fa-trash-can'></i></div>
                        </td>
                      </tr>
                     )} 
              </tbody>
            </table> 
            </div>
            </>
        }
        </section>}
    </>
  )
}






                // <button 
                //             type="button" 
                //             className="text-white bg-[--main-color] font-bold rounded-lg text-sm my-2  active:scale-95 px-4 py-2"><i className='ml-1 fa-solid fa-cart-arrow-down'></i></button>


                //             <button 
                //             
                //             type="button" className="text-white bg-red-600 font-bold rounded-lg text-sm  my-2 active:scale-95 px-4 py-2"><i className="ml-1 fa-solid fa-trash-can"></i></button>           