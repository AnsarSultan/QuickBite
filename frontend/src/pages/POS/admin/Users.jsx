import React, { useContext, useEffect, useState } from "react";
import { Plus, SlidersHorizontal } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import LinkButton from "../../../components/pos/ui/LinkButton";
import axios from "axios";
import { toast } from "react-toastify";

function Users() {
  const { user  , token} = useContext(AuthContext);
  const role = user?.role;
  const [usersDetail, setUserDetail] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/users` , {headers:{token}});
      if (data.success) {
        setUserDetail(data.data);
      }
    } catch (error) {
      toast.error("Something went wrong while fething users");
    }
  };

  const handleDelete = async (userId)=>{
    try {
      const { data } = await axios.delete(`${backendURL}/api/users/${userId}/delete` , {headers:{token}});
      if (data.success) {
        toast.success(data.message);
        fetchUsers()
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="h-full ">
      <div className="flex gap-2 items-center">
        <LinkButton link={"/pos/users/addUser"}>
          <Plus /> Add New User
        </LinkButton>
      </div>
      <div className="flex flex-row items-center justify-between px-3 mt-3 ">
        <SlidersHorizontal
          size={40}
          className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl"
        />
      </div>
      <div className="bg-white w-full p-6 rounded-lg shadow-md mt-3">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">User Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Verified</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {usersDetail.length > 0 ? (
                usersDetail.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3">{item.address}</td>
                    <td className="px-4 py-3">{item.role}</td>
                    <td className="px-4 py-3">
                      {item.verified ? "Verified" : "Not Verified"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={()=>handleDelete(item.user_id)} className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No users found
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

export default Users;
