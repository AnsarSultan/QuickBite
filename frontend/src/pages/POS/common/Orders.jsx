import React, { useContext, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";

function Orders() {
  const [showFilter , setShowFiler] = useState(false)
  const {user} = useContext(AuthContext)
  const role = user.role
  return (
    <div className="h-full ">
      <div className="flex flex-row items-center justify-between px-3 mt-3 ">
        <div>
          <input
            type="text"
            className="bg-white border border-gray-500 p-2 rounded-lg"
            placeholder="Enter orderID"
          />
          <button className={`${role} shadow-${role} hover:shadow-md text-white mx-3 px-3 py-1 rounded-xl cursor-pointer`}>
            Search
          </button>
        </div>
        <SlidersHorizontal size={40} className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl"/>
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
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">ORD123</td>
                <td className="px-4 py-3">Ali Khan</td>
                <td className="px-4 py-3">2x Pizza, 1x Coke</td>
                <td className="px-4 py-3">Rs. 1800</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Completed
                  </span>
                </td>
                <td className="px-4 py-3">Cashier #2</td>
                <td className="px-4 py-3">12:45 PM</td>
                <td className="px-4 py-3 text-center">
                  <button className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">
                    View
                  </button>
                </td>
              </tr>

              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">ORD124</td>
                <td className="px-4 py-3">Sara Ahmed</td>
                <td className="px-4 py-3">1x Burger</td>
                <td className="px-4 py-3">Rs. 450</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                    In Process
                  </span>
                </td>
                <td className="px-4 py-3">Kitchen #1</td>
                <td className="px-4 py-3">12:50 PM</td>
                <td className="px-4 py-3 text-center">
                  <button className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
