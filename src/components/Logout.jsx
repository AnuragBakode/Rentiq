import React, { useState } from "react";
import supabase from "../supabase/auth";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function logout() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    dispatch(clearCart());
    if (error) {
      setLoading(false);
    }
    navigate("/login");
  }

  return (
    <>
      {loading && <Loader />}
      <button
        className="text-rose font-semibold font-Poppins text-sm"
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
