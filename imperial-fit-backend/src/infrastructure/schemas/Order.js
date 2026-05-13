import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orderProducts: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  address: {
    fname: String,
    lname: String,
    line_1: String,
    line_2: String,
    city: String,
    phone: String,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
