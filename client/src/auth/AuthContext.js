import { createContext,useContext,useState } from "react";
import api from "../api/Axios";

const AuthContext = createContext()

export const AuthProvider=({children})=>{
    const [user,setUser] = useState(null)

    const login = async(email,password)=>{
        await api.post("/auth/ligin",{email,password})
            .then(res=>setUser(res.data))
            .catch(err=>err.message)
    }
    const logout = async()=>{
        await api.post('/auth/logout')
            .then(setUser(null))
            .catch(err=>err.message)
    }

    return(
        
        <AuthContext.Provider value={{user,login,logout}}>
        {children}
        </AuthContext.Provider>
        
    )
}

export const useAuth = ()=>useContext(AuthContext)