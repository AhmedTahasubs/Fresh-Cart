import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { cartContext } from '../../Context/Cart.context';
import ProductsCard from '../ProductsCard/ProductsCard';
import { Helmet } from 'react-helmet';
export default function ProductDetails() {
  let {addProductToCart} = useContext(cartContext)
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null);
    const[products,setProducts] = useState(null);
    const[relatedProducts,setRelatedProducts] = useState(null);
    let {id} = useParams()

    // using useEffect to fetch data from api
    async function getProducts(){
        const options={
          url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
          method:"GET"
        }
        const {data} = await axios.request(options);
        setProducts(data.data)
      }

    async function getRelatedProducts(){
      const options = {
        url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${products.category._id}`,
        method:"GET"}
        const {data} = await axios.request(options);
        setRelatedProducts(data.data)
    }



      useEffect(()=>{
        getProducts()
      },[id])
      useEffect(()=>{
        if(products==null) return
        getRelatedProducts()
        setImage(null)
        window.scrollTo(0,0)   
      },[products])
  return (
    <>
    <Helmet>
      <title>{products?.title}</title>
    </Helmet>
    {products?<>
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row p-4 md:p-8 bg-transparent rounded-lg max-w-5xl mx-auto mt-10 dark:text-gray-300">
                <div className="flex flex-row items-center gap-4 ">
                    <div className="flex flex-col items-center space-y-4">
                        {products.images.map((image,index)=> <div key={index} className={`border p-2 border-[--main-color] active:border-black rounded-md cursor-pointer `} onClick={()=>setImage(image)}>
                            <img src={image}  alt="" className="w-20 h-20"/>
                        </div>)}
                    </div>
                    <div className="mt-4">
                        <img src={image?image:products.imageCover} alt="" className="w-80  h-80"/>
                    </div>
                </div>
                    <div className="flex-1 md:ml-8">
                        <div className=''>
                            <p className="text-gray-600 dark:text-gray-300"><strong>Brand :</strong> {products.brand.name}</p>
                            <p className="text-gray-600 dark:text-gray-300"><strong>Category :</strong> {products.category.name}</p>
                            <p className="text-gray-600 dark:text-gray-300"><strong>Quantity :</strong> {products.quantity}</p>
                            <h1 className="text-2xl font-bold mt-2">{products.title}</h1>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                    <span className="text-yellow-500"><i className="fas fa-star"></i></span>
                                    <span className="text-yellow-500"><i className="fas fa-star"></i></span>
                                    <span className="text-yellow-500"><i className="fas fa-star"></i></span>
                                    <span className="text-yellow-500"><i className="fas fa-star"></i></span>
                                    <span className="text-gray-400"><i className="fas fa-star"></i></span>
                                </div>
                                <span className="text-gray-600 ml-2 dark:text-gray-300">{products.ratingsAverage}</span>
                            </div>
                            <p className="text-gray-700 mt-4 dark:text-gray-300">
                              {products.description}       
                            </p>
                            <p className="text-2xl font-bold text-[--main-color] mt-4">EGP {products.price}</p>
                            <button onClick={()=>{addProductToCart({productId:id})}} className="bg-[--main-color] text-white font-bold active:scale-95 px-4 py-2 rounded mt-4 ">
                                + Add To Cart
                            </button>
                        </div>
                    </div>
      </div>
      <>
      <h2 className='font-bold text-lg mb-3 before:h-5 before:w-1 dark:text-gray-300 before:bg-[--main-color] before:-left-2 before:top-1  before:absolute relative before:rounded-lg'> Related Products</h2>
      {relatedProducts?<div className="grid grid-cols-12 gap-4">{relatedProducts.map((product)=><ProductsCard key={product._id} product={product} />)}</div>
      : <Loading/>} 
      </>     
      </>:<Loading/>}
    
  
    </>
  )
}