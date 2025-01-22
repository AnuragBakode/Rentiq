import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router'
import Home from './pages/Home'
import Wrapper from './components/Wrapper'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Wrapper children={<Dashboard />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App 
