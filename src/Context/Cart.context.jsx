import { createContext, useContext, useState } from "react";
import { userContext } from "./User.Context";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(null)
export default function CartProvider({children}) {
    const [cartInfo,setCartInfo] = useState(null)
    let {token} = useContext(userContext)
    
    async function addProductToCart({productId}) {
        let toastId;
        toastId = toast.loading("Adding Product to your Cart ...")
        try {
            const options = {
                url:"https://ecommerce.routemisr.com/api/v1/cart",
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
                getCartProducts()
                toast.success(data.message)
            }

        } catch (error) {
            toast.dismiss(toastId)
            toast.error(error.response.data.message)
        }
    }
    async function getCartProducts(){
        try {
            const options = {
                url:"https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers:{
                    token:token
                }
            }
            let {data} = await axios.request(options)
            
            if(data.status=="success"){
                setCartInfo(data)
            }
        } catch (error) {
        }
    }
    async function removeProductFromCart({id}){
        let toastId;
        toastId = toast.loading("Deleting Product ...")
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: "DELETE",
                headers:{
                    token:token
                }
            }
            let {data} = await axios.request(options)
            if(data.status=="success")
            {
                window.scrollTo(0,0)
                toast.dismiss(toastId)
                toast.success("Deleted Successfully")
                setCartInfo(data)
            }
        } catch (error) {
        }
        finally{
            toast.dismiss(toastId)
        }
    }
    async function clearCart(){
        let toastId;
        toastId = toast.loading("Deleting Your Cart ...")
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/cart`,
                method: "DELETE",
                headers:{
                    token:token
                }
            }
            let {data} = await axios.request(options)
            if(data.message=="success")
            {
                toast.dismiss(toastId)
                toast.success("Deleted Successfully")
                setCartInfo(null)
                getCartProducts()
            }
        } catch (error) {
        }
        finally{
            toast.dismiss(toastId)
        }
    }       
    async function updateProductCount({productId,count}){
        let toastId;
        toastId = toast.loading("Updating...")
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "PUT",
                headers:{
                    token:token
                },
                data:{
                    count
                }
            }
            let {data} = await axios.request(options)
            if(data.status=="success")
            {
                toast.dismiss(toastId)
                toast.success("Updated Successfully")
                setCartInfo(data)
            }
        } catch (error) {
        }
        finally{
            toast.dismiss(toastId)
        }
    }       
    
    return <cartContext.Provider value={{addProductToCart,getCartProducts,cartInfo,removeProductFromCart,clearCart,updateProductCount}}>
        {children}
    </cartContext.Provider>
}