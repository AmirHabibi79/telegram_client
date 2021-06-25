import {Box,Heading,useColorMode,useMediaQuery} from "@chakra-ui/react"
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
    const [b500]=useMediaQuery("(min-width: 500px)")
    return (
        <>
            {disconnect && <Box p='1' bg={colorMode==="light"?"gray.100":"gray.900"} display="flex" justifyContent="center"><Heading>Check Internet</Heading></Box>}
            {id === ""?<SetIdView setId={setId}/>
            :
            <Box display="flex" flexDirection='column' height="full" width="full">
            <Navbar size={b500} id={id} setOpse={setOpse} opse={opse}/>
            <Box flex="1" display="flex" flexDirection="row">
                <ConversationView  opse={opse}/>
                <ChatView size={b500} id={id}/>
            </Box>
            </Box>}
        </>
    )
}
