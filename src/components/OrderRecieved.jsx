import React from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedOrder } from "../redux/UserOrdersSlice";

const OrderRecieved = ({ setStartDate, setEndDate, setShowDateInputs }) => {
  const { ordersRecieved } = useSelector((state) => state.userOrders);
  const dispatch = useDispatch();
  const selectedOrder = useSelector((state) => state.userOrders.selectedOrder);
  return (
    <div className="flex flex-wrap max-h-full overflow-y-scroll">
      {ordersRecieved && ordersRecieved.length > 0 ? (
        ordersRecieved.map((order) => {
          return (
            <div
              className="w-1/3 p-2"
              onClick={() => {
                setShowDateInputs(false);
                dispatch(setSelectedOrder(order));
                setStartDate(selectedOrder.start_date);
                setEndDate(selectedOrder.end_date);
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
        <p className="text-center text-gray-500">
          You dont have any orders recieved
        </p>
      )}
    </div>
  );
};

export default OrderRecieved;
