import {Box,Collapse,Input,useColorMode,useTheme} from "@chakra-ui/react"
import { chatContext } from "../contexts/chatContext"
import {useContext, useEffect,useRef,useCallback} from "react"
export default function ConversationView({opse}) {
    const {colorMode}=useColorMode()
    const [,conversations,searchInput,searchHandle,setIdsend]=useContext(chatContext)
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
        <Box display="flex" flexDirection="column" boxShadow="lg" flex="1"  overflowY="auto">
                    <Collapse animateOpacity in={opse}>
                        <Box padding="3">
                            <Input ref={searchInput} type="text" onChange={searchHandle} placeholder="search"/>
                        </Box>
                    </Collapse>
                    <Box  overflowY="auto" flexGrow="1">
                        <Box height="50px" display="flex"  flexDirection="column">
                            {conversations.map(con=>(
                                <Box cursor="pointer" className="main"  padding="3" onClick={(e)=>{setIdsend(con.id);sc.current=e.target;setBackGround(e.target)}}   _focus={colorMode==="dark"?{bg:"gray.900"}:{bg:"gray.100"}}  _hover={colorMode==="dark"?{bg:"gray.900"}:{bg:"gray.100"}}  key={con.id}>
                                    <Box  whiteSpace="nowrap" textOverflow="ellipsis" style={{wordWrap:"normal",overflowX:"hidden"}}>
                                        {con.id}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
        </Box>
    )
}
