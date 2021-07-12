import {Box,Input,Button,FormHelperText,FormControl,FormLabel} from "@chakra-ui/react"
import axios from 'axios'
export default function LoginView({setcon,setinfo,disconnect}) {
    const fields=["info","password"]
    const Login=async(e)=>{
        e.preventDefault()
        await fields.map(f=>{
            document.querySelector("."+f).innerHTML=""
            document.querySelector("input[name="+f+"]").setAttribute("aria-invalid","false")
            return "ok"
        })
        e.preventDefault()
        axios
        .post(process.env.REACT_APP_HTTP+"login",{info:e.target[0].value,password:e.target[1].value},{headers:{"Content-Type":"application/json"}})
        .then(res=>{
            const {id,name,family,phone,userid,profilepic,conversations}=res.data
            const userInfo={
                id,name,family,phone,userid,profilepic
            }
            setcon(conversations)
            setinfo(userInfo)
        })
        .catch(err=>{
           err.response && err.response.data.errors.map(async(er)=>{
            document.querySelector("."+er.path).innerHTML=er.msg
            document.querySelector("input[name="+er.path+"]").setAttribute("aria-invalid","true")
        })

        })
        
    }
    return (
        <Box  >
                <FormControl display="flex" justifyContent="space-between">  
                
                
                <Box>
                <form  onSubmit={Login}>
                

                <FormLabel >Enter Id or Phone</FormLabel>
                <Input name="info" errorBorderColor="crimson" mb="1" type="text" placeholder="your id or phone"/>
                <FormHelperText fontSize="small" className="info" mb="1" color="red"></FormHelperText>

                <FormLabel >Enter Password</FormLabel>
                <Input name="password" errorBorderColor="crimson" mb="1" type="password" placeholder="your password"/>
                <FormHelperText fontSize="small" className="password" mb="1" color="red"></FormHelperText>
                <FormHelperText mb="4" fontSize="small">password must contains 8 letters</FormHelperText>

                <Button type="submit" colorScheme="green" isDisabled={disconnect}>Log in</Button>
                </form>
                </Box>
                </FormControl>
            </Box>
    )
}
