import { ChakraProvider, Button } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <Button colorScheme="blue" onClick={() => alert("its working")}>Hello world</Button>
    </ChakraProvider>
  );
}

export default App;
