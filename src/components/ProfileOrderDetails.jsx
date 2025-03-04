import React, { useState, useEffect } from "react";
import OrderRecieved from "./OrderRecieved";
import OrderPlaced from "./OrderPlaced";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, setSelectedOrder } from "../redux/UserOrdersSlice";
import { Calendar } from "lucide-react";
import { Trash2 } from "lucide-react";
import supabase from '../supabase/auth.js'
import Loader from './Loader'

const ProfileOrderDetails = () => {
  const [orderRecieved, setOrderRecieved] = useState(false);
  const [showDateInputs, setShowDateInputs] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading , setLoading] = useState(false);

  const { session } = useSelector((state) => state.session);
  const user = session.user;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders(user.id));
  }, []);

  const selectedOrder = useSelector((state) => state.userOrders.selectedOrder);

  console.log(selectedOrder);
  

  const handleDeleteOrder = async () => {
    setLoading(true);
    console.log("Delete Btn Clicked");

    const { data, error } = await supabase.functions.invoke("deleteOrder", {
      body: {
        orderId: selectedOrder.order_id,
      },
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("sb-dpbexlknorwqhblxxmfl-auth-token"))
            .access_token
        }`,
      },
    });

    if (error) {
      setLoading(false);
    }

    if (data) {
      setLoading(false);
      dispatch(setSelectedOrder(null));
      dispatch(fetchOrders(user.id));
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex h-full">
        <div className="bg-gray-100 rounded-lg w-3/5">
          <h2 className="text-xl font-semibold mb-4 mt-6">Your Orders</h2>
          <div className="flex mb-6">
            <button
              className={`mr-10 text-sm font-medium relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:bg-rose after:transition-all after:duration-300 ${
                !orderRecieved ? "after:w-full" : "after:w-0"
              }`}
              onClick={() => {
                setOrderRecieved(false);
                dispatch(setSelectedOrder(null));
              }}
            >
              Orders Placed
            </button>
            <button
              className={`text-sm font-medium relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:bg-rose after:transition-all after:duration-300 ${
                orderRecieved ? "after:w-full" : "after:w-0"
              }`}
              onClick={() => {
                setOrderRecieved(true);
                dispatch(setSelectedOrder(null));
              }}
            >
              Orders Received
            </button>
          </div>
          <div className="w-full">
            {orderRecieved ? (
              <OrderRecieved
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setShowDateInputs={setShowDateInputs}
              />
            ) : (
              <OrderPlaced
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setShowDateInputs={setShowDateInputs}
              />
            )}
          </div>
        </div>

        <div className="w-2/5 bg-gray-100 rounded-lg p-4 h-full ">
          {selectedOrder && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold mb-4 mt-6">Order Details</h2>
              <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-gray-800 text-sm mb-3 border-b pb-2">
                  Product Details
                </h3>
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedOrder.Products.picture}
                    alt={selectedOrder.Products.name}
                    className="w-28 h-28 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
                  />
                  <div className="space-y-1">
                    <p className="text-gray-700 font-medium">
                      {selectedOrder.Products.name}
                    </p>
                    <p className="text-rose-600 font-semibold">
                      ₹{selectedOrder.Products.price}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {selectedOrder.Products.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-center mb-3 border-b pb-2">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    Rental Period
                  </h3>
                  {!orderRecieved && !selectedOrder.completed && (
                    <>
                      {showDateInputs ? (
                        <div className="flex gap-2">
                          <button
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                            onClick={() => {
                              // Handle save dates here
                              setShowDateInputs(false);
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                            onClick={() => {
                              setShowDateInputs(false);
                              setStartDate(selectedOrder.start_date);
                              setEndDate(selectedOrder.end_date);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="text-rose hover:text-blue-600 text-sm font-medium flex items-center gap-1"
                          onClick={() => {
                            setStartDate(selectedOrder.start_date);
                            setEndDate(selectedOrder.end_date);
                            setShowDateInputs(true);
                          }}
                        >
                          <Calendar size={16} />
                          Update Dates
                        </button>
                      )}
                    </>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <span className="font-medium w-16">From:</span>
                    {showDateInputs ? (
                      <input
                        type="date"
                        className="border rounded px-2 py-1"
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                      />
                    ) : (
                      <span>
                        {new Date(
                          selectedOrder.start_date
                        ).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="font-medium w-16">To:</span>
                    {showDateInputs ? (
                      <input
                        type="date"
                        className="border rounded px-2 py-1"
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
                      />
                    ) : (
                      <span>
                        {new Date(selectedOrder.end_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {!orderRecieved ? (
                <>
                  <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="font-semibold text-gray-800 text-sm mb-3 border-b pb-2">
                      Owner Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium w-16">Name:</span>
                        <span>{selectedOrder.owner_name}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium w-16">Email:</span>
                        <span>{selectedOrder.owner_email}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium w-16">Phone:</span>
                        <span>{selectedOrder.owner_phone}</span>
                      </div>
                    </div>
                  </div>
                  {!selectedOrder.completed && (
                    <div className="flex space-x-3">
                      <button
                        className="flex-1 bg-rose/30 text-rose px-4 py-2 rounded-lg font-medium hover:bg-rose-500 transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center gap-2"
                        onClick={handleDeleteOrder}
                      >
                        <Trash2 size={18} />
                        Delete Order
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-semibold text-gray-800 text-lg mb-3 border-b pb-2">
                    Renter Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium w-16">Name:</span>
                      <span>{selectedOrder.user_name}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium w-16">Email:</span>
                      <span>{selectedOrder.user_email}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium w-16">Phone:</span>
                      <span>{selectedOrder.user_phone}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileOrderDetails;
