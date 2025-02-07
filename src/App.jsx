import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router'
import Home from './pages/Home'
import Wrapper from './components/Wrapper'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from "./pages/Dashboard";
import AuthWrapper from "./components/AuthWrapper";
import Products from "./pages/Products";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthWrapper children={<Signin />} />} />
        <Route path="/signup" element={<AuthWrapper children={<Signup />} />} />
        <Route path="/products" element={<Wrapper children={<Products />} />} />
        <Route
          path="/dashboard"
          element={<Wrapper children={<Dashboard />} />}
        />
        <Route path="/user" element={<Wrapper children={<Profile />} />} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App 
