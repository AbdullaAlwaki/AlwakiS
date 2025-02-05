import { connectDB } from "../../../lib/mongodb";
import { Address } from "../../../models/address";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; 

export async function GET(req) {
  try {
    await connectDB(); 
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: "Invalid User ID" }, { status: 400 });
    }

    const addresses = await Address.find({ userId: new mongoose.Types.ObjectId(userId) });

    if (!addresses.length) {
      return NextResponse.json({ success: false, error: "No addresses found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, addresses });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
