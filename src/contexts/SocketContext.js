import { createContext, useEffect, useState } from "react"
import {io} from "socket.io-client"
export const socketContext=createContext()
export  function SocketProvider({children,id}) {
    const [chatSocket,setChatsocket]=useState()
    useEffect(()=>{
        const chat=io(process.env.REACT_APP_SOCKET+"chat",{query:{id}})
        setChatsocket(chat)
        return ()=>chat.close()
    },[id])
   
    return (
        <socketContext.Provider value={[chatSocket]}>
            {children}
        </socketContext.Provider>
    )
}
