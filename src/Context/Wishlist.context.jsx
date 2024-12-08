import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userContext } from "./User.Context";

export const wishlistContext = createContext(null)

export default function WishlistProvider({ children }) {
    const [wishlistInfo,setWishlistInfo] = useState(null)
    let {token} = useContext(userContext)

    async function addProductToWishlist({productId}) {
        let toastId;
        toastId = toast.loading("Adding Product to your Wishlist ...")
        try {
            const options = {
                url:"https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "POST",
                headers: {
                    token: token
                },
                data:{
                    productId:productId
                }
            }
            let {data} = await axios.request(options)
            toast.dismiss(toastId);
            if(data.status == "success")
            {
                toast.success(data.message)
                getWishlistProducts()
            }

        } catch (error) {
            toast.dismiss(toastId)
            toast.error(error.response.data.message)
        }
    }
    async function getWishlistProducts(){
        try {
            const options = {
                url:"https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "GET",
                headers:{
                    token:token
                }
            }
            let {data} = await axios.request(options)
            if(data.status=="success"){
                setWishlistInfo(data)
            }
        } catch (error) {
        }
    }
    async function removeProductFromWishlist({id}){
        let toastId;
        toastId = toast.loading("Deleting Product ...")
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                method: "DELETE",
                headers:{
                    token:token
                }
            }
            let {data} = await axios.request(options)
            if(data.status=="success")
            {
                toast.dismiss(toastId)
                toast.success("Deleted Successfully")
                window.scrollTo(0,0)
                getWishlistProducts()
            }
        } catch (error) {
        }
        finally{
            toast.dismiss(toastId)
        }
    }
    return <wishlistContext.Provider value={{addProductToWishlist,getWishlistProducts,wishlistInfo,removeProductFromWishlist}}>
        {children}
        </wishlistContext.Provider>
}