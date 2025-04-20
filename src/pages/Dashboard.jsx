import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductCategory } from "../redux/ProductCategorySlice";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const productCategory = useSelector((state) => state.productCategory);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col m-auto w-11/12">
      <div className="sticky top-0 pt-6 z-10 bg-white">
        <NavBar />
      </div>
      <Header showCards={true} />
      <Carousel title="Featured Categories" items={productCategory} />
    </div>
  );
};

export default Dashboard;
