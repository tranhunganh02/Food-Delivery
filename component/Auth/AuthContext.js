import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../../firebase";
import getUser from "../../features/User/getUser";

export const AppContext = createContext({
});

export const AppProvider= ({children})=> {
    const [user,setUser] =useState({});
    useEffect(()=>{
     const unsubscribe= auth.onAuthStateChanged(async (userLogin)=> {
            if(userLogin!=null) {
                const data= await getUser(userLogin.uid)
                setUser(data);
            }
            else{
                setUser(null);
            
            }
        })
        return unsubscribe;
    },[])
    return <AppContext.Provider value={{user}}>
        {children}
    </AppContext.Provider>
}