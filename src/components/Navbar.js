import {Image,Text,Box,Button,Heading,useDisclosure,Switch,useColorMode,DrawerCloseButton,Drawer, DrawerOverlay,DrawerContent,DrawerBody} from "@chakra-ui/react"
import {HamburgerIcon,SearchIcon,MoonIcon} from "@chakra-ui/icons"
import {useRef,useCallback} from "react"
export default function Navbar({setOpse,opse,info,setinfo,setconversation,setidsend}) {
    const {isOpen,onOpen,onClose}=useDisclosure()
    const {colorMode,toggleColorMode}=useColorMode()
    const btn=useRef()
    const logout=useCallback(()=>{
        setconversation([])
        setidsend()
        setinfo({})
    },[setconversation,setidsend,setinfo])
    return (
        <>
        {
            <Box zIndex="2" height="60px" boxShadow="md" width="full" alignItems="center" padding="2" display="flex">
                    <Button ref={btn} onClick={onOpen}><HamburgerIcon/></Button>
                    <Box width="full" display="flex" alignItems="center" justifyContent="space-between">
                        <Heading fontSize="larger" ml="2">Telegram</Heading>
                        <Box>
                            <Button onClick={()=>setOpse(!opse)} float="left"><SearchIcon/></Button>
                        </Box>
                    </Box>
            </Box>
        }
        <Drawer  finalFocusRef={btn} placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay/>
        <DrawerContent>
            <DrawerCloseButton fontSize="larger" zIndex="2" display={["block","none"]}/>
            <DrawerBody p="0">
            <Box  position="relative">
                <Image objectFit="cover" height="200px" width="512px" visibility={!info.profilepic && "hidden"} src={info.profilepic}/>
                <Box bg="linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.64) 100%)" width="100%"  bottom="0" fontWeight="bolder" position="absolute">
                    <Box   color="white" fontSize="larger" ml="2">
                        <Text mt="5">{info.name+" "+info.family}</Text>
                        <Text>{info.phone}</Text>
                        <Text>{info.userid}</Text>
                    </Box>
                </Box>
            </Box>
            <Box p="2"  display="flex" alignItems="center" justifyContent="space-between">
                <Box width="40%" display="flex" alignItems="center" justifyContent="space-between" >
                    <MoonIcon/>
                    <Text>Dark mode</Text>
                </Box>
                <Switch isChecked={colorMode==="dark"?true:false} onChange={()=>{
                    toggleColorMode()
                }}/>
            </Box>
            <Button onClick={logout} borderRadius="0" p="2" bg="none" color="red" width="100%" justifyContent="left" >Log Out</Button>
            </DrawerBody>
        </DrawerContent>
        </Drawer>
        </>
    )
}
