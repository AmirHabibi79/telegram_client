import {Box,useColorMode,Heading} from "@chakra-ui/react"
import Navbar from "./Navbar"
import SideBar from "./SideBar"
import ChatView from "./ChatView"
import RegisterView from "./registerView"
import { chatContext } from "../contexts/chatContext"
import {useContext} from "react"
export default function TelegramClone({info,setinfo,setConversations,opse,setOpse}) {
    const [,,,,setIdsend,,,,,disconnect]=useContext(chatContext)
    const {colorMode}=useColorMode()
    return (
        <>
            
            {info.id === undefined?<RegisterView setcon={setConversations} setinfo={setinfo}/>
            :
            <Box display="flex" flexDirection='column'  height="100%" width="full">
            { disconnect && <Box p='1' height="30px" position="sticky" bg={colorMode==="light"?"gray.100":"gray.900"} display="flex" justifyContent="center"><Heading fontSize="lg">Check Internet</Heading></Box>}
            <Box position="relative">
            <Navbar setidsend={setIdsend} setconversation={setConversations} info={info} setinfo={setinfo} setOpse={setOpse} opse={opse}/>
            <Box height={disconnect?"calc(100vh - 60px - 30px)":"calc(100vh - 60px)"} flex="1" display="flex" flexDirection="row">
                <SideBar  opse={opse}/>
                <ChatView  id={info.id}/>
            </Box>
            </Box>
            </Box>}
        </>
    )
}
