import {useContext, useState } from "react"
import { chatContext } from "../contexts/chatContext"
import {langContext} from "../contexts/LanguageContext"
import {Box,Button,Menu,MenuButton,MenuList,MenuItem} from "@chakra-ui/react"
import {ChevronDownIcon} from "@chakra-ui/icons"
import SignupView from "./SignupView"
import LoginView from "./LoginView"
export default function RegisterView({setinfo,setcon}) {
    const {langdata,toggleLang}=useContext(langContext)
    const [signup,setSignup]=useState(false)
    const [,,,,,,,,,disconnect]=useContext(chatContext)
    return (
        <Box overflowX="hidden" height={disconnect?"calc(100vh - 30px)":"100vh"} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" >
           <Box p="2" alignSelf="flex-start">
                <Menu variant="fixed">
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                        {langdata.langbtn}
                    </MenuButton>
                    <MenuList transform="translate(1117px, 56px)">
                        <MenuItem onClick={()=>toggleLang("fa")}>فارسی</MenuItem>
                        <MenuItem onClick={()=>toggleLang("en")}>English</MenuItem>
                    </MenuList>
                </Menu>
           </Box>
            <Box mt="5" mb="5">
                <Button onClick={()=>setSignup(false)} mr="1" borderRadius="0">{langdata.signbtn}</Button>
                <Button onClick={()=>setSignup(true)} borderRadius="0">{langdata.logbtn}</Button>
            </Box>
            {signup===false && <SignupView setcon={setcon} setinfo={setinfo} disconnect={disconnect} />}
            {signup===true && <LoginView setcon={setcon} setinfo={setinfo} disconnect={disconnect} />}
        </Box>
    )
}
