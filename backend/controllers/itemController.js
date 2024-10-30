const itemSchema = require("../models/Item");
const suppliers = require("../models/supplier");
const getItems = async (req, res) => {
  try {
    const items = await itemSchema.find();
    res.json(items);
  } catch (error) {
    console.log("error occured during getItems", error);
  }
};

const itemNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const createItem = async (req, res) => {
  try {
    
    console.log('in createitem')
    console.log(req.body)
    const itemNum = itemNumber();
    const foundSupplier = await suppliers.findOne({ supplierName: req.body.supplier });
    console.log(foundSupplier._id)
    if (!foundSupplier) {
      console.log("supplier not found");
      return res.status(400).json({ error: "supplier not found" });
    }
    const newItem = new itemSchema({
      ...req.body,
      supplierId:foundSupplier._id,
      itemNo: itemNum,
      itemImages: req.file ? req.files.map((file) => file.path) : [],
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.log("error occured during createItem", error);
  }
};
module.exports = { createItem, getItems };
