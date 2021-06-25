import { useRef } from "react"
import {Box,Input,Button,FormHelperText,FormControl,FormLabel} from "@chakra-ui/react"
export default function SetIdView({setId}) {
    const input=useRef()
    const setUserId=()=>{
        if(input.current.value.length<=6){
            input.current.setAttribute("aria-invalid","true")
        }
        else{
            setId(input.current.value)
        }
    }
    return (
        <Box height="100vh" width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
            <Box width="200px">
                <FormControl>
                <FormLabel >Enter id</FormLabel>
                <Input  errorBorderColor="crimson" ref={input} mb="1" type="text" placeholder="id"/>
                <FormHelperText mb="1" mt="0">We'll never share your email.</FormHelperText>
                <Button colorScheme="green" onClick={setUserId}>Save</Button>
                </FormControl>
            </Box>
        </Box>
    )
}
