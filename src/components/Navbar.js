import {Box,Button,Heading,useDisclosure,useColorMode,DrawerCloseButton,DrawerHeader,Drawer, DrawerOverlay,DrawerContent,DrawerBody} from "@chakra-ui/react"
import {HamburgerIcon,SearchIcon,SunIcon,MoonIcon,ArrowBackIcon} from "@chakra-ui/icons"
import {useRef,useContext} from "react"
import {chatContext} from "../contexts/chatContext"
export default function Navbar({setOpse,opse,id:userId,size}) {
    const {isOpen,onOpen,onClose}=useDisclosure()
    const {colorMode,toggleColorMode}=useColorMode()
    const btn=useRef()
    const [,,,,setId,,,showChat,sendId]=useContext(chatContext)
    return (
        <>
        {
            size
            ?
            <Box  boxShadow="md" width="full" alignItems="center" padding="2" display="flex">
                    <Button ref={btn} onClick={onOpen}><HamburgerIcon/></Button>
                    <Box width="full" display="flex" alignItems="center" justifyContent="space-between">
                        <Heading fontSize="larger" ml="2">Telegram</Heading>
                        <Box>
                            <Button mr="2" onClick={toggleColorMode} float="left">{colorMode==="dark"?<SunIcon/>:<MoonIcon/>}</Button>
                            <Button onClick={()=>setOpse(!opse)} float="left"><SearchIcon/></Button>
                        </Box>
                    </Box>
            </Box>
            :
            showChat
            ?
            <Box  boxShadow="md" width="full" alignItems="center" padding="2" display="flex">
            <Button onClick={()=>setId()}><ArrowBackIcon/></Button>
            <Heading width="200px" wordBreak="normal" style={{wordWrap:"normal"}} overflowX="hidden" textOverflow="ellipsis" fontSize="larger" ml="2">{sendId}</Heading>
            </Box>
            :
            <Box  boxShadow="md" width="full" alignItems="center" padding="2" display="flex">
                    <Button ref={btn} onClick={onOpen}><HamburgerIcon/></Button>
                    <Box width="full" display="flex" alignItems="center" justifyContent="space-between">
                        <Heading fontSize="larger" ml="2">Telegram</Heading>
                        <Box>
                            <Button mr="2" onClick={toggleColorMode} float="left">{colorMode==="dark"?<SunIcon/>:<MoonIcon/>}</Button>
                            <Button onClick={()=>setOpse(!opse)} float="left"><SearchIcon/></Button>
                        </Box>
                    </Box>
            </Box>
        }
        <Drawer  finalFocusRef={btn} placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay/>
        <DrawerContent>
            <DrawerCloseButton/>
            <DrawerBody>
            <DrawerHeader>{"Your id: "+userId}</DrawerHeader>
            </DrawerBody>
        </DrawerContent>
        </Drawer>
        </>
    )
}
