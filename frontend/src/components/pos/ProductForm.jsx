// ProductForm.js
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProductForm({ mode, product }) {
    const {user} = useContext(AuthContext)
    const role = user.role;
    const [name, setName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price || "");
    const [description, setDescription] = useState(product?.description || "");
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "add") {
            console.log("Adding product:", { name, price, description, file });
        } else {
            console.log("Updating product:", { name, price, description, file });
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // store selected file
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
                        <label htmlFor="description" className="font-medium">Description</label>
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
                        <select name="" id="" className="border p-2 rounded">
                            <option value="" disabled selected>
                                select option
                            </option>
                            <option value="">Burger</option>
                            <option value="">Pizza</option>
                            <option value="">Cold drinks</option>
                        </select>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <label>Availability:</label>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="availability" value="true" />
                                <span>Available</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="availability" value="false" />
                                <span>Not Available</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 col-span-2">
                        <label htmlFor="image">Upload Image:</label>
                        <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition"
                        >
                            <span className="text-gray-600">
                                {file ? `✅ ${file.name}` : "Click to upload or drag & drop"}
                            </span>
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
                    className={`bg-${role} text-white px-4 py-2 rounded cursor-pointer`}
                >
                    {mode === "add" ? "Add Product" : "Update Product"}
                </button>
            </form>
        </div>
    );
}

export default ProductForm;
