import React, { useState } from "react";
import axios from "axios";

const SupplierForm = () => {
  const [supplier, setSupplier] = useState({
    supplierName: "",
    address: "",
    taxNo: "",
    country: "",
    mobileNo: "",
    email: "",
    status: "Active",
  });

  const countries = ["USA", "Canada", "UK", "Australia"]; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(supplier)
    alert('form submitted successfully!')
    try {
      const response = await axios.post(
        "http://localhost:4000/createSupplier", 
        supplier
      );
      console.log("Supplier added:", response.data);
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Add New Supplier
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            Supplier Name:
          </label>
          <input
            type="text"
            name="supplierName"
            value={supplier.supplierName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            Address:
          </label>
          <input
            type="text"
            name="address"
            value={supplier.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            TAX No:
          </label>
          <input
            type="text"
            name="taxNo"
            value={supplier.taxNo}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            Country:
          </label>
          <select
            name="country"
            value={supplier.country}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-black"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            Mobile No:
          </label>
          <input
            type="tel"
            name="mobileNo"
            value={supplier.mobileNo}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={supplier.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800">
            Status:
          </label>
          <select
            name="status"
            value={supplier.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-black"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition duration-200"
        >
          Add Supplier
        </button>
      </form>
    </div>
  );
};

export default SupplierForm;
