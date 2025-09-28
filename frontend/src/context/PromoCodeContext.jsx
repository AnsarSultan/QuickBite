import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";


export const PromoCodeContext = createContext();

const PromoCodeProvider = ({children})=>{
    const {token} = useContext(AuthContext)
    const [promoCodes , setPromoCodes] = useState([]);
    const [PromoCodeLoading , setPromoCodeLoading] = useState(false)

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const fetchPromoCodes = async ()=>{
        try {
            setPromoCodeLoading(true)
            const {data} = await axios.get(`${backendURL}/api/promotions`, { headers: {token}})
           if(data.success){
            setPromoCodes(data.data)
           }
        } catch (error) {
           toast.error("Something went wrong. Please again later")
        }finally{
            setPromoCodeLoading(false)
        }
    }

    return <PromoCodeContext.Provider value={{fetchPromoCodes , PromoCodeLoading , promoCodes}}>
        {children}
    </PromoCodeContext.Provider>
}

export default PromoCodeProvider