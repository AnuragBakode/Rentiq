import React, { useState, useEffect } from "react";
import { Package, User, DollarSign } from "lucide-react";
import NavBar from "../components/NavBar";
import ProfileOrderDetails from "../components/ProfileOrderDetails";
import ProfileProductSection from "../components/ProfileProductSection";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProducts,
  updateSelectedProduct,
} from "../redux/UserProductsSlice";
import { setSelectedOrder } from "../redux/UserOrdersSlice";
import ProfileUserDetails from "../components/ProfileUserDetails";
import { MoveRight } from "lucide-react";
import { Link } from "react-router";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("products");
  const dispatch = useDispatch();

  const { session } = useSelector((state) => state.session);
  const user = session.user;

  useEffect(() => {
    dispatch(fetchUserProducts({ userid: user.id }));
  }, []);

  let userInfo = { ...user.user_metadata };
  userInfo.email = user.email;

  return (
    <div className="w-11/12 m-auto">
      <div className="sticky top-0 pt-6 z-10 bg-white">
        <NavBar />
      </div>
      <div className="w-full mt-7 bg-white flex flex-col">
        <div className="flex flex-col lg:flex-row w-full">
          <ProfileUserDetails user={userInfo} showLogout={true} />
        </div>

        <div className="w-full mt-10">
          <div className="flex items-start justify-between">
            <div className="flex mb-2">
              <button
                className={`mr-7 sm:mr-10 text-xs sm:text-sm font-medium flex items-center gap-2 relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:bg-rose after:transition-all after:duration-300 ${
                  activeTab === "products" ? " after:w-full" : " after:w-0"
                }`}
                onClick={() => {
                  setActiveTab("products");
                  dispatch(setSelectedOrder(null));
                  dispatch(updateSelectedProduct(null));
                }}
              >
                <Package size={16} /> Products
              </button>
              <button
                className={`text-xs sm:text-sm font-medium flex items-center gap-2 relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:bg-rose after:transition-all after:duration-300 ${
                  activeTab === "orders" ? "after:w-full" : " after:w-0"
                }`}
                onClick={() => {
                  setActiveTab("orders");
                  dispatch(setSelectedOrder(null));
                  dispatch(updateSelectedProduct(null));
                }}
              >
                <User size={16} /> Orders
              </button>
            </div>
            <Link
              to="/products"
              className="flex items-center font-medium text-xs sm:text-sm text-rose cursor-pointer"
            >
              Browse Products <MoveRight className="mt-1 ml-2" size={18} />
            </Link>
          </div>

          <div>
            {activeTab === "products" && <ProfileProductSection />}
            {activeTab === "orders" && <ProfileOrderDetails />}
          </div>
        </div>
      </div>
    </div>
  );
}
