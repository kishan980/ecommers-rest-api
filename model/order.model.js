const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type:mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderSchema);
