import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function UserForm() {
  const { user , token } = useContext(AuthContext);
  const role = user?.role;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userRole, setUserRole] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const payLaod = {
            name,
            email,
            password,
            phone,
            address,
            role: userRole,
        }
        console.log("into try cath")
        const {data} = await axios.post(`${backendURL}/api/users/addAccount`, payLaod , {
         headers:{token}
        });
        if (data.success) {
          toast.success("User added successfully!");
        }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-1"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
              placeholder="Enter Full Name"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
             placeholder="Enter Password"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Complete Address"
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="role">Select Role:</label>
            <select
              id="role"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="border p-2 rounded"
              required
            >
              <option value="" disabled>
                ---Select Option---
              </option>
              <option value="cashier">Cashier</option>
              <option value="waiter">Waiter</option>
              <option value="kitchen">Kitchen</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={`${role} text-white px-4 py-2 cursor-pointer rounded`}
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default UserForm;
