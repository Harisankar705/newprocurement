const mongoose = require("mongoose");
const purchaseOrderSchema = new mongoose.Schema({
  orderNum: { type: String, required: true, unique: true },
  orderDate: { type: Date, default: Date.now },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  items: [
    {
      itemId: {
        types: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
        stockUnit: {
          type: String,
          required: true,
        },
        packingUnit: {
          type: String,
          required: true,
        },
        discount: {
          type: Number,
          default: 0,
        },
        orderQuantity:{
            type:Number,
            required:true
        },
        itemAmount: {
          type: Number,
          required: true,
        },
        netAmount: {
          type: Number,
          default: 0,
        },
      },
    },
  ],
});
module.exports = mongoose.model("purchaseOrder", purchaseOrderSchema);
