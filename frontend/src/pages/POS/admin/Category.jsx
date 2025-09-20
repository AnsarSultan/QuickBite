import React, { useState } from "react";
import { Plus } from "lucide-react";
import logo from "../../../assets/logo.png";
import LinkButton from "../../../components/pos/ui/LinkButton";
import Modal from "../../../components/pos/Modal";

function Category() {
  const role = "admin";
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-center items-center">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <div className="flex flex-col gap-6">
    {/* Header */}
    <h2 className="text-2xl font-bold text-gray-800 text-center">
      Add New Category
    </h2>
    <p className="text-sm text-gray-500 text-center">
      Fill in the details below to add a new category.
    </p>

    {/* Form */}
    <div className="space-y-4">
      {/* Category Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter category name"
          className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2"
        />
      </div>

      {/* Category Image */}
      <div className="flex flex-col">
        <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-1">
          Category Image
        </label>
        <input
          type="file"
          id="image"
          className="block w-full text-sm text-gray-700 
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700"
        />
      </div>
    </div>

    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={() => setIsModalOpen(false)}
        className="px-4 py-2 bg-gray-200 text-gray-700 cursor-pointer rounded-lg hover:bg-gray-300 transition"
      >
        Cancel
      </button>
      <button
        onClick={() => setIsModalOpen(false)}
        className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition"
      >
        Add Category
      </button>
    </div>
  </div>
</Modal>

      </div>
      <div className="flex gap-2 items-center">
        <LinkButton link={"/pos/products"}>Back</LinkButton>
        <button
          link={"/pos/products/category"}
          className={`inline-flex items-center justify-center cursor-pointer ${role} text-white px-4 py-2 rounded w-fit`}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus />
          Add New Category
        </button>
      </div>
      <div className="bg-white w-full pb-6 px-6 rounded-lg shadow-md mt-3">
        <h2 className="text-center mb-4 font-bold text-2xl py-2">
          Category List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3">Category Image</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Pizza</td>
                <td className="px-4 py-3">
                  <img
                    src={logo}
                    className="w-16 h-16 object-cover rounded"
                    alt="Pizza"
                  />
                </td>
                <td className="px-4 py-3 text-center align-middle">
                  <div className="flex justify-center gap-2">
                    <button className="px-3 py-1 text-white cursor-pointer bg-blue-600 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-white cursor-pointer bg-red-600 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Pizza</td>
                <td className="px-4 py-3">
                  <img
                    src={logo}
                    className="w-16 h-16 object-cover rounded"
                    alt="Pizza"
                  />
                </td>
                <td className="px-4 py-3 text-center align-middle">
                  <div className="flex justify-center gap-2">
                    <button className="px-3 py-1 text-white cursor-pointer bg-blue-600 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-white cursor-pointer bg-red-600 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Pizza</td>
                <td className="px-4 py-3">
                  <img
                    src={logo}
                    className="w-16 h-16 object-cover rounded"
                    alt="Pizza"
                  />
                </td>
                <td className="px-4 py-3 text-center align-middle">
                  <div className="flex justify-center gap-2">
                    <button className="px-3 py-1 text-white cursor-pointer bg-blue-600 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-white cursor-pointer bg-red-600 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Pizza</td>
                <td className="px-4 py-3">
                  <img
                    src={logo}
                    className="w-16 h-16 object-cover rounded"
                    alt="Pizza"
                  />
                </td>
                <td className="px-4 py-3 text-center align-middle">
                  <div className="flex justify-center gap-2">
                    <button className="px-3 py-1 text-white cursor-pointer bg-blue-600 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-white cursor-pointer bg-red-600 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Pizza</td>
                <td className="px-4 py-3">
                  <img
                    src={logo}
                    className="w-16 h-16 object-cover rounded"
                    alt="Pizza"
                  />
                </td>
                <td className="px-4 py-3 text-center align-middle">
                  <div className="flex justify-center gap-2">
                    <button className="px-3 py-1 text-white cursor-pointer bg-blue-600 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-white cursor-pointer bg-red-600 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Pizza</td>
                <td className="px-4 py-3">
                  <img
                    src={logo}
                    className="w-16 h-16 object-cover rounded"
                    alt="Pizza"
                  />
                </td>
                <td className="px-4 py-3 text-center align-middle">
                  <div className="flex justify-center gap-2">
                    <button className="px-3 py-1 text-white cursor-pointer bg-blue-600 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-white cursor-pointer bg-red-600 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Category;
