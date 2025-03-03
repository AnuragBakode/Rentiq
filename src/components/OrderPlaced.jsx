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
        <p className="text-center">Your dont have any orders</p>
      )}
    </div>
  );
};

export default OrderPlaced;
