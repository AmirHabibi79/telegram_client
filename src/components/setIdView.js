import { useRef,useContext } from "react"
import { chatContext } from "../contexts/chatContext"
import {Box,Input,Button,FormHelperText,FormControl,FormLabel} from "@chakra-ui/react"
export default function SetIdView({setId}) {
    const input=useRef()
    const [,,,,,,,,,disconnect]=useContext(chatContext)
    const setUserId=()=>{
        if(input.current.value.length<=6){
            input.current.setAttribute("aria-invalid","true")
        }
        else{
            if(!disconnect)
            setId(input.current.value)
        }
    }
    return (
        <Box height={disconnect?"calc(100vh - 30px)":"100vh"} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
            <Box width="200px">
                <FormControl>
                <FormLabel >Enter id</FormLabel>
                <Input  errorBorderColor="crimson" ref={input} mb="1" type="text" placeholder="id"/>
                <FormHelperText mb="1" mt="0">Enter id for signup.</FormHelperText>
                <Button colorScheme="green" isDisabled={disconnect} onClick={setUserId}>Save</Button>
                </FormControl>
            </Box>
        </Box>
    )
}
