import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/User.Context';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../Loading/Loading';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Orders() {
    const [orders,setOrders] = useState(null)
    let navigate = useNavigate()
    let {token} = useContext(userContext)
    let {id} = jwtDecode(token)
    async function getUserOrders(){
       try {
        const options={
            url:`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method:'GET',
        }
        const {data} = await axios.request(options)
        setOrders(data)
       } catch (error) {
       }
    }
    useEffect(()=>{
        getUserOrders()
        window.scrollTo(0,0)   
    },[])
  return (
    <>
    <Helmet>
      <title>Orders</title>
    </Helmet>
      {orders==null?<Loading/>:(orders.length==0?<div className='text-center'>
          <img src="/add-to-cart.png" className='mx-auto w-1/3' alt="" />
          <p className='text-center text-3xl font-extrabold mb-4 dark:text-gray-300'>No Orders Found</p>
          <Link to="/" className='bg-[--main-color] text-white font-bold px-4 py-3 rounded-lg hover:text-white border border-[--main-color] active:scale-95'>Continue Shopping</Link>
        </div>:<section>
        <div className="text-center dark:text-gray-300 flex items-center justify-center gap-3 relative before:absolute before:bottom-0 before:left-[50%] before:w-24 before:rounded-lg before:h-1 before:top-full before:-translate-x-1/2 before:bg-[--main-color]">
          <i className="fa-solid fa-store text-2xl"></i>
          <h2 className="font-bold text-2xl">Your Orders</h2>
        </div>
        {orders.map((order,index)=><div key={order.id} className="order my-5 p-1">
          <header className='mb-2'>
            <div className=" flex flex-row justify-center gap-5 w-fit mx-auto dark:text-gray-300">
              <div className="flex flex-col text-center gap-5">
                <p className='text-lg font-bold'>
                  Order Number : <span className='font-light text-slate-500'>{index+1}</span>
                </p>
                <p className='text-lg font-bold'>
                  Created At : <span className='font-light text-slate-500'>{moment(order.createdAt).format("MMM D, YYYY")}</span>
                </p>
                {order.isDelivered?<span className='bg-[--main-color] w-fit px-4 py-1 mx-auto rounded-full text-white font-bold'>Delivered</span>:<span className='bg-blue-600 w-fit px-4 py-1 mx-auto rounded-full text-white font-bold'>On The Way</span>}
              </div>
              <div className="flex flex-col text-center gap-5">
                <p className='text-lg font-bold'>
                  OrderID : <span className='font-light text-slate-500'>{order.id}</span>
                </p>
                <p className='text-lg font-bold'>
                  Total Order Price : <span className='font-light text-[--main-color]'>{order.totalOrderPrice}</span>
                </p>
                {order.isPaid?<span className='bg-[--main-color] w-fit px-4 py-1 mx-auto rounded-full text-white font-bold'>Paid</span>:<span className='bg-red-600 w-fit px-4 py-1 mx-auto rounded-full text-white font-bold'>UnPaid</span>}
              </div>
            </div>
          </header>
          <div className='rounded-lg overflow-hidden border-[1px] w-full md:w-9/12 mx-auto table-auto border-b-[0px] border-[--main-color]'>
          <table className='w-full text-center font-bold table-fixed dark:text-gray-300 dark:bg-gray-800'>
            <thead className='items-center  bg-[--main-color] text-white'>
               <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>     
                <th>Subtotal</th>
                </tr>     
            </thead>
            <tbody>
                {order.cartItems.map((product)=>
                    <tr key={product._id} className='border-b border-[--main-color]'>
                    <td onClick={()=>{navigate(`/details/${product.product._id}`)}} className='cursor-pointer'><img className='w-16 md:ml-10' src={product.product.imageCover}  alt="" /></td>
                    <td onClick={()=>{navigate(`/details/${product.product._id}`)}} className='cursor-pointer'>{product.product.title.split(" ").slice(0,5).join(" ")}</td>
                    <td>EGP {product.price}</td>
                    <td>{product.count}</td>
                    <td>EGP {product.price*product.count}</td>
                    </tr>
                )}
            </tbody>
          </table> 
          </div>  
        </div>)}
      </section>)}
    </>
  );
}
