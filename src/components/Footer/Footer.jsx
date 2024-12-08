import React from 'react'
import amazonPayLogo from '../../assets/images/amazon-pay.png'
import americanExpressLogo from '../../assets/images/American-Express-Color.png'
import masterCardLogo from '../../assets/images/mastercard.webp'
import payPalLogo from '../../assets/images/paypal.png'
import googlPlay from '../../assets/images/get-google-play.png'
import appStore from '../../assets/images/get-apple-store.png'
export default function Footer() {
  return (
    <footer className='py-5 px-4 bg-slate-100 mt-auto dark:bg-slate-800 dark:text-gray-300'>
      <div className="container">
        <h2 className='text-3xl font-bold before:h-8 before:w-1 before:bg-[--main-color] before:-left-2 before:top-1  before:absolute relative before:rounded-lg'>Get the FreshCart App</h2>
        <p className='my-3 text-lg text-gray-500 font-thin'>We Will Send You a Link, open it on your phone to download the app</p>
        <div className='flex gap-4 flex-col md:flex-row'>
        <input type="text" name="" placeholder='Email...' className='form-control border-[#0aad0a98] flex-grow  focus:ring-0 dark:bg-transparent' id="" />
        <button className='btn-primary w-1/3 md:w-fit border border-[--main-color] active:scale-95'>Share App Link</button>
        </div>
        <hr className='my-8' />
      <div className='flex flex-col lg:flex-row gap-4 justify-between items-left mt-4 '>
        <div className='flex gap-2 flex-col items-left '>
          <span className='text-xl'>Payment Partners</span>
          <div className='flex gap-2 items-center'>
            <img src={amazonPayLogo} className='w-16 cursor-pointer' alt="" />
            <img src={americanExpressLogo} className='w-16 cursor-pointer' alt="" />
            <img src={masterCardLogo} className='w-16 cursor-pointer' alt="" />
            <img src={payPalLogo} className='w-16 cursor-pointer' alt="" />
          </div>
        </div>
        <div className='flex gap-2 flex-col items-left'>
          <span className='text-xl'>Get deliveries with FreshCart</span>
          <div className='flex gap-2 items-center'>
            <img src={googlPlay} className='w-32 cursor-pointer' alt="" />
            <img src={appStore} className='w-28 cursor-pointer' alt="" />
          </div>
        </div>
      </div>
        <hr className='my-8'/>
        <div className='flex text-center justify-center'>
          <ul className='flex flex-row gap-3 text-2xl '>
          <li className='mx-1'><i className='fa-brands fa-instagram cursor-pointer'></i></li>
          <li className='mx-1'><i className='fa-brands fa-facebook cursor-pointer'></i></li>
          <li className='mx-1'><i className='fa-brands fa-tiktok cursor-pointer'></i></li>
          <li className='mx-1'><i className="fa-brands fa-x-twitter cursor-pointer"></i></li>
          <li className='mx-1'><i className='fa-brands fa-linkedin cursor-pointer'></i></li>
          <li className='mx-1'><i className='fa-brands fa-youtube cursor-pointer'></i></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
