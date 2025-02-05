import { connectDB } from "../../../../lib/mongodb";
import { Address } from "../../../../models/address";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();    
    const address = await Address.findById(params.id);

    if (!address) {
      return NextResponse.json({ success: false, error: "No address found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, address });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { street, city, state, zip, country } = await req.json();

    const address = await Address.findByIdAndUpdate(
      params.id,
      { street, city, state, zip, country },
      { new: true }
    );

    if (!address) {
      return NextResponse.json({ success: false, error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, address });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const address = await Address.findByIdAndDelete(params.id);

    if (!address) {
      return NextResponse.json({ success: false, error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Address deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
