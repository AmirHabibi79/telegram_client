import React,{useState,useContext,useRef, useEffect,useCallback} from 'react'
import {socketContext} from "../contexts/SocketContext"
import useLocalStorage from '../hooks/useLocalStorage'
export const chatContext=React.createContext()

export function ChatProvider({children,id:userId}) {
    const [chatSocket]=useContext(socketContext)
    const [disconnect,setDisconnect]=useState(false)
    const [chat,setChat]=useState([])
    const [conversations,setConversations]=useLocalStorage("conversations",[])
    const [idsend,setIdsend]=useState()
    const [showChat,setShowChat]=useState(false)
    const chatInput=useRef()
    const searchInput=useRef()
    const addMessageToConversation=useCallback((msg)=>{
        const checkId=msg.from===userId?msg.to:msg.from
        const exist=conversations.filter(con=>con.id===checkId)
        if(exist.length===0){
            const con={
                id:checkId,
                messages:[msg]
            }
            setConversations([...conversations,con])
        }
        else{
            const newMsg=conversations.map(con=>{
                if(con.id===checkId){
                    con.messages.push(msg)
                    return con
                }
                else{
                    return con
                }
            })
            setConversations(newMsg)
        }
        if(showChat){
            setChat(preChats=>[...preChats,msg])
        }
    },[setConversations,conversations,showChat,userId])
    const addSearchToConversations=useCallback((info)=>{
        if(info.length>0){
            const exist=conversations.filter(con=>con.id===info[0])
            if(exist.length===0){
                const con={
                    id:info[0],
                    messages:[]
                }
                setConversations([...conversations,con])
                setShowChat(false)
                setIdsend()
            }
        }
    },[conversations,setConversations])
    const searchHandle=()=>{
        const info={
            id:userId,
            search:searchInput.current.value
        }
        if(disconnect===false){
            chatSocket.emit("search",info)
        }
    }
    const sendHandle=()=>{
        const msg={
            message:chatInput.current.value,
            from:userId,
            to:idsend
        }
        if(disconnect===false){
            chatSocket.emit("send",msg)
            addMessageToConversation(msg)
            chatInput.current.value=""
            chatInput.current.focus()
        }
    }
    useEffect(()=>{
        if(idsend){
            const cc=conversations.filter(con=>con.id===idsend)
            setChat(cc[0].messages)
            setShowChat(true)
        }
        else{
            setChat()
            setShowChat(false)
        }
    },[idsend,conversations])
    useEffect(()=>{
        if(chatSocket == null) return
        chatSocket.on("connect",()=>{setDisconnect(false)})
        chatSocket.on("connect_error",()=>{setDisconnect(true)})
        return ()=>{chatSocket.off("connect");chatSocket.off("connect_error");}
    },[chatSocket])
    useEffect(()=>{
        if(chatSocket == null) return
        chatSocket.on("search-back",addSearchToConversations)
        return  ()=>chatSocket.off("search-back")
    },[chatSocket,addSearchToConversations])
    useEffect(()=>{
        if(chatSocket == null) return

        chatSocket.on("recevie",addMessageToConversation)
        return  ()=>chatSocket.off("recevie")
    },[chatSocket,addMessageToConversation])
    return (
        <chatContext.Provider value={[chat,conversations,searchInput,searchHandle,setIdsend,chatInput,sendHandle,showChat,idsend,disconnect]}>
            {children}
        </chatContext.Provider>
    )
}
