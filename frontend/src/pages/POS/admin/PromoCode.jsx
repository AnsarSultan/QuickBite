import React, { useContext, useState } from "react";
import LinkButton from "../../../components/pos/ui/LinkButton";
import { Plus } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../../../components/pos/Modal";

function PromoCode() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const role = user?.role;

  const handleSubmit = async (e)=>{
    e.preventDefault();
  }
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    placeholder="Enter Promo Code value"
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2"
                  />
                  <label
                    htmlFor="promoCodeType"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Promo Code Type:
                  </label>
                  <input
                    type="text"
                    id="promoCodeType"
                    placeholder="Enter Promo Code Type"
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2"
                  />
                  <label htmlFor="startDate"  className="text-sm font-medium text-gray-700 mb-1">Start date</label>
                  <input type="date" name="startDate" id="startDate" className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2"/>
                  <label htmlFor="endDate"  className="text-sm font-medium text-gray-700 mb-1">End date</label>
                  <input type="date" name="endDate" id="endDate" className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2" />
                  <div className="flex flex-col justify-center gap-1">
                        <label>Promo Code active:</label>
                        <div className="flex items-center gap-6">
                            <input
                                type="radio"
                                name="Active"
                                value="true"
                            />
                            <span>Active</span>
                            <input
                                type="radio"
                                name="Active"
                                value="false"
                            />
                            <span>Disable</span>
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
    </div>
  );
}

export default PromoCode;
