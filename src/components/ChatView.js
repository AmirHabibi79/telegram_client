import {Box,Heading,Button,Input,useColorMode,Flex} from "@chakra-ui/react"
import { chatContext } from "../contexts/chatContext"
import { useContext } from "react"
import ChatMessage from "./ChatMessage"
export default function ChatView({id,size}) {
    const {colorMode}=useColorMode()
    const [chats,,,,,chatInput,sendHandle,showChat]=useContext(chatContext)
    return (
        <>
            {showChat?size?
            <Box display="flex" flexDirection="column" flex="2" >
            <Box  flexGrow="1" overflowY="auto">
            <Box p="1" height="50px" display="flex" flexDirection="column">
                {chats.map((chat,i)=>(
                   <ChatMessage id={id} msg={chat} key={i}/>
            ))}
            </Box>
            </Box>
            <Box  mt="1"  display="flex" justifyContent="space-between">
            <Input borderRadius="none" ref={chatInput} type="text" placeholder="message"/>
            <Button borderRadius="none" onClick={sendHandle}>send</Button>
            </Box>
            </Box>
            :
            <Flex height="91vh" direction="column" width="100%"  bg={colorMode==="light"?"white":"gray.900"} position="absolute">
                <Box flex="1" overflowY="auto">
                <Box p="1" height="50px" display="flex" flexDirection="column">
                    {chats.map((chat,i)=>(
                       <ChatMessage id={id} msg={chat} key={i}/>
                ))}
                </Box>
                </Box>
                <Box  mt="1" display="flex" justifyContent="space-between">
                <Input borderRadius="none" ref={chatInput} type="text" placeholder="message"/>
                <Button borderRadius="none" onClick={sendHandle}>send</Button>
                </Box>
            </Flex>
            :
            size?<Box  justifyContent="center" alignItems='center'  display="flex" flexDirection="row" flex="2">
            {colorMode==="dark"?<Heading p="2" borderRadius="lg" bg="gray.900">Search id and start chat</Heading>:<Heading p="2" borderRadius="lg" bg="gray.100">Search id and start chat</Heading>}
            </Box>:""
            }
        </>
    )
}