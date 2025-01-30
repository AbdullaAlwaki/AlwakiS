import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: String, required: true }, // ✅ تحويل `price` إلى `Number`
        size: { type: String, required: true },
        color: { type: String, required: true }, // ✅ تصحيح `colore` إلى `color`
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String, default: null },
      status: { type: String, default: null },
      update_time: { type: String, default: null },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "canceled"], // ✅ دعم عدة حالات للطلب
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order =
  mongoose.models.Language || mongoose.model("Order", orderSchema);
export default Order;
