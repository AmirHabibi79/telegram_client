import TelegramClone from "./components/TelegramClone";
import {ChakraProvider} from "@chakra-ui/react"
import {SocketProvider} from "./contexts/SocketContext"
import {ChatProvider} from "./contexts/chatContext"
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [id,setId]=useLocalStorage("id","")
  return (
    <ChakraProvider>
      <SocketProvider id={id}>
        <ChatProvider id={id}>
          <TelegramClone id={id} setId={setId}/>
        </ChatProvider>
      </SocketProvider>
    </ChakraProvider>
  );
}

export default App;
