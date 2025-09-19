import React from 'react'
import { Plus } from 'lucide-react';
import logo from '../../../assets/logo.png'
import LinkButton from '../../../components/pos/ui/LinkButton';

function Category() {
    return (
        <div>
            <div className='flex gap-2 items-center'>
                <LinkButton link={'/pos/products'}>Back</LinkButton>
                <LinkButton link={'/pos/products/category'}>
                    <Plus />Add New Category</LinkButton>
            </div>
            <div className="bg-white w-full pb-6 px-6 rounded-lg shadow-md mt-3">
                <h2 className="text-center mb-4 font-bold text-2xl py-2">Category List</h2>
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
                                    <img src={logo} className="w-16 h-16 object-cover rounded" alt="Pizza" />
                                </td>
                                <td className="px-4 py-3 text-center align-middle">
                                    <div className="flex justify-center gap-2">
                                        <button className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">
                                            Edit
                                        </button>
                                        <button className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-3">1</td>
                                <td className="px-4 py-3">Pizza</td>
                                <td className="px-4 py-3">
                                    <img src={logo} className="w-16 h-16 object-cover rounded" alt="Pizza" />
                                </td>
                                <td className="px-4 py-3 text-center align-middle">
                                    <div className="flex justify-center gap-2">
                                        <button className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">
                                            Edit
                                        </button>
                                        <button className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-3">1</td>
                                <td className="px-4 py-3">Pizza</td>
                                <td className="px-4 py-3">
                                    <img src={logo} className="w-16 h-16 object-cover rounded" alt="Pizza" />
                                </td>
                                <td className="px-4 py-3 text-center align-middle">
                                    <div className="flex justify-center gap-2">
                                        <button className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">
                                            Edit
                                        </button>
                                        <button className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700">
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
    )
}

export default Category