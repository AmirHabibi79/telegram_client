import {Box,Input,Button,FormHelperText,FormControl,FormLabel,Avatar} from "@chakra-ui/react"
import {FaCamera} from "react-icons/fa"
import axios from 'axios'
import { useEffect,useState,useRef } from "react"
export default function SignupView({setcon,setinfo,disconnect}) {
    const inputProfile=useRef()
    const [profile,setProfile]=useState()
    const fields=["name","family","password","phone","userid"]
    const signup=async(e)=>{
        await fields.map(f=>{
            document.querySelector("."+f).innerHTML=""
            document.querySelector("input[name="+f+"]").setAttribute("aria-invalid","false")
            return "ok"
        })
        e.preventDefault()
        const formData = new FormData(e.target);
        axios
        .post(process.env.REACT_APP_HTTP+"signup",formData,{headers:{"Content-Type":"multipart/form-data;"}})
        .then(res=>{
            const {id,name,family,phone,userid,profilepic}=res.data
            const userInfo={
                id,name,family,phone,userid,profilepic
            }
            setcon([])
            setinfo(userInfo)
        })
        .catch(err=>{
           err.response && err.response.data.errors.map(async(er)=>{
            document.querySelector("."+er.path).innerHTML=er.msg
            document.querySelector("input[name="+er.path+"]").setAttribute("aria-invalid","true")
        })

        })
        
    }
    useEffect(()=>{
        inputProfile.current.addEventListener("change",(e)=>{
            const file=e.target.files[0]
            var reader  = new FileReader();

            reader.onloadend = async function () {
                setProfile(reader.result)
            }

            if (file) {
            reader.readAsDataURL(file);
            }
            
        }
        )

    },[])
    return (
        <Box >
                <FormControl display="flex" justifyContent="space-between">  
                {profile?<Avatar mr="2" cursor="pointer" onClick={()=>inputProfile.current.click()} width="14" height="14" src={profile}/>:<Box mr="2" cursor="pointer" onClick={()=>inputProfile.current.click()} width="14" height="14" borderRadius="100%" bg="purple" display="flex" justifyContent="center" alignItems="center" fontSize="sm" color="white">
                    <FaCamera/>
                </Box>
                }
                <Box>
                <form  onSubmit={signup}>
                <Input name="profile" accept=".jpeg,.png,.jpg" display="none" ref={inputProfile} type="file" ></Input>

                <FormLabel >Enter Name</FormLabel>
                <Input name="name" errorBorderColor="crimson" mb="1" type="text" placeholder="your name"/>
                <FormHelperText fontSize="small" className="name" mb="1" color="red"></FormHelperText>


                <FormLabel >Enter Family</FormLabel>
                <Input name="family"  errorBorderColor="crimson" mb="1" type="text" placeholder="your family"/>
                <FormHelperText fontSize="small" className="family" mb="1" color="red"></FormHelperText>

                <FormLabel >Enter Phone</FormLabel>
                <Input  name="phone" errorBorderColor="crimson" mb="1" type="number"  placeholder="your phone"/>
                <FormHelperText fontSize="small" className="phone" mb="1" color="red"></FormHelperText>

                <FormLabel >Enter Password</FormLabel>
                <Input name="password" errorBorderColor="crimson" mb="1" type="password" placeholder="your password"/>
                <FormHelperText fontSize="small" className="password" mb="1" color="red"></FormHelperText>
                <FormHelperText mb="1" fontSize="small">password must contains 8 letters</FormHelperText>

                <FormLabel >Enter Id</FormLabel>
                <Input name="userid" errorBorderColor="crimson" mb="1" type="text"  placeholder="your id"/>
                <FormHelperText fontSize="small" className="userid" mb="1" color="red"></FormHelperText>
                <FormHelperText mb="4" fontSize="small">id must contains 6 letters</FormHelperText>

                <Button type="submit" colorScheme="green" isDisabled={disconnect}>SignUp</Button>
                </form>
                </Box>
                </FormControl>
            </Box>
    )
}
