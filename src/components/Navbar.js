import {Box,Button,Heading,useDisclosure,useColorMode,DrawerCloseButton,DrawerHeader,Drawer, DrawerOverlay,DrawerContent,DrawerBody} from "@chakra-ui/react"
import {HamburgerIcon,SearchIcon,SunIcon,MoonIcon} from "@chakra-ui/icons"
import {useRef} from "react"
export default function Navbar({setOpse,opse,id:userId}) {
    const {isOpen,onOpen,onClose}=useDisclosure()
    const {colorMode,toggleColorMode}=useColorMode()
    const btn=useRef()
    return (
        <>
        {
            <Box zIndex="2" height="60px" boxShadow="md" width="full" alignItems="center" padding="2" display="flex">
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
