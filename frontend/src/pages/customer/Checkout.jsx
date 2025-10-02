import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  const [userPromoCode, setUserPromoCode] = useState("");
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const [promoDetails, setPromoDetails] = useState(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  let subtotalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let deliveryCharges = 90;
  let totalPrice = subtotalPrice + deliveryCharges;

  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const applyPromoCode = async (e) => {
    e.preventDefault();
    if (!userPromoCode) {
      toast.error("Enter Promo Code");
      return;
    }

    try {
      const { data } = await axios.get(
        `${backendURL}/api/promotions/${userPromoCode}`,
        { headers: { token } }
      );

      if (data.success) {
        const { type, value } = data.data;

        let newTotal = totalPrice;
        if (type === "flat") {
          newTotal = Math.max(0, totalPrice - value);
        } else if (type === "percentage") {
          newTotal = totalPrice - (totalPrice * value) / 100;
        }

        setDiscountedTotal(newTotal);
        setPromoDetails({ code: userPromoCode, value, type });
        setPromoCodeApplied(true);
        toast.success("Promo code applied successfully!");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(msg);
    }
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    if (!formData.name || !formData.address || !formData.phone) {
      toast.error("Please fill in all details");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        promotion_code: promoDetails ? promoDetails.code : null,
        items: cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      const { data } = await axios.post(`${backendURL}/api/orders`, orderData, { headers: { token } });

      if (data.success) {
        toast.success("Order placed successfully!");
        setDiscountedTotal(null);
        setPromoDetails(null);
        setPromoCodeApplied(false);
        setUserPromoCode("");
        setFormData({ name: "", address: "", phone: "" });
        clearCart();
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong... please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {cart.length === 0 ? (
        <div>Your cart is empty...</div>
      ) : (
        <div>
             <h2 className="p-2 text-2xl font-semibold mb-2">Delivery Address:</h2>
          <div className="flex lg:flex-row flex-col gap-2">
            <form onSubmit={placeOrder} className="flex flex-col px-5 gap-2 lg:w-1/2 w-full">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Enter Full name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address">Enter Complete Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone">Enter Phone Number</label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-red-500 py-2 rounded mt-2 text-white cursor-pointer"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>

            {/* Cart Section */}
            <table className="lg:w-1/2 w-full text-lg text-left text-white">
              <thead className="text-xs uppercase bg-gray-600 text-white">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Item Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <th className="px-4 py-3">{index + 1}</th>
                    <th className="px-4 py-3">
                      <img src={item.image_url} className="w-15" alt="" />
                    </th>
                    <th className="px-4 py-3">{item.name}</th>
                    <th className="px-4 py-3">{item.quantity}</th>
                    <th className="px-4 py-3">{item.price}</th>
                  </tr>
                ))}
                <tr>
                  <th></th><th></th><th></th>
                  <th>Subtotal</th>
                  <th>{subtotalPrice}</th>
                </tr>
                <tr>
                  <td></td><td></td><td></td>
                  <td>Delivery charges</td>
                  <td>{deliveryCharges}</td>
                </tr>
                {!promoCodeApplied && (
                  <tr>
                    <td></td><td></td><td></td>
                    <td>
                      <form onSubmit={applyPromoCode} className="flex gap-1">
                        <input
                          type="text"
                          placeholder="Enter Promo Code"
                          value={userPromoCode}
                          onChange={(e) => setUserPromoCode(e.target.value)}
                          className="border border-gray-300 rounded-lg p-1 text-white"
                          required
                        />
                        <button
                          type="submit"
                          className="bg-red-500 p-1 rounded cursor-pointer text-white"
                        >
                          Apply
                        </button>
                      </form>
                    </td>
                    <td></td>
                  </tr>
                )}
                {promoCodeApplied && promoDetails && (
                  <tr>
                    <td></td><td></td><td></td>
                    <td className="font-bold text-green-600">
                      {promoDetails.code}
                    </td>
                    <td className="text-green-600">
                      {promoDetails.type === "flat"
                        ? `- Rs. ${promoDetails.value}`
                        : `- ${promoDetails.value}%`}
                    </td>
                  </tr>
                )}
                <tr>
                  <th></th><th></th><th></th>
                  <th>Total</th>
                  <th>
                    {discountedTotal !== null ? discountedTotal : totalPrice}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
