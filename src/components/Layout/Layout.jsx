import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {


  return (
      <>
        <Navbar/>
        <div className="bg-[url('/light-patten.svg')] min-h-[60vh] pb-5 pt-20 dark:bg-slate-800">
        <div className="container  px-4 md:px-0">
        <Outlet/>
        </div>
        </div>
        <Footer/>
      </>
  )
}
