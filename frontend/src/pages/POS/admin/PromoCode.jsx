import React, { useContext, useEffect, useState } from "react";
import LinkButton from "../../../components/pos/ui/LinkButton";
import { Plus } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../../../components/pos/Modal";
import { PromoCodeContext } from "../../../context/PromoCodeContext";
import { toast } from "react-toastify";
import axios from "axios";

function PromoCode() {
  const { fetchPromoCodes, promoCodes, PromoCodeLoading } =
    useContext(PromoCodeContext);
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPromoCode, setEditPromoCode] = useState(null);
  const { user, token } = useContext(AuthContext);
  const role = user?.role;

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || !type || !value || !startDate || !endDate) {
      toast.error("Please fill all the fields");
      return;
    }
    const payload = {
      code,
      value,
      type,
      start_date: startDate,
      end_date: endDate,
      is_active: isActive,
    };

    try {
      setLoading(true);
      let response;
      if (editMode && editPromoCode) {
        console.log("enter into edit mode")
        response = await axios.put(
          `${backendURL}/api/promotions/status/${editPromoCode.promotion_id}`,
          payload,
          { headers: { token } }
        );
      } else {
        response = await axios.post(`${backendURL}/api/promotions`, payload, {
          headers: { token },
        });
      }

      const { data } = response;
      if (data.success) {
        toast.success(data.message);
        setCode("");
        setType("");
        setStartDate("");
        setEndDate("");
        setIsActive(false);
        setIsModalOpen(false);
        setEditMode(false);
        fetchPromoCodes();
      } else {
        if (data.errors) {
          data.errors.forEach((err) => toast.error(err.msg));
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    } finally {
      setLoading(false);

    }
  };

  const handleDelete = async (promoID) => {
    try {
      setIsDeleting(true);
      const { data } = await axios.delete(
        `${backendURL}/api/promotions/delete/${promoID}`,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchPromoCodes();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later");
    } finally {
      setIsDeleting(false);
    }
  };
  useEffect(() => {
    fetchPromoCodes();
  }, []);
  return (
    <div>
      <div className="flex justify-center items-center">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {editMode ? "Edit PromoCode" : "Add New PromoCode"}
            </h2>
            <p className="text-sm text-gray-500 text-center">
              Fill in the details below to add a new PromoCode.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Promo Code
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Promo Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2"
                  />
                  <label
                    htmlFor="promoCodevalue"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Promo Code Value:
                  </label>
                  <input
                    type="text"
                    id="promoCodevalue"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter Promo Code value"
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2"
                  />
                  <label
                    htmlFor="promoCodeType"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Promo Code Type:
                  </label>
                  <select
                    name="promoCodeType"
                    id="promoCodeType"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2"
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="flat">Flat</option>
                    <option value="percentage">Percentage</option>
                  </select>
                  <label
                    htmlFor="startDate"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Start date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2"
                  />
                  <label
                    htmlFor="endDate"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    End date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2"
                  />
                  <div className="flex flex-col justify-center gap-1">
                    <label>Promo Code active:</label>
                    <div className="flex items-center gap-6">
                      <input
                        type="radio"
                        name="Active"
                        value="true"
                        checked={isActive}
                        onChange={() => setIsActive(true)}
                      />
                      <span>Active</span>
                      <input
                        type="radio"
                        name="Active"
                        value="false"
                        checked={!isActive}
                        onChange={() => setIsActive(false)}
                      />
                      <span>Disabled</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 cursor-pointer rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                {loading ? (
                  <button
                    className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition"
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition"
                  >
                    {editMode ? "Update PromoCode" : "Add PromoCode"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="flex gap-2 items-center">
        <LinkButton link={"/pos/products"}>Back</LinkButton>
        <button
          link={"/pos/products/promoCode"}
          className={`inline-flex items-center justify-center cursor-pointer ${role} text-white px-4 py-2 rounded w-fit`}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus />
          Add New PromoCode
        </button>
      </div>
      <div className="bg-white w-full pb-6 px-6 rounded-lg shadow-md mt-3">
        <h2 className="text-center mb-4 font-bold text-2xl py-2">
          Category List
        </h2>
        <div className="overflow-x-auto">
          {!PromoCodeLoading ? (
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Promo Code</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">value</th>
                  <th className="px-4 py-3">Start Date</th>
                  <th className="px-4 py-3">End Date</th>
                  <th className="px-4 py-3">Is Active</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {promoCodes.map((promo, index) => (
                  <tr
                    className="bg-white border-b hover:bg-gray-50"
                    key={index}
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{promo.code}</td>
                    <td className="px-4 py-3">{promo.type}</td>
                    <td className="px-4 py-3">{promo.value}</td>
                    <td className="px-4 py-3">
                      {new Date(promo.start_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(promo.end_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {promo.is_active ? "Active" : "Disabled"}
                    </td>
                    <td className="px-4 py-3 text-center align-middle">
                      <div className="flex justify-center gap-2">
                        <button
                          className={`${
                            isDeleting
                              ? "bg-blue-200 cursor-not-allowed "
                              : "bg-blue-600  hover:bg-blue-700 cursor-pointer "
                          } rounded px-3 py-1 text-white`}
                          onClick={() => {
                            setEditMode(true);
                            setEditPromoCode(promo);
                            setCode(promo.code);
                            setType(promo.type);
                            setValue(promo.value);
                            setStartDate(promo.start_date.split("T")[0]);
                            setEndDate(promo.end_date.split("T")[0]);                            
                            setIsActive(promo.is_active);
                            setIsModalOpen(true);
                          }}
                          disabled={isDeleting}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(promo.promotion_id)}
                          disabled={isDeleting}
                          className={`${
                            isDeleting
                              ? "bg-red-200 cursor-not-allowed"
                              : "cursor-pointer bg-red-600 hover:bg-red-700 "
                          } px-3 py-1 text-white rounded `}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PromoCode;
