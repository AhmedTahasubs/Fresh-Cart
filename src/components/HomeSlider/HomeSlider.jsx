import React from 'react'
import image1 from '../../assets/images/slider-image-1.jpeg'
import image2 from '../../assets/images/slider-image-2.jpeg'
import image3 from '../../assets/images/slider-image-3.jpeg'



export default function HomeSlider() {
  return (
  
  <>
        {/* 
            <swiper-slide>Slide 3</swiper-slide>
         */}
    <div className='grid grid-cols-12 mb-8'>
        <div className='col-span-8'>
            {/* <img src={image3}  className='w-full h-full' alt="" /> */}
            <div className='h-full cursor-grab active:cursor-grabbing'>
            <swiper-container style= {{height:"100%"}} loop={true}  autoplay={true} speed="500">
            <swiper-slide><img src={image3}  className='w-full h-full object-cover' alt="" /></swiper-slide>
            <swiper-slide><img src={image2}  className='w-full h-full object-cover' alt="" /></swiper-slide>
            <swiper-slide><img src={image1}  className='w-full h-full object-cover' alt="" /></swiper-slide>
            </swiper-container>
            </div>
        </div>
        <div className='col-span-4'>
            <div className='h-1/2'><img src={image2} className='w-full h-full' alt="" /></div>
            <div className='h-1/2'><img src={image1} className='w-full h-full' alt="" /></div>
        </div>
    </div>
  </>
  )
}
