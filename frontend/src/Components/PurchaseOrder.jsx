import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { Input } from "../Components/ui/input";
import { Select } from "../Components/ui/select";
import { Table } from "../Components/ui/table";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const PurchaseOrder = () => {
  const [orderData, setOrderData] = useState({
    orderNo: "PO-" + Date.now(),
    orderDate: new Date().toISOString().split("T")[0],
    supplierName: "",
    itemTotal: 0,
    discount: 0,
    netAmount: 0,
  });

  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getSupplier");
        const activeSuppliers = response.data.filter(
          (supplier) => supplier.status === "Active"
        );
        setSuppliers(activeSuppliers);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getItem");
        setAvailableItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchSuppliers();
    fetchItems();
  }, []);

  const addNewItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        itemNo: "",
        itemName: "",
        stockUnit: "",
        unitPrice: 0,
        packingUnit: "",
        orderQty: 0,
        itemAmount: 0,
        discount: 0,
        netAmount: 0,
      },
    ]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === "itemName") {
      const selectedItem = availableItems.find(
        (item) => item.itemName === value
      );
      if (selectedItem) {
        newItems[index] = {
          ...newItems[index],
          itemNo: selectedItem.itemNo,
          stockUnit: selectedItem.stockUnit,
          unitPrice: parseFloat(selectedItem.unitPrice),
          packingUnit: selectedItem.packingUnit || "", 
        };
      }
    }

    if (["orderQty", "unitPrice", "discount"].includes(field)) {
      const itemAmount = parseFloat(newItems[index].orderQty) * parseFloat(newItems[index].unitPrice);
      newItems[index].itemAmount = itemAmount;
      newItems[index].netAmount = itemAmount - (newItems[index].discount || 0);
    }

    setItems(newItems);
    calculateTotals(newItems);
  };

  const calculateTotals = (currentItems) => {
    const itemTotal = currentItems.reduce(
      (sum, item) => sum + (item.itemAmount || 0),
      0
    );
    const totalDiscount = currentItems.reduce(
      (sum, item) => sum + (item.discount || 0),
      0
    );
    const netAmount = itemTotal - totalDiscount;

    setOrderData((prev) => ({
      ...prev,
      itemTotal,
      discount: totalDiscount,
      netAmount,
    }));
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, idx) => idx !== index);
    setItems(newItems);
    calculateTotals(newItems);
  };



  return (
    <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Purchase Order</h1>
      <Card>
        <CardHeader>
          <CardTitle>Purchase Order</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Order details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Order No</label>
              <Input
                value={orderData.orderNo}
                disabled
                className="bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Order Date</label>
              <Input
                type="date"
                value={orderData.orderDate}
                onChange={(e) =>
                  setOrderData({ ...orderData, orderDate: e.target.value })
                }
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Supplier</label>
              <Select
                value={orderData.supplierName}
                onChange={(e) =>
                  setOrderData({ ...orderData, supplierName: e.target.value })
                }
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.supplierName}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mb-4">
            <Button onClick={addNewItem} className="mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>

            <div className="overflow-x-auto">
              <Table>
                <thead>
                  <tr>
                    <th className="border p-2">Item Name</th>
                    <th className="border p-2">Item No</th>
                    <th className="border p-2">Stock Unit</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Packing Unit</th>
                    <th className="border p-2">Order Qty</th>
                    <th className="border p-2">Item Amount</th>
                    <th className="border p-2">Discount</th>
                    <th className="border p-2">Net Amount</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border p-2">
                        <Select value={item.itemName} onChange={(e) => updateItem(index, 'itemName', e.target.value)}>
                          <option value="">Select Item</option>
                          {availableItems.map(avItem => (
                            <option key={avItem._id} value={avItem.itemName}>
                              {avItem.itemName}
                            </option>
                          ))}
                        </Select>
                      </td>
                      <td className="border p-2">{item.itemNo}</td>
                      <td className="border p-2">{item.stockUnit}</td>
                      <td className="border p-2">{item.unitPrice.toFixed(2)}</td>
                      <td className="border p-2">
                        <Select
                          value={item.packingUnit}
                          onChange={(e) => updateItem(index, 'packingUnit', e.target.value)}
                        >
                          <option value="">Select Packing Unit</option>
                          <option value="Boxes">Boxes</option>
                          <option value="Pieces">Pieces</option>
                          <option value="Sets">Sets</option>
                        </Select>
                      </td>
                      <td className="border p-2">
                        <Input
                          type="number"
                          value={item.orderQty}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "orderQty",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24"
                        />
                      </td>
                      <td className="border p-2">{item.itemAmount.toFixed(2)}</td>
                      <td className="border p-2">
                        <Input
                          type="number"
                          value={item.discount}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "discount",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24"
                        />
                      </td>
                      <td className="border p-2">{item.netAmount.toFixed(2)}</td>
                      <td className="border p-2">
                        <Button onClick={() => removeItem(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Total Amount</label>
                <Input value={orderData.itemTotal.toFixed(2)} disabled className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total Discount</label>
                <Input value={orderData.discount.toFixed(2)} disabled className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Net Amount</label>
                <Input value={orderData.netAmount.toFixed(2)} disabled className="bg-gray-100" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
           
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseOrder;
