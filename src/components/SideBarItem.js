import { Avatar, Box,Text,useTheme,useColorMode } from "@chakra-ui/react";
import { useCallback,useContext } from "react";
import { chatContext } from "../contexts/chatContext";
export default function SideBarItem({lastmessage,selected,search,name,family,phone,userid,id,profilepic,conversationid,messages}) {
    const [,conversations,,,setIdsend,,,,,,,setSearch,setConversations]=useContext(chatContext)
    const theme=useTheme()
    const {colorMode}=useColorMode()
    const clickhandle=useCallback(async()=>{
        if(search){
            const newConvarstion={
                name,family,phone,userid,id,profilepic,conversationid:conversationid,selected:true,messages:messages
            }
            const exist=conversations.filter(cc=>cc.userid === newConvarstion.userid)
            if(exist.length===0){
                conversations.unshift(newConvarstion)
                setConversations(conversations)
            }
            else{
                conversations.map(c=>{
                    if(c.userid === newConvarstion.userid){
                        c.selected=true
                        return c
                    }
                    return c
                })
            }
            setSearch(preS=>[...preS.map(m=>{
                if(m.userid===userid){
                    m.selected=true
                    return m
                }
                else{
                    m.selected=false
                    return m
                }
            })])
            setIdsend({conversationid,id,name,family,profilepic})
        }
        else{
            setConversations(preCon=>[...preCon.map(c=>{
                if(c.userid===userid){
                    c.selected=true
                    return c
                }
                else{
                    c.selected=false
                    return c
                }
            })])
            setIdsend({conversationid,id,name,family,profilepic})
        }
    },[name,family,phone,userid,id,setIdsend,conversations,messages,profilepic,conversationid,search,setConversations,setSearch])
    return (
        <Box  onClick={clickhandle} p="2" bg={selected ? colorMode==="dark"?theme.colors.blackAlpha["600"]:theme.colors.blackAlpha["400"]:""}  cursor="pointer" _hover={{background:theme.colors.blackAlpha["400"]}}>
            <Box  display="flex">
            <Avatar name={name+" "+family} src={profilepic}/>
            <Box width="90%" ml="2" display="flex" flexDirection="column" justifyContent="space-between">
                <Text whiteSpace="nowrap" overflowWrap="normal" overflowX="hidden" textOverflow="ellipsis" wordBreak="normal" width="90%" fontWeight="bold">{name+" "+family}</Text>
                <Text  whiteSpace="nowrap" overflowWrap="normal" overflowX="hidden" textOverflow="ellipsis" wordBreak="normal" width="90%" fontSize="small" >{lastmessage}</Text>
            </Box>
            </Box>
        </Box>
    )
}
//style={{wordWrap:"normal",overflow:"hidden",textOverflow:'ellipsis',overflowX:"hidden",wordBreak:"normal"}}