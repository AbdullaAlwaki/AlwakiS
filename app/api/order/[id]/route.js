import mongoose from "mongoose";
import Order from "../../../../models/order.js";
import { connectDB } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { uid } = params;  // Extract the id from the route parameter
console.log(uid);

    // ✅ Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "معرّف المستخدم غير صالح!" },
        { status: 400 }
      );
    }

    // Fetch orders with populated user and address data
    const orders = await Order.find({ user: uid })
      .populate("user", "name email") // ✅ Populate basic user data
      .populate("address", "city street zipCode"); // ✅ Populate basic address data

    return NextResponse.json(
      { success: true, orders },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "خطأ في جلب الطلبات",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
