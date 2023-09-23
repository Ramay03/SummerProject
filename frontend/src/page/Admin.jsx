import React, { useState } from "react";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

const Admin = () => {

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    mrp:"",
    offer:"",
    image: null,
    category: "",
    searchword: "",
    stock: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    if (type === 'checkbox') {
        setFormData({
          ...formData,
            [name]: fieldValue,
        });
      } else {
        setFormData({
          ...formData,
          [name]: fieldValue,
        });
      }

  };

  const handleImageChange = async (e) => {
    // Handle image file upload separately
    // You can use FileReader to read the file and set it to the 'image' field in formData
    const file = await ImagetoBase64(e.target.files[0]);
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Perform form validation before submission
    if (!formData.name || !formData.price) {
        toast('Please fill both the name and price fields.');
        return;
    }

    const fetchData = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
    );
    const fetchRes = await fetchData.json()
    toast(fetchRes.message)
    console.log(fetchRes)
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 bg-white shadow-2xl rounded px-4 pt-6 pb-4"
      >
        <h1 className="text-center text-2xl font-bold">New Product</h1>

        <div className="mb-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="name"
          >
            Product name:
          </label>
          <input
            className="appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        {/* Add other fields here with the same styling pattern */}
        <div className="mb-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            className="appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="mrp"
          >
            MRP:
          </label>
          <input
            className="appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
          />
        </div>

        <div className="mb-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="quantity"
          >
            Quantity of product:
          </label>
          <input
            className="appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="mb-1">

          <label className="text-gray-700 text-sm font-bold mb-1" htmlFor='category'>Category : </label>
          <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleChange} value={formData.category}>
            <option value={"Other"}>Other</option>
            <option value={"Dry Fruit"}>Dry Fruit</option>
            <option value={"Grains"}>Grains</option>
            <option value={"Oil"}>Oil</option>
            <option value={"Soap"}>Soap</option>
            <option value={"Detergent"}>Detergent</option>
            <option value={"Tea"}>Tea</option>
            <option value={"Chocalate"}>Chocalate</option>
          </select>
        </div>

          {/* <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="category"
          >
            Category:
          </label>
          <input
            className="appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          /> */}

        <div className="mb-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="searchword"
          >
            Search Word:
          </label>
          <input
            className="appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="searchword"
            value={formData.searchword}
            onChange={handleChange}
          />
        </div>

        <div className="mb-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="offer"
          >
            Offer:
          </label>
          <input
            className="appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="offer"
            value={formData.offer}
            onChange={handleChange}
          />
        </div>

        <div className="mb-1">
          <label
            className="text-gray-700 text-sm font-bold mb-1"
            htmlFor="stock"
          >
            Stock available :  
          </label>
          <input
            className=""
            type="checkbox"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>


        <div className="mb-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="image"
          >
            Upload Product Image:
          </label>
          <input
            className="appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Admin;
