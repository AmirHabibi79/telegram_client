import React,{useState,useContext,useRef, useEffect,useCallback} from 'react'
import {socketContext} from "../contexts/SocketContext"
export const chatContext=React.createContext()

export function ChatProvider({children,id:userId,conversations,setConversations,opse}) {
    const [chatSocket]=useContext(socketContext)
    const [disconnect,setDisconnect]=useState(false)
    const [chat,setChat]=useState([])
    const [idsend,setIdsend]=useState()
    const [showChat,setShowChat]=useState(false)
    const [search,setSearch]=useState([])
    const [timeout,setTimeoutt]=useState()
    const chatInput=useRef()
    const searchInput=useRef()
    const clearchat=useCallback(()=>{
        conversations.map(c=>{
            if(c.selected){
                c.selected=false
                return c
            }
            return c
        })
        setConversations(conversations)
        setChat()
        setIdsend()
        setShowChat(false)
    },[conversations,setConversations])
        
    
    const addMessageToConversation=useCallback((msg)=>{
        const exist=conversations.filter(c=>c.conversationid===msg.conversationid)
        if(exist.length>0){
            setConversations([...conversations.map(c=>{
                if(c.conversationid===msg.conversationid){
                    c.messages.push(msg)
                    return c
                }
                return c
            })])
            if(showChat){
                setChat(preChats=>[...preChats,msg])
            }
        }
        else{
            setConversations([msg,...conversations])
            if(showChat){
                setChat(preChats=>[...preChats,msg])
            }
        }
    },[setConversations,conversations,showChat])
    const addSearch=useCallback(async(info)=>{ 
     setSearch([...info])
    },[])
    const searchHandle=()=>{
        if(timeout)
        clearTimeout(timeout)
        const info={
            id:userId,
            search:searchInput.current.value
        }
       const to= setTimeout(()=>{
            if(disconnect===false){
                setSearch([])
                chatSocket.emit("search",info)
            }
        },100)
        setTimeoutt(to)
    }
    const sendHandle=()=>{
        const msg={
            message:chatInput.current.value,
            from:userId,
            to:idsend.id,
            conversationid:idsend.conversationid,
            time:Date.now()
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
            const cc=conversations.filter(con=>con.id===idsend.id)
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
        chatSocket.on("search-back",addSearch)
        return  ()=>chatSocket.off("search-back")
    },[chatSocket,addSearch])
    useEffect(()=>{
        if(chatSocket == null) return

        chatSocket.on("recevie",addMessageToConversation)
        return  ()=>chatSocket.off("recevie")
    },[chatSocket,addMessageToConversation])
    useEffect(()=>{
        if(!opse){
            if(searchInput.current){
                searchInput.current.value=""
                setSearch([])
            }
            
        }
    },[opse])
    return (
        <chatContext.Provider value={[chat,conversations,searchInput,searchHandle,setIdsend,chatInput,sendHandle,showChat,idsend,disconnect,search,setSearch,setConversations,clearchat]}>
            {children}
        </chatContext.Provider>
    )
}
