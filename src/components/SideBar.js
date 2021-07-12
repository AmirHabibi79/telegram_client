import {Box,Collapse,Input,useColorMode,useTheme} from "@chakra-ui/react"
import { chatContext } from "../contexts/chatContext"
import {useContext, useEffect,useRef,useCallback} from "react"
import SearchView from "./SearchView"
import ConversationView from "./ConversationView"
export default function SideBar({opse}) {
    const {colorMode}=useColorMode()
    const [,conversations,searchInput,searchHandle,,,,,,,search]=useContext(chatContext)
    const theme=useTheme()
    const sc=useRef()
    const setBackGround=useCallback((targett)=>{
        if(targett===undefined)return
        let target
        if(targett.classList.contains("main")){
            target=targett
        }else{
            target=targett.parentElement
        }
        const elems= document.querySelectorAll(".bg")
        elems.forEach(elem=>elem.style.background="")
        let {gray}=theme.colors
        gray=Object.values(gray)
        if(colorMode==="dark")
        target.style.background=gray[9]
        else
        target.style.background=gray[1]
        target.classList.add("bg")
    },[colorMode,theme])
        
    useEffect(()=>{
        setBackGround(sc.current)
    },[setBackGround])
    return (
        <Box height="100%" display="flex" flexDirection="column" boxShadow="lg" flex="1" zIndex={["1","2"]} overflowY="auto">
                    <Collapse animateOpacity in={opse}>
                        <Box padding="3">
                            <Input ref={searchInput} type="text" onChange={searchHandle} placeholder="search"/>
                        </Box>
                    </Collapse>
                    <Box display="flex"  flexDirection="column" overflowY="auto" flexGrow="1">
                    {opse?<SearchView  searchs={search}/>:<ConversationView conversations={conversations}/>}
                    </Box>
        </Box>
    )
}
