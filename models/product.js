import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  images: [{ type: String }], 
  category: {
    type: String,
    enum: ["woman", "man", "girl", "boy", "baby"],
    required: true,
  },
  stock: { type: Number, default: 0 },
  size: [{ type: String }],
  color: [{ type: String }],
  brand: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
