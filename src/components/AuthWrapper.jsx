import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession } from "../redux/SessionSlice";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { session, isLoading } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  useEffect(() => {
    console.log("Auth mounted");
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    if (session) {
      return <Navigate to="/dashboard" />;
    } else {
      return children;
    }
  }
};

export default AuthWrapper;
