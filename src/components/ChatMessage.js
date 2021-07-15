import {useCallback,useEffect,useRef, useState} from 'react'
import {Box,Heading,useColorMode,Button,Text} from "@chakra-ui/react"
import {ArrowDownIcon} from "@chakra-ui/icons"
export default function ChatMessage({chats,id,sendid}) {
    const observer=useRef()
    const {colorMode}=useColorMode()
    const [isChatChanged,setIsChatChanged]=useState(false)
    const [showScrollToDonwBtn,setScrollShowToDowBtn]=useState(false)
    const animationChat=useCallback((node)=>{
        if(node && chats.length>0){
            if(observer.current) observer.current.disconnect()
            observer.current=new IntersectionObserver(enteris=>{
                if(enteris[0].isIntersecting){
                    node.scrollIntoView({behavior:"smooth"})
                    setScrollShowToDowBtn(false)
                }
                else{
                    if(isChatChanged){
                        node.scrollIntoView()
                        setIsChatChanged(false)
                        setScrollShowToDowBtn(false)
                    }
                    else{
                        setScrollShowToDowBtn(true)
                    }
                }
            })
            observer.current.observe(node)
        }
    },[chats,isChatChanged])
    useEffect(()=>{
        setIsChatChanged(true)
    },[sendid])
    return (
        <Box  height="100%" p="1" display="flex" flexDirection="column"  overflowY="auto">
            {showScrollToDonwBtn && <Button boxShadow="lg" position="absolute" top="80%" right="2%" width="40px" height="40px" borderRadius="50%" onClick={()=>setIsChatChanged(true)}><ArrowDownIcon/></Button>}
        {chats.map((msg,i)=>(
            <Box ref={chats.length===i+1?animationChat:null} key={i}>
            {msg.from===id
        ?
        <Box  mb="3" display="flex" justifyContent="flex-end">
            <Box p="2" maxWidth="160px" boxShadow="md" borderRadius="md" bg={colorMode==="light"?"gray.300":"gray.900"}>
                <Heading fontSize="large">{msg.message}</Heading>
                <Box mt="2" display="flex" justifyContent="flex-end">
                    <Text  fontSize="x-small">{new Date(msg.time).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</Text>
                </Box>
            </Box>
            
        </Box>
        :
        <Box  mb="3" display="flex" justifyContent="flex-start">
            <Box p="2" maxWidth="160px" boxShadow="md" borderRadius="md" bg={colorMode==="light"?"white":"gray.600"}>
                <Heading fontSize="large">{msg.message}</Heading>
                <Box mt="2" display="flex" justifyContent="flex-end">
                    <Text  fontSize="x-small">{new Date(msg.time).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</Text>
                </Box>
            </Box>
            
        </Box>
        }
            </Box>
        ))}
        </Box>
        
    )
}
