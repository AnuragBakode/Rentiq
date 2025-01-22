import React, { useEffect, useState } from "react";
import supabase from "../supabase/auth";
import { Navigate } from "react-router";
import Loader from "./Loader";

function Wrapper({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function func() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session);

      setLoggedIn(!!session);
      setLoading(false);
    }

    func();
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    if (isLoggedIn) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }
}

export default Wrapper;
