import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query';
export default function CategorySlider() {
  
  //using react query to fetch data from api
  function getCategories(){
    window.scrollTo(0,0)
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  let {data,isLoading}=useQuery({
    queryKey: ['categories'],
    queryFn:getCategories,
    staleTime: 60000,
  })
  if(isLoading){
    return <Loading/>
  }
  
  
  
  
  // using useEffect to fetch data from api
  // const[categories,setCategories] = useState(null);
  // async function getCategories(){
  //   const options={
  //     url:"https://ecommerce.routemisr.com/api/v1/categories",
  //     method:"GET"
  //   }
  //   const {data} = await axios.request(options);
  //   setCategories(data.data)
  // }
  let settings = {
    dots: true,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 728,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      }
    ]
  };
  // useEffect(()=>{
  //   getCategories()
  // },[])
  return (
    <>
        {/* last slider and it wasnt responsive */}
        {/* {categories? <section className='pb-8'>
        <h2 className='font-bold text-lg mb-3 before:h-5 before:w-1 before:bg-[--main-color] before:-left-2 before:top-1  before:absolute relative before:rounded-lg'>Shop Popular Categories</h2>
        <swiper-container  loop={true} slides-Per-View={6}  autoplay={true} speed="500">
        {categories.map((category)=><swiper-slide key={category._id}>
            <Link to={`/category/${category._id}`}><img src={category.image} className='w-full h-72 object-cover' alt="" />
            <h3>{category.name}</h3></Link>
        </swiper-slide>)}
        </swiper-container>
        </section>: <Loading/>} */}
        {/* best slider and its easy to resposive from slick react */}
        <section className='pb-8'>
        <h2 className='font-bold text-lg mb-3 before:h-5 before:w-1 before:bg-[--main-color] before:-left-2 before:top-1 dark:text-gray-300  before:absolute relative before:rounded-lg'>Shop Popular Categories</h2>
        <div className='slider-container dark:text-gray-300'>
        <Slider {...settings}>
        {data.data.data.map((category)=><div key={category._id}>
            <Link to={`/categoryProduct/${category._id}?name=${category.name}`}><img src={category.image} className='w-full h-72 object-cover' alt="" />
            <h3 className='dark:text-gray-300 font-semibold'>{category.name}</h3></Link>
        </div>)}
        </Slider>
        </div>
        </section>
    </>
  )
}