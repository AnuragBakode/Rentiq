import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router'
import Home from './pages/Home'
import Wrapper from './components/Wrapper'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from "./pages/Dashboard";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthWrapper children={<Signin />} />} />
        <Route path="/signup" element={<AuthWrapper children={<Signup />} />} />
        <Route
          path="/dashboard"
          element={<Wrapper children={<Dashboard />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App 
