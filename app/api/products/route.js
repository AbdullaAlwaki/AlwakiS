import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/product";
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


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

    const newProduct = new Product({
      name: body.name,
      price: body.price,
      description: body.description,
    });

    await newProduct.save();
    return NextResponse.json({ success: true, message: "Product added!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
