import React, { useState, useEffect } from "react";
import OrderRecieved from "./OrderRecieved";
import OrderPlaced from "./OrderPlaced";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, setSelectedOrder } from "../redux/UserOrdersSlice";
import { Calendar, Mail, Phone, User } from "lucide-react";
import { Trash2 } from "lucide-react";
import supabase from "../supabase/auth.js";
import Loader from "./Loader";
import { updateOrderListAfterStatusChange } from "../redux/UserOrdersSlice";
import { Link } from "react-router";

const ProfileOrderDetails = () => {
  const [orderRecieved, setOrderRecieved] = useState(false);
  const [showDateInputs, setShowDateInputs] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleInProgress = async () => {
    setLoading(true);
    console.log("Button Clicked");

    const { data, error } = await supabase.functions.invoke(
      "updateOrderStatus",
      {
        body: {
          order_id: selectedOrder.order_id,
          status: "InProgress",
        },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(
              localStorage.getItem("sb-dpbexlknorwqhblxxmfl-auth-token")
            ).access_token
          }`,
        },
      }
    );

    // If the status is successfully update, make the changes in the store as well
    if (data) {
      console.log("success");

      let updatedOrder = {
        ...selectedOrder,
        status: { status: "InProgress" },
      };
      dispatch(setSelectedOrder(updatedOrder));
      dispatch(
        updateOrderListAfterStatusChange({
          order_id: selectedOrder.order_id,
          updatedOrder,
        })
      );
    }

    setLoading(false);
  };

  const handleCompleted = async () => {
    setLoading(true);
    console.log("Completed Btn Clicked");

    const { data, error } = await supabase.functions.invoke(
      "updateOrderStatus",
      {
        body: {
          order_id: selectedOrder.order_id,
          status: "Completed",
        },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(
              localStorage.getItem("sb-dpbexlknorwqhblxxmfl-auth-token")
            ).access_token
          }`,
        },
      }
    );

    if (data) {
      console.log("Status changed to Completed");
      let updatedOrder = {
        ...selectedOrder,
        status: { status: "Completed" },
      };
      dispatch(setSelectedOrder(updatedOrder));
      dispatch(
        updateOrderListAfterStatusChange({
          order_id: selectedOrder.order_id,
          updatedOrder,
        })
      );
    }

    setLoading(false);
  };

  const handleUpdateDate = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("updateOrder", {
      body: {
        order_id: selectedOrder.order_id,
        start_date: startDate,
        end_date: endDate,
      },
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("sb-dpbexlknorwqhblxxmfl-auth-token"))
            .access_token
        }`,
      },
    });

    if (data) {
      setShowDateInputs(false);
      let updatedOrder = {
        ...selectedOrder,
        start_date: startDate,
        end_date: endDate,
      };
      dispatch(setSelectedOrder(updatedOrder));
      dispatch(
        updateOrderListAfterStatusChange({
          order_id: selectedOrder.order_id,
          updatedOrder,
        })
      );
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex items-start flex-col lg:flex-row">
        <div className="rounded-lg w-full lg:w-3/5">
          <h2 className="text-xl font-semibold mb-4 mt-6">Your Orders</h2>
          <div className="flex mb-6">
            <button
              className={`mr-10 text-xs md:text-sm font-medium relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:bg-rose after:transition-all after:duration-300 ${
                !orderRecieved ? "after:w-full" : "after:w-0"
              }`}
              onClick={() => {
                setOrderRecieved(false);
                setShowDateInputs(false);
                dispatch(setSelectedOrder(null));
              }}
            >
              Orders Placed
            </button>
            <button
              className={`text-xs md:text-sm font-medium relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:bg-rose after:transition-all after:duration-300 ${
                orderRecieved ? "after:w-full" : "after:w-0"
              }`}
              onClick={() => {
                setOrderRecieved(true);
                setShowDateInputs(false);
                dispatch(setSelectedOrder(null));
              }}
            >
              Orders Received
            </button>
          </div>
          <div className="">
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

        <div className="w-full lg:w-2/5 bg-gray-100 rounded-lg lg:p-4 ">
          {selectedOrder && (
            <div className="space-y-3 relative">
              <button
                onClick={() => {
                  dispatch(setSelectedOrder(null));
                  setShowDateInputs(false);
                  setStartDate("");
                  setEndDate("");
                }}
                className="absolute top-0 right-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <h2 className="text-xl font-semibold mb-4 mt-6">Order Details</h2>

              <div className="bg-white p-2 transition-shadow duration-300 flex justify-between items-center">
                <h3 className="font-semibold text-grey_dark text-sm">
                  Order Status:{" "}
                  <span className="">{selectedOrder.status.status}</span>
                </h3>
                {orderRecieved
                  ? selectedOrder.status.status === "Pending" && (
                      <button
                        className="text-white bg-blue px-2 py-1 rounded-md text-xs font-semibold"
                        onClick={handleInProgress}
                      >
                        Mark as In Progress
                      </button>
                    )
                  : selectedOrder.status.status === "InProgress" && (
                      <button
                        className="text-white bg-blue px-2 py-1 rounded-md text-xs font-semibold"
                        onClick={handleCompleted}
                      >
                        Mark as Completed
                      </button>
                    )}
              </div>

              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
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
                  {!orderRecieved &&
                    selectedOrder.status.status === "Pending" && (
                      <>
                        {showDateInputs ? (
                          <div className="flex gap-6">
                            <button
                              className="text-red text-sm font-medium"
                              onClick={() => {
                                handleUpdateDate();
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="text-red text-sm font-medium"
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
                    <div className="flex items-center justify-between text-rose">
                      <h3 className="font-semibold text-gray-800 text-sm mb-4">
                        Owner
                      </h3>
                      <Link
                        to={`/users/${selectedOrder.ownerDetails.sub}`}
                        className="font-semibold text-gray-800 text-sm mb-4 text-rose cursor-pointer select-non"
                      >
                        View Profile
                      </Link>
                    </div>
                    <div className="h-20 flex items-center space-x-4">
                      <div className="border w-20 mr-4 flex items-center justify-center h-full rounded-full">
                        {selectedOrder.ownerDetails.avatar ? (
                          <img
                            src={selectedOrder.ownerDetails.avatar}
                            alt="Owner"
                            className="rounded-full w-full h-full object-cover"
                          />
                        ) : (
                          <User />
                        )}
                      </div>
                      <div className="text-xs">
                        <div className="flex items-center text-gray-700 mb-2">
                          <User size={16} className="mr-2" />
                          <span className="font-medium">
                            {selectedOrder.ownerDetails.name}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700 mb-2">
                          <Mail size={16} className="mr-2" />
                          <span>{selectedOrder.ownerDetails.email}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Phone size={16} className="mr-2" />
                          <span>
                            {selectedOrder.ownerDetails.contact
                              ? selectedOrder.ownerDetails.contact
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {selectedOrder.status.status === "Pending" && (
                    <div className="flex space-x-3">
                      <button
                        className="flex-1 bg-rose/30 text-rose px-4 py-2 rounded-lg font-medium hover:bg-rose-500 transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center gap-2"
                        onClick={handleDeleteOrder}
                      >
                        <Trash2 size={18} />
                        Cancel Order
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between text-rose">
                    <h3 className="font-semibold text-gray-800 text-sm mb-3 pb-2">
                      Renter
                    </h3>
                    <Link
                      to={`/users/${selectedOrder.renterDetails.sub}`}
                      className="font-semibold text-gray-800 text-sm mb-3 pb-2"
                    >
                      View Profile
                    </Link>
                  </div>
                  <div className="h-20 flex items-center space-x-4">
                    <div className="border w-20 mr-4 flex items-center justify-center h-full rounded-full">
                      {selectedOrder.renterDetails.avatar ? (
                        <img
                          src={selectedOrder.renterDetails.avatar}
                          alt="Owner"
                          className="rounded-full w-full h-full"
                        />
                      ) : (
                        <User />
                      )}
                    </div>
                    <div className="text-xs">
                      <div className="flex items-center text-gray-700 mb-2">
                        <User size={16} className="mr-2" />
                        <span className="font-medium">
                          {selectedOrder.renterDetails.name}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700 mb-2">
                        <Mail size={16} className="mr-2" />
                        <span>{selectedOrder.renterDetails.email}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Phone size={16} className="mr-2" />
                        <span>
                          {selectedOrder.renterDetails.contact
                            ? selectedOrder.renterDetails.contact
                            : "N/A"}
                        </span>
                      </div>
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
