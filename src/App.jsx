import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router'
import Home from './pages/Home'
import Wrapper from './components/Wrapper'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Wrapper children = {<Home/>} />}/>
        <Route path = '/login' element = {<Wrapper children = {<Signin/>} />} />
        <Route path = '/signup' element = {<Wrapper children = {<Signup  />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 
