import {Box,useColorMode,Heading} from "@chakra-ui/react"
import Navbar from "./Navbar"
import ConversationView from "./ConversationView"
import ChatView from "./ChatView"
import SetIdView from "./setIdView"
import { chatContext } from "../contexts/chatContext"
import {useState,useContext} from "react"
export default function TelegramClone({id,setId}) {
    const [opse,setOpse]=useState(false)
    const [,,,,,,,,,disconnect]=useContext(chatContext)
    const {colorMode}=useColorMode()
    return (
        <>
            
            {id === ""?<SetIdView setId={setId}/>
            :
            <Box display="flex" flexDirection='column'  height="100%" width="full">
            { disconnect && <Box p='1' height="30px" position="sticky" bg={colorMode==="light"?"gray.100":"gray.900"} display="flex" justifyContent="center"><Heading fontSize="lg">Check Internet</Heading></Box>}
            <Box position="relative">
            <Navbar  id={id} setOpse={setOpse} opse={opse}/>
            <Box height={disconnect?"calc(100vh - 60px - 30px)":"calc(100vh - 60px)"} flex="1" display="flex" flexDirection="row">
                <ConversationView  opse={opse}/>
                <ChatView  id={id}/>
            </Box>
            </Box>
            </Box>}
        </>
    )
}
