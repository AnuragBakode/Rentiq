import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, User } from "lucide-react";
import Card from "./Card";
import { setSelectedOrder } from "../redux/UserOrdersSlice";

const OrderPlaced = ({ setStartDate, setEndDate, setShowDateInputs }) => {
  const { ordersPlaced } = useSelector((state) => state.userOrders);
  const dispatch = useDispatch();

  const selectedOrder = useSelector((state) => state.userOrders.selectedOrder);

  return (
    <div className="flex flex-wrap overflow-x-auto">
      {ordersPlaced && ordersPlaced.length > 0 ? (
        ordersPlaced.map((order) => {
          return (
            <div
              className="w-1/3 p-2"
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
                }}
                page="Orders"
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
