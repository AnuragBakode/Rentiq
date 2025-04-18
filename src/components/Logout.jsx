import React, { useState } from "react";
import supabase from "../supabase/auth";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";
import { updateSelectedProduct } from "../redux/UserProductsSlice";
import { setSelectedOrder } from "../redux/UserOrdersSlice";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function logout() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    dispatch(clearCart());
    dispatch(updateSelectedProduct(null));
    dispatch(setSelectedOrder(null));
    if (error) {
      setLoading(false);
    }
    navigate("/login");
  }

  return (
    <>
      {loading && <Loader />}
      <button
        className="bg-rose/10 text-rose rounded-lg px-2 lg:px-3 py-2 text-sm font-medium hover:bg-rose/20 transition-colors duration-300"
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
