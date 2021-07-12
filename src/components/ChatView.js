import {Box,Heading,Button,Input,useColorMode,Avatar,Text} from "@chakra-ui/react"
import {ArrowBackIcon} from "@chakra-ui/icons"
import { chatContext } from "../contexts/chatContext"
import { useContext} from "react"
import ChatMessage from "./ChatMessage"
export default function ChatView({id}) {
    const {colorMode}=useColorMode()
    const [chats,,,,,chatInput,sendHandle,showChat,sendId,,,,,clearchat]=useContext(chatContext)
    return (
        <>
            {showChat?
            <Box height="99%" mt="1" zIndex={["2","1"]} position={["absolute","unset"]} bg={colorMode==="dark"?"gray.800":"white"} width="100%" top="0" display="flex" flexDirection="column" flex={["2","1","2"]} >
            <Box height="60px" zIndex="2" boxShadow="md" width="full" alignItems="center" padding="2" display={["flex","none"]}>
            <Button onClick={clearchat}><ArrowBackIcon/></Button>
            <Box ml="2" width="90%" display="flex">
            <Avatar name={sendId.name+" "+sendId.family} src={sendId.profilepic}/>
            <Box width="70%" ml="2" display="flex" flexDirection="column" justifyContent="space-between">
                <Text whiteSpace="nowrap" overflowWrap="normal" overflowX="hidden" textOverflow="ellipsis" wordBreak="normal" width="90%" fontWeight="bold">{sendId.name+" "+sendId.family}</Text>
            </Box>
            </Box>
            </Box>
            <ChatMessage sendid={sendId} id={id} chats={chats}/>
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