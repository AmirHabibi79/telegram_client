import TelegramClone from "./components/TelegramClone";
import {ChakraProvider} from "@chakra-ui/react"
import {SocketProvider} from "./contexts/SocketContext"
import {ChatProvider} from "./contexts/chatContext"
import {LangProvider} from "./contexts/LanguageContext"
import useLocalStorage from "./hooks/useLocalStorage";
import {useEffect, useState} from "react"
function App() {
  const [info,setInfo]=useLocalStorage("info",{})
  const [opse,setOpse]=useState(false)
  const [conversations,setConversations]=useLocalStorage("conversations",[])
  useEffect(()=>{
    conversations.map(c=>{
      if(c.selected){
        c.selected=false
        return c
      }
      return c
    })
    setConversations(conversations)
  },[])
  return (
    <ChakraProvider>
      <SocketProvider id={info.id}>
        <ChatProvider opse={opse} conversations={conversations} setConversations={setConversations} id={info.id}>
          <LangProvider>
            <TelegramClone opse={opse} setOpse={setOpse} info={info} setConversations={setConversations} setinfo={setInfo}/>
          </LangProvider>
        </ChatProvider>
      </SocketProvider>
    </ChakraProvider>
  );
}

export default App;
