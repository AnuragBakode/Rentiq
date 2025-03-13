import React from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedOrder } from "../redux/UserOrdersSlice";

const OrderRecieved = ({ setStartDate, setEndDate, setShowDateInputs }) => {
  const { ordersRecieved } = useSelector((state) => state.userOrders);

  const dispatch = useDispatch();
  const selectedOrder = useSelector((state) => state.userOrders.selectedOrder);

  return (
    <div className="flex flex-col h-[50vh] overflow-y-scroll lg:h-[100vh]">
      {ordersRecieved && ordersRecieved.length > 0 ? (
        ordersRecieved.map((order) => {
          return (
            <div
              className="w-full"
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
                  status: order.status.status,
                }}
                page="Orders"
              />
            </div>
          );
        })
      ) : (
        <div className="w-full h-48 bg-gray-50 rounded-lg">
          <p className="text-xl font-medium text-grey_dark/50">
            You haven't recieved any orders yet !
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderRecieved;
