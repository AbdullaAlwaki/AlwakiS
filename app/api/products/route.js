// src/app/api/products/route.js
import { connectDB } from "../../../lib/mongodb";
import Product  from "../../../models/product";
import { NextResponse } from "next/server";

// 🔹 Fetch Products
export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

// 🔹 Add a New Product
export async function POST(req) {
  await connectDB();
  const { name, price, description } = await req.json();
  const newProduct = new Product({ name, price, description });
  await newProduct.save();
  return NextResponse.json({ message: "Product added!" });
}
