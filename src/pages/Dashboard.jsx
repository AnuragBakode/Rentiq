import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductCategory } from "../redux/ProductCategorySlice";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductCategory());
  }, [dispatch]);

  const productCategory = useSelector((state) => state.productCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Header />
      <Carousel title="Featured Categories" items={productCategory} />
    </div>
  );
};

export default Dashboard;
