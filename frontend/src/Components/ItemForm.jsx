import axios from "axios";
import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";

const ItemForm = ({ initialData = null }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    inventoryLocation: "",
    brand: "",
    category: "",
    supplier: "",
    stockUnit: "",
    unitPrice: "",
    status: "Enabled",
    itemImages: [], 
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setImageFiles(initialData.itemImages || []); 
    }
    const fetchSupplier = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getSupplier");
        const activeSuppliers = response.data.filter(
          (supplier) => supplier.status === "Active"
        );
        setSuppliers(activeSuppliers);
      } catch (error) {
        console.log("Error occurred while fetching suppliers", error);
      }
    };
    fetchSupplier();
  }, [initialData]);

  const stockUnits = ["Pieces", "Boxes", "Kilogram", "Liters"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Item created Successfully!')
    const formDataToSend = new FormData();
    
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    imageFiles.forEach((file) => {
      formDataToSend.append("itemImages", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/createItem",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      console.log("Item created successfully:", response.data);
    } catch (error) {
      console.log("Error occurred while creating item", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-black mb-4">
        {initialData ? "Edit Item" : "Add New Item"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Form Fields */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Inventory Location
            </label>
            <input
              type="text"
              name="inventoryLocation"
              value={formData.inventoryLocation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Supplier
            </label>
            <select
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
            >
              <option value="">Select Supplier</option>
              {suppliers && suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <option key={supplier._id} value={supplier.supplierName}>
                    {supplier.supplierName}
                  </option>
                ))
              ) : (
                <option disabled>No suppliers available</option>
              )}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Stock Unit
            </label>
            <select
              name="stockUnit"
              value={formData.stockUnit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
            >
              <option value="">Select Unit</option>
              {stockUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Unit Price
            </label>
            <input
              type="text"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Item Images
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex flex-wrap gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              ))}
              <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-8 h-8 text-gray-400" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
