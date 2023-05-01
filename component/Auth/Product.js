import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../../firebase";
import getUser from "../../features/User/getUser";
import getAllProduct from "../../features/Product/getAllProduct";

export const ProductContext = createContext([]);

export const ProductProvider= ({children})=> {
    const [products,setProducts] =useState({});
    useEffect(()=>{
        getAllProduct().then((data) =>
        {
            setProducts(data);
        })
    },[])
    const updateProduct = ( ) =>
    {
        getAllProduct().then((data) =>
        {
            setProducts(data);
        })
    }
    return <ProductContext.Provider value={{products,updateProduct}}>
        {children}
    </ProductContext.Provider>
}