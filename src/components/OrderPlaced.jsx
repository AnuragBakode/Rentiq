import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, User } from "lucide-react";
import Card from "./Card";
import { setSelectedOrder } from "../redux/UserOrdersSlice";
import Loader from "./Loader";

const OrderPlaced = ({ setStartDate, setEndDate, setShowDateInputs }) => {
  const { ordersPlaced, isLoading } = useSelector((state) => state.userOrders);
  const dispatch = useDispatch();

  const selectedOrder = useSelector((state) => state.userOrders.selectedOrder);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col overflow-x-auto max-h-[50vh] overflow-y-scroll lg:max-h-[100vh]">
      {ordersPlaced && ordersPlaced.length > 0 ? (
        ordersPlaced.map((order) => {
          return (
            <div
              className="w-full lg:p-2"
              onClick={() => {
                dispatch(setSelectedOrder(order));
                setStartDate(selectedOrder.start_date);
                setEndDate(selectedOrder.end_date);
                setShowDateInputs(false);
              }}
            >
              <Card
                item={order.Products}
                info={{
                  start_date: order.start_date,
                  end_date: order.end_date,
                  status: order.status.status,
                  owner: order.ownerDetails,
                }}
                page="OrdersPlaced"
              />
            </div>
          );
        })
      ) : (
        <div className="w-full h-48 bg-gray-50 rounded-lg">
          <p className="text-xl font-medium text-grey_dark/50">
            Your dont have any orders
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderPlaced;
