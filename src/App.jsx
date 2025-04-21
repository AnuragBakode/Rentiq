import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Wrapper from "./components/Wrapper";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AuthWrapper from "./components/AuthWrapper";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import UserLayout from "./pages/UserLayout";
import UserSearch from "./components/UserSearch";
import UserDetails from "./components/UserDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentError from "./pages/PaymentError";
import Page404 from "./pages/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper children={<Dashboard />} />} />
        <Route path="/login" element={<AuthWrapper children={<Signin />} />} />
        <Route path="/signup" element={<AuthWrapper children={<Signup />} />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/products" element={<Wrapper children={<Products />} />} />
        <Route path="/profile" element={<Wrapper children={<Profile />} />} />
        <Route path="/users" element={<Wrapper children={<UserLayout />} />}>
          <Route index element={<UserSearch />} />
          <Route path=":id" element={<UserDetails />} />
        </Route>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-error" element={<PaymentError />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App 
