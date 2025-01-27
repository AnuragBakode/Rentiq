import React, { useEffect } from "react";
import Logout from "../components/Logout";
import PostItem from "../components/PostItem";
import { useDispatch } from "react-redux";
import { fetchProductCategory } from "../redux/ProductCategorySlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductCategory());
  }, [dispatch]);

  return (
    <>
      <h1>Welcome to dashboard</h1>
      <Logout />
      <PostItem />
    </>
  );
};

export default Dashboard;
