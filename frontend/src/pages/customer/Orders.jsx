import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function Orders() {
  const [order, setOrder] = useState(null); 
  const [orderID, setOrderID] = useState("");
  const { user, token } = useContext(AuthContext);
  const role = user?.role;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${backendURL}/api/orders/${orderID}`, {
        headers: { token },
      });

      if (data.success) {
        setOrder(data.order); 
      } else {
        setOrder(null);
        toast.error("No order found");
      }
    } catch (error) {
      setOrder(null);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="h-full">
      <div className="flex flex-row items-center justify-between px-3 mt-3">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
            className="bg-stone-800 border border-gray-500 p-2 rounded-lg text-white"
            placeholder="Enter order ID"
          />
          <button
            type="submit"
            className={`bg-red-500 hover:shadow-md text-white mx-3 px-3 py-1 rounded cursor-pointer`}
          >
            Search
          </button>
        </form>
      </div>

    
      <div className="bg-stone-800 text-white w-full p-6 rounded-lg shadow-md mt-3">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-white">
            <thead className="text-xs uppercase bg-black text-white">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items Ordered</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Order Time</th>
              </tr>
            </thead>

            <tbody>
              {order ? (
                <tr className="bg-stone-800 border-b hover:bg-stone-900 text-white">
                  <td className="px-4 py-3">{order.order_uuid}</td>
                  <td className="px-4 py-3">
                    {order.customer ? order.customer.name : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {order.Order_items.map((item, i) => (
                      <span key={i} className="mr-2">
                        {item.quantity} x {item.Product.name},
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3">Rs. {order.total_amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full
                      ${
                        order.status === "delivered"
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
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No order found
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
