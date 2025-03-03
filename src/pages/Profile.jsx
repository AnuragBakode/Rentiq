import React, { useState, useEffect } from "react";
import { Package, User, DollarSign } from "lucide-react";
import NavBar from "../components/NavBar";
import UserDetails from "../components/UserDetails";
import ProfileOrderDetails from "../components/ProfileOrderDetails";
import ProfileProductSection from "../components/ProfileProductSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProducts } from "../redux/UserProductsSlice";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("products");
  const dispatch = useDispatch();

  const { session } = useSelector((state) => state.session);
  const user = session.user;

  useEffect(() => {
    dispatch(fetchUserProducts({ userid: user.id }));
  }, []);

  return (
    <div className="w-11/12 m-auto">
      <div className="mt-5">
        <NavBar />
      </div>
      <div className="w-full mx-auto mt-10 bg-white flex">
        <div className="w-1/6 bg-gray-100">
          <UserDetails />
        </div>

        <div className="w-5/6">
          <div className="flex mb-2">
            <button
              className={`mr-10 text-sm font-medium flex items-center gap-2 relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:bg-rose after:transition-all after:duration-300 ${
                activeTab === "products" ? " after:w-full" : " after:w-0"
              }`}
              onClick={() => setActiveTab("products")}
            >
              <Package size={18} /> Products
            </button>
            <button
              className={`text-sm font-medium flex items-center gap-2 relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:bg-rose after:transition-all after:duration-300 ${
                activeTab === "orders" ? "after:w-full" : " after:w-0"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <User size={18} /> Orders
            </button>
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
