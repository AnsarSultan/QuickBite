import React, { useContext, useState } from "react";
import { Plus } from "lucide-react";
import logo from "../../../assets/logo.png";
import LinkButton from "../../../components/pos/ui/LinkButton";
import Modal from "../../../components/pos/Modal";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from 'react-toastify'
import axios from "axios";
import { CategoryContext } from "../../../context/CategoryContext";

function Category() {
  const { categories, fetchCategories, categoryLoading, error } = useContext(CategoryContext)
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const { user, token } = useContext(AuthContext)
  const role = user.role;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("categoryImage", image);

      let response;

      if (editMode && editCategory) {
        response = await axios.put(
          `${backendURL}/api/products/category/${editCategory.category_id}`,
          formData,
          { headers: { token } }
        );
      } else {
        response = await axios.post(
          `${backendURL}/api/products/category`,
          formData,
          { headers: { token } }
        );
      }

      const { data } = response;

      if (data.success) {
        toast.success(data.message);
        setIsModalOpen(false);
        fetchCategories();
        setName('');
        setImage(null);
        setEditMode(false);
        setEditCategory(null);
      } else {
        if (data.errors) {
          data.errors.forEach((err) => toast.error(err.msg));
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId)=>{
    try {
      const {data} = await axios.delete(`${backendURL}/api/products/category/${categoryId}` ,{ headers: {token}})
      if(data.success){
        toast.success(data.message)
        fetchCategories()
      }else{
        toast.error(data.error)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {editMode ? "Edit Category" : "Add New Category"}

            </h2>
            <p className="text-sm text-gray-500 text-center">
              Fill in the details below to add a new category.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-1">
                    Category Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="block w-full text-sm text-gray-700 
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-600 file:text-white
                      hover:file:bg-blue-700 cursor-pointer"
                  />

                  {(editMode && editCategory?.image_url && !image) && (
                    <img
                      src={editCategory.image_url}
                      alt="Current category"
                      className="w-24 h-24 mt-3 object-cover rounded"
                    />
                  )}
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="New category"
                      className="w-24 h-24 mt-3 object-cover rounded"
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 cursor-pointer rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                {loading ?
                  <button
                    className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition"
                    disabled>
                    Loading...
                  </button>
                  :
                  <button
                    type="submit"

                    className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition"
                  >
                    {editMode ? "Update Category" : "Add Category"}
                  </button>}
              </div>
            </form>
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
          {!categoryLoading ? <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3">Category Image</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat, index) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{cat.name}</td>
                  <td className="px-4 py-3">
                    <img
                      src={cat.image_url}
                      className="w-16 h-16 object-cover rounded"
                      alt="Pizza"
                    />
                  </td>
                  <td className="px-4 py-3 text-center align-middle">
                    <div className="flex justify-center gap-2">
                      <button
                        className="px-3 py-1 text-white cursor-pointer bg-blue-600 rounded hover:bg-blue-700"
                        onClick={() => {
                          setEditMode(true);
                          setEditCategory(cat);
                          setName(cat.name); 
                          setImage(null);    
                          setIsModalOpen(true);
                        }}
                      >
                        Edit
                      </button>

                      <button onClick={()=> handleDelete(cat.category_id)} className="px-3 py-1 text-white cursor-pointer bg-red-600 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table> : <p>Loading</p>}
        </div>
      </div>
    </div>
  );
}

export default Category;
