import React, { useContext, useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function Orders() {
  const [showFilter, setShowFiler] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderID, setOrderID] = useState("");
  const { user, token } = useContext(AuthContext);
  const role = user.role;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/orders`, {
        headers: { token },
      });
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching orders");
    }
  };

  const updateOrder = async (orderId, newStatus) => {
    try {
      const { data } = await axios.patch(
        `${backendURL}/api/orders/${orderId}`,
        { status: newStatus },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Order updated successfully!");
        fetchOrders();
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        toast.error(data.message || "Failed to update order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${backendURL}/api/orders/${orderID}`, {
        headers: { token },
      });

      if (data.success) {
        setOrders([data.order]);
      } else {
        setOrders(null);
        toast.error("No order found");
      }
    } catch (error) {
      setOrders(null);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="h-full ">
      <div className="flex flex-row items-center justify-between px-3 mt-3 ">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
            className="border border-gray-500 p-2 rounded-lg bg-white"
            placeholder="Enter order ID"
          />
          <button
            type="submit"
            className={`${role} hover:shadow-md text-white mx-3 px-3 py-1 rounded cursor-pointer`}
          >
            Search
          </button>
        </form>
        <SlidersHorizontal
          size={40}
          className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl"
          onClick={() => setShowFiler(!showFilter)}
        />
      </div>


      <div className="bg-white w-full p-6 rounded-lg shadow-md mt-3">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Items Ordered</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Order Status</th>
                <th className="px-4 py-3">Assigned Staff</th>
                <th className="px-4 py-3">Order Time</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr
                    key={order.order_id || index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{order.order_uuid}</td>
                    <td className="px-4 py-3">
                      {order.customer ? order.customer.name : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {order.Order_items.map((item, index) => (
                        <span key={index} className="mr-2">
                          {item.quantity} x {item.Product.name} ,
                        </span>
                      ))}
                    </td>

                    <td className="px-4 py-3">Rs. {order.total_amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full
                        ${order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "ready"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{order.takenBy.name}</td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <select
                        className="border m-1 rounded"
                        value={order.tempStatus || order.status}
                        onChange={(e) =>
                          setOrders((prev) =>
                            prev.map((o) =>
                              o.order_id === order.order_id
                                ? { ...o, tempStatus: e.target.value }
                                : o
                            )
                          )
                        }
                      >
                        <option value="In Process">In Process</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                      <button
                        onClick={() =>
                          updateOrder(
                            order.order_id,
                            order.tempStatus || order.status
                          )
                        }
                        className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
