import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductCategory } from "../redux/ProductCategorySlice";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const productCategory = useSelector((state) => state.productCategory);

  return (
    <div className="flex flex-col m-auto w-11/12">
      <div className="mt-6">
        <NavBar />
      </div>
      <Header showCards={true} />
      <Carousel title="Featured Categories" items={productCategory} />
    </div>
  );
};

export default Dashboard;
