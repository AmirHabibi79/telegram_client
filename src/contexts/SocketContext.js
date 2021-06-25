import { createContext, useEffect, useState } from "react"
import {io} from "socket.io-client"
export const socketContext=createContext()
export  function SocketProvider({children,id}) {
    const [chatSocket,setChatsocket]=useState()
    useEffect(()=>{
        const chat=io("http://localhost:5000/chat",{query:{id}})
        setChatsocket(chat)
        return ()=>chat.close()
    },[id])
   
    return (
        <socketContext.Provider value={[chatSocket]}>
            {children}
        </socketContext.Provider>
    )
}
