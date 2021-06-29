import {Box,Heading,Button,Input,useColorMode} from "@chakra-ui/react"
import {ArrowBackIcon} from "@chakra-ui/icons"
import { chatContext } from "../contexts/chatContext"
import { useContext } from "react"
import ChatMessage from "./ChatMessage"
export default function ChatView({id}) {
    const {colorMode}=useColorMode()
    const [chats,,,,setId,chatInput,sendHandle,showChat,sendId]=useContext(chatContext)
    return (
        <>
            {showChat?
            <Box height="100%"  zIndex={["2","1"]} position={["absolute","unset"]} bg={colorMode==="dark"?"gray.800":"white"} width="100%" top="0" display="flex" flexDirection="column" flex="2" >
            <Box height="60px"  boxShadow="md" width="full" alignItems="center" padding="2" display={["flex","none"]}>
            <Button onClick={()=>setId()}><ArrowBackIcon/></Button>
            <Heading width="200px" wordBreak="normal" style={{wordWrap:"normal"}} overflowX="hidden" textOverflow="ellipsis" fontSize="larger" ml="2">{sendId}</Heading>
            </Box>
            <Box height="100%" p="1" display="flex" flexDirection="column" overflowY="auto">
                {chats.map((chat,i)=>(
                   <ChatMessage id={id} msg={chat} key={i}/>
            ))}
            </Box>
            <Box  mt="1"  display="flex" justifyContent="space-between">
            <Input borderRadius="none" ref={chatInput} type="text" placeholder="message"/>
            <Button borderRadius="none" onClick={sendHandle}>send</Button>
            </Box>
            </Box>
            :
            <Box position={["absolute","unset"]} right="100%"  justifyContent="center" alignItems='center'  display="flex" flexDirection="row" flex="2">
            <Heading fontSize={["unset","large","x-large","xx-large","xxx-large"]} p="2" borderRadius="lg" bg={colorMode==="dark"?"gray.900":"gray.100"}>Search id and start chat</Heading>
            </Box>
            }
        </>
    )
}