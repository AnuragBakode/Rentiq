import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession } from "../redux/SessionSlice";
import { fetchProductCategory } from "../redux/ProductCategorySlice";
import Cart from "./Cart";
import { getCartItems } from "../redux/CartSlice";

function Wrapper({ children }) {
  const dispatch = useDispatch();
  const { session, isLoading } = useSelector((state) => state.session);
  const { isCartOpen } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchSession());
    dispatch(fetchProductCategory());
    dispatch(getCartItems());
  }, [dispatch]);


  if (isLoading) {
    return <Loader />;
  } else {
    if (session) {
      return (
        <div>
          {children}
          {isCartOpen && <Cart items={{}} />}
        </div>
      );
    } else {
      return <Navigate to="/login" />;
    }
  }
}

export default Wrapper;
