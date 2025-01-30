import Order from "../../../models/order.js";
import { connectDB } from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB(); // ✅ اتصال بقاعدة البيانات

    const { user, address, orderItems, paymentMethod, totalPrice } = await req.json(); // Access body data

    // ✅ التحقق من البيانات المطلوبة قبل الإنشاء
    if (!user || !address || !orderItems?.length || !paymentMethod || !totalPrice) {
      return NextResponse.json(
        { success: false, message: "جميع الحقول مطلوبة!" },
        { status: 400 }
      );
    }

    // ✅ إنشاء الطلب
    const order = new Order({
      user,
      address,
      orderItems,
      paymentMethod,
      totalPrice,
    });
console.log(order);

    return NextResponse.json(
      { success: true, order },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "خطأ في إنشاء الطلب",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
