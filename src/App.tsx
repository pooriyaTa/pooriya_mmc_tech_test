import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import MainPage from './pages/MainPage'

function App() {

  return (
    <ChakraProvider>
      <MainPage />
    </ChakraProvider>
  )
}

export default App
