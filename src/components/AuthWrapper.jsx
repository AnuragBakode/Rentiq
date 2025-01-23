import React, { useEffect, useState } from "react";
import supabase from "../supabase/auth";
import Loader from "./Loader";
import { Navigate } from "react-router";

const AuthWrapper = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setLoading(false);
      setLoggedIn(!!session);
    }

    getSession();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    if (isLoggedIn) {
      return <Navigate to="/dashboard" />;
    } else {
      return children;
    }
  }
};

export default AuthWrapper;
