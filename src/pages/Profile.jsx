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
      <div className="mt-6">
        <NavBar />
      </div>
      <div className="w-full mx-auto mt-6 bg-white flex gap-6">
        <div className="w-1/6 bg-gray-100 p-6">
          <UserDetails />
        </div>

        <div className="w-5/6">
          <div className="flex space-x-4 mb-6 border-b pb-2">
            <button
              className={`px-4 py-2 text-lg font-medium flex items-center gap-2 ${
                activeTab === "products" ? "text-rose" : "text-black"
              }`}
              onClick={() => setActiveTab("products")}
            >
              <Package size={18} /> Products
            </button>
            <button
              className={`px-4 py-2 text-lg font-medium flex items-center gap-2 ${
                activeTab === "orders" ? "text-rose" : "text-black"
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
