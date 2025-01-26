import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession } from "../redux/SessionSlice";

function Wrapper({ children }) {
  const dispatch = useDispatch();
  const { session, isLoading, error } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  } else {
    if (session) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }
}

export default Wrapper;
