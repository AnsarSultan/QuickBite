import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CategoryContext } from "../../context/CategoryContext";
import { toast } from "react-toastify";
import axios from "axios";

function ProductForm({ mode, product }) {
    const { user, token } = useContext(AuthContext);
    const role = user.role;
    const [name, setName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price || "");
    const [description, setDescription] = useState(product?.description || "");
    const [availability, setAvailability] = useState(
        product?.availability !== undefined ? String(product.availability) : ""
    );

    const [categoryId, setCategoryId] = useState(product?.category_id || "");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { categories } = useContext(CategoryContext);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!name || !price || !description || !availability || !categoryId) {
          toast.error("Please fill all the fields.");
          return;
        }
      
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("availability", availability);
        formData.append("category_id", categoryId);
      
        if (file) {
          formData.append("productImage", file);
        } else if (mode === "edit" && product?.image_url) {
          formData.append("existingImage", product.image_url);
        }
      
        try {
          setLoading(true);
          let response;
          if (mode === "add") {
            response = await axios.post(`${backendURL}/api/products/`, formData, {
              headers: { token },
            });
          } else {
            response = await axios.put(
              `${backendURL}/api/products/${product.product_id}`,
              formData,
              { headers: { token } }
            );
          }
      
          const { data } = response;
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message || "Something went wrong");
          }
        } catch (err) {
          toast.error("Error submitting product");
        } finally {
          setLoading(false);
        }
      };
      

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    return (
        <div className="bg-white shadow-md rounded-xl p-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1">
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Enter Product title name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Product Name"
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="price">Enter Price:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                        <label htmlFor="description" className="font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                            rows="3"
                            className="border p-2 rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Select category</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="" disabled>
                                select option
                            </option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat.category_id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <label>Availability:</label>
                        <div className="flex items-center gap-6">
                            <input
                                type="radio"
                                name="availability"
                                value="true"
                                checked={availability === "true"}
                                onChange={(e) => setAvailability(e.target.value)}
                            />
                            <span>Available</span>

                            <input
                                type="radio"
                                name="availability"
                                value="false"
                                checked={availability === "false"}
                                onChange={(e) => setAvailability(e.target.value)}
                            />
                            <span>Not Available</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 col-span-2">
                        <label htmlFor="image">Upload Image:</label>
                        <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition"
                        >
                            {file ? (
                                <span className="text-gray-600">✅ {file.name}</span>
                            ) : product?.image_url ? (
                                <img
                                    src={product.image_url}
                                    alt="Product"
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                            ) : (
                                <span className="text-gray-600">Click to upload or drag & drop</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`${loading ? "bg-blue-300 cursor-not-allowed" : role
                        } text-white px-4 py-2 cursor-pointer rounded`}
                >
                    {loading
                        ? "Loading..."
                        : mode === "add"
                            ? "Add Product"
                            : "Update Product"}
                </button>
            </form>
        </div>
    );
}

export default ProductForm;
