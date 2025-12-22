import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:5173',
    withCredentials:true
})

api.interceptors.response.use(
    res=>res,
    async err=>{
        if(err.response?.status === 403){
            try{
                await api.post("/auth/refresh")
                return api(err.config)
            }
            catch{
                window.location.href = '/'
            }
        }
        return Promise.reject(err)
    }
)

export default api