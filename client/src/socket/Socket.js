import { io } from "socket.io-client";

const socket = io("http://localhost:5173",{
    withCredentials:true,
    autoConnect:false
})

export default socket