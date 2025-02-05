import { connectDB } from "@/lib/mongodb"; // ✅ استخدم alias بدلاً من ../../../
import Product from "@/models/product";
import { NextResponse } from "next/server";

// ✅ Fetch Products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ✅ Add a New Product
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || !body.price || !body.description) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const newProduct = new Product(body);
    await newProduct.save();

    return NextResponse.json({ success: true, message: "Product added!", product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
