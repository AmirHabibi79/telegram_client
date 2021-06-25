import React from 'react'
import {Box,Heading,useColorMode} from "@chakra-ui/react"
export default function ChatMessage({msg,id}) {
    const {colorMode}=useColorMode()
    return (
        <>
        {msg.from===id
        ?
        <Box mb="3" display="flex" justifyContent="flex-end">
            {colorMode==="light"
            ?
            <Box p="2" maxWidth="160px" boxShadow="md" borderRadius="md" bg="green.300">
                <Heading fontSize="x-large">{msg.message}</Heading>
            </Box>
            :
            <Box p="2" maxWidth="160px" boxShadow="md" borderRadius="md" bg="gray.900">
                <Heading fontSize="x-large">{msg.message}</Heading>
            </Box>
            }
        </Box>
        :
        <Box mb="3" display="flex" justifyContent="flex-start">
            {colorMode==="light"
            ?
            <Box p="2" maxWidth="160px" boxShadow="md" borderRadius="md" bg="white">
                <Heading fontSize="x-large">{msg.message}</Heading>
            </Box>
            :
            <Box p="2" maxWidth="160px" boxShadow="md" borderRadius="md" bg="gray.600">
                <Heading fontSize="x-large">{msg.message}</Heading>
            </Box>
            }
        </Box>
        }
        </>
        
    )
}
