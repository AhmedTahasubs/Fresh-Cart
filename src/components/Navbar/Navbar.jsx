import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import logo2 from "/freshcart-logo2.svg";
import { userContext } from "../../Context/User.Context";
import { cartContext } from "../../Context/Cart.context";
import { wishlistContext } from "../../Context/Wishlist.context";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
export default function Navbar() {
  const { token, logOut } = useContext(userContext);
  const [dark, setDark] =useState(false);
    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }
  let [isOpen, setIsOpen] = useState(false);
  const {cartInfo,getCartProducts} = useContext(cartContext);
  let {getWishlistProducts,wishlistInfo} = useContext(wishlistContext)
  useEffect(()=>{
    getCartProducts()
  },[])
  useEffect(()=>{
    getWishlistProducts()
  },[])

  return (
    <>   
      {/* flowbite navbar with button but the button is not working without refresh  ps. it worked after i edit the open-close state button when eng pancee taught us how to do it and now i dont need to refresh*/}
      <nav className="bg-slate-100 fixed top-0 left-0 right-0 p-3 px-5 shadow-lg z-[999] transition-all duration-700 dark:bg-slate-800 dark:text-white">
        <div className=" container flex flex-wrap items-center justify-start">
        <Link to="/" className="w-fit">
            <img src={!dark?logo:logo2} alt="" className="w-32 active:scale-95"
            onClick={() => {
              setIsOpen(false);
            }} />
          </Link>
          <button className="mr-5 ml-auto md:hidden"  onClick={()=> darkModeHandler()}>
                    { dark && <IoSunny /> // render sunny when dark is true
                    }
                    {!dark && <IoMoon /> // render moon when dark is false
                    }
          </button>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto grow`} id="navbar-default">
          {token ? (
              <ul className="flex flex-col md:flex-row text-left ">
                <li className="mx-3">
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] dark:text-gray-300 hover:before:w-full hover:font-bold before:transition-[width] before:duration-500 before:bg-[--main-color] before:absolute before:left-0 before:-bottom-1
            ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                    }}
                    to="/"
                    aria-current="page"
                    onClick={() => {
                      setIsOpen(false);
                    }}  
                  >
                    Home
                  </NavLink>
                </li>
                <li className="mx-3">
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] dark:text-gray-300 hover:before:w-full hover:font-bold before:transition-[width] before:duration-500 before:bg-[--main-color] before:absolute before:left-0 before:-bottom-1
            ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                    }}
                    to="/products"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Products
                  </NavLink>
                </li>
                <li className="mx-3">
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] dark:text-gray-300 hover:before:w-full hover:font-bold before:transition-[width] before:duration-500 before:bg-[--main-color] before:absolute before:left-0 before:-bottom-1
            ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                    }}
                    to="/categories"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="mx-3 ">
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] dark:text-gray-300 hover:before:w-full hover:font-bold before:transition-[width] before:duration-500 before:bg-[--main-color] before:absolute before:left-0 before:-bottom-1
            ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                    }}
                    to="/brands"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="mx-3 ">
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] dark:text-gray-300 hover:before:w-full hover:font-bold before:transition-[width] before:duration-500 before:bg-[--main-color] before:absolute before:left-0 before:-bottom-1
            ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                    }}
                    to="/allorders"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Orders
                  </NavLink>
                </li>
                <li className="md:ml-auto hidden md:block">
                <button className="md:mr-5"  onClick={()=> darkModeHandler()}>
                    { dark && <IoSunny /> // render sunny when dark is true
                    }
                    {!dark && <IoMoon /> // render moon when dark is false
                    }
                </button>
                </li>
                <li className="mt-2 md:mt-0">
                <Link to="/wishlist" className="mx-3 relative" onClick={()=>{setIsOpen(false);}}>
                <i className='fa-solid fa-heart-circle-check cursor-pointer text-[--main-color] text-xl'></i>
                <div className="h-5 w-5 rounded-full bg-red-600 text-white absolute -top-[2px] right-0 translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                {wishlistInfo? wishlistInfo.count:<i className="fa-solid fa-spinner fa-spin text-sm"></i>}
                </div>
                </Link>
                </li>
                <li className="mt-2 md:mt-0">
                <Link to="/cart" className="mx-3 relative" onClick={()=>{setIsOpen(false);}}>
                <i className='fa-solid fa-cart-shopping cursor-pointer text-[--main-color] text-xl '></i>
                <div className="h-5 w-5 rounded-full bg-red-600 text-white absolute -top-[2px] right-0 translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                {cartInfo? cartInfo.numOfCartItems:<i className="fa-solid fa-spinner fa-spin text-sm"></i>}
                </div>
                </Link>
                </li>
                <li className="mx-3 cursor-pointer">
                  <span onClick={logOut}>
                    <i className="fa-solid fa-right-from-bracket text-2xl active:scale-90"
                    onClick={() => {
                      setIsOpen(false);
                    }}></i>
                  </span>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col md:flex-row text-left">
                <li className="md:ml-auto hidden md:block">
                <button className="md:mr-5"  onClick={()=> darkModeHandler()}>
                    { dark && <IoSunny /> // render sunny when dark is true
                    }
                    {!dark && <IoMoon /> // render moon when dark is false
                    }
                </button>
                </li>
                <li className="mx-3 ">
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] dark:text-gray-300  hover:before:w-full hover:font-bold before:transition-[width] before:duration-500 before:bg-[--main-color] before:absolute before:left-0 before:-bottom-1
              ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                    }}
                    to="/auth/login"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="mx-3">
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] dark:text-gray-300 hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-[--main-color] before:absolute before:left-0 before:-bottom-1
              ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                    }}
                    to="/auth/register"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
