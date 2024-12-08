import { useFormik } from 'formik'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cartContext } from '../../Context/Cart.context'
import { userContext } from '../../Context/User.Context'
import * as yup from "yup";
import axios from 'axios'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
export default function Checkout() {
    const [paymentMethod,setPaymentMethod] = useState(null)
    const {cartInfo} = useContext(cartContext)
    const {token} = useContext(userContext)
    const navigate = useNavigate()

    let validationSchema = yup.object({
      shippingAddress:yup.object(
      {
        details: yup
          .string()
          .required("Address is required")
          .min(5, "Too Short!"),
        phone: yup
          .string()
          .required("Phone is required.")
          .matches(/^01[0-2|5][0-9]{8}$/, "Invalid phone number format."),
        city: yup
        .string()
        .required("City is required.")
        .min(3, "Too Short!")
        .max(12, "Too Long!"),
      }),
      });
    async function handleCashOrder(values){
        let toastId = toast.loading("Processing...")
        try {
            const options={
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method:"POST",
                headers:{token},
                data:values
            }
            const {data } = await axios.request(options)
            if(data.status == "success")
            {
                toast.success("Order placed successfully")
                setTimeout(()=>{
                    navigate("/allorders")
                },1000)
            }
        } catch (error) {
        }
        finally{
            toast.dismiss(toastId)
        }
    }
    
    async function handleOnlinePayment(values){
       let toastId;
     try {
        const options={
            url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
            method:"POST",
            headers:{token},
            data:values
        }
        const {data } = await axios.request(options)
        if(data.status=="success"){
           toastId =  toast.loading("Redirecting...")
            setTimeout(() => {
                location.href = data.session.url
            },1000)
        }
     } catch (error) {
     }
    }  
    const formik = useFormik({
        initialValues:{
            shippingAddress:{
                details:"",
                phone:"",
                city:"",
            }
        },
        onSubmit:(values)=>{
            if(paymentMethod=="cash"){
                handleCashOrder(values)
            }
            else{
                handleOnlinePayment(values)
            }
        },
        validationSchema: validationSchema,
    })
    useEffect(()=>{
      window.scrollTo(0,0)
    },[])
  return (
    <>
    <Helmet>
      <title>Checkout</title>
    </Helmet>
    <form
      className="mx-auto text-center w-full lg:w-3/5 p-10"
      onSubmit={formik.handleSubmit}
    >
      <h3 className=" text-left text-2xl md:text-3xl lg:text-4xl my-3 text-[--main-color]">
      <i className="fa-solid fa-cash-register"></i> Checkout Now
      </h3>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="shippingAddress.details"
          id="floating_name"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer border-[--main-color] focus:border-[--main-color]"
          placeholder=" "
        />
        {formik.errors.shippingAddress?.details && formik.touched.shippingAddress?.details ? (
          <p className="text-red-600">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {formik.errors.shippingAddress.details}
          </p>
        ) : null}
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 peer-focus:text-[--main-color] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          name="shippingAddress.phone"
          id="floating_phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer border-[--main-color] focus:border-[--main-color]"
          placeholder=" "
        />
                {formik.errors.shippingAddress?.phone && formik.touched.shippingAddress?.phone ? (
          <p className="text-red-600">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {formik.errors.shippingAddress.phone}
          </p>
        ) : null}
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 peer-focus:text-[--main-color] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="shippingAddress.city"
          id="floating_password"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer border-[--main-color] focus:border-[--main-color]"
          placeholder=" "
        />
                {formik.errors.shippingAddress?.city && formik.touched.shippingAddress?.city ? (
          <p className="text-red-600">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {formik.errors.shippingAddress.city}
          </p>
        ) : null}
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 peer-focus:text-[--main-color] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          City
        </label>
      </div>
      <div className='flex justify-between items-center'>
      <button
      onClick={()=>{setPaymentMethod("cash")}}
        type="submit"
        className="text-white bg-[--main-color]  font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95"
      >
      Pay On Delivery  <i className="fa-solid fa-truck"></i> 
      </button>
      <button
      onClick={()=>{setPaymentMethod("online")}}
        type="submit"
        className="text-white bg-[--main-color] h-[40px] font-medium rounded-lg text-sm overflow-hidden  text-center active:scale-95"
      >
        <div className='flex justify-center items-center gap-1 px-2 py-1'>
        <span>Pay Online</span>
         <img src="/visa.svg" className='w-1/4' alt="" />
        </div>
      </button>
      </div>
    </form>
    </>
  )
}
