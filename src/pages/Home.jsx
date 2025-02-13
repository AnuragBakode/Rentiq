import React from "react";
import Logout from "../components/Logout";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <h1>Default home Page</h1>
      <Logout />
    </>
  );
};

export default Home;
