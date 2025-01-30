import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: [String],
  description: [String],
  price: String,
  images: [String],
  category: {
    type: String,
    enum: ["woman", "man", "girl","boy", "baby"],
  },
  stock: Number,
  size: [String],
  color: [String],
  brand: String,
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
