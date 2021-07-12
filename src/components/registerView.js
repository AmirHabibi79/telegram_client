import {useContext, useState } from "react"
import { chatContext } from "../contexts/chatContext"

import {Box,Button} from "@chakra-ui/react"
import SignupView from "./SignupView"
import LoginView from "./LoginView"
export default function RegisterView({setinfo,setcon}) {
    const [signup,setSignup]=useState(false)
    const [,,,,,,,,,disconnect]=useContext(chatContext)
    return (
        <Box  height={disconnect?"calc(100vh - 30px)":"100vh"} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" >
            <Box mt="5" mb="5">
                <Button onClick={()=>setSignup(false)} mr="1" borderRadius="0">Signup</Button>
                <Button onClick={()=>setSignup(true)} borderRadius="0">Login</Button>
            </Box>
            {signup===false && <SignupView setcon={setcon} setinfo={setinfo} disconnect={disconnect} />}
            {signup===true && <LoginView setcon={setcon} setinfo={setinfo} disconnect={disconnect} />}
        </Box>
    )
}
