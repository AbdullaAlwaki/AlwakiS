import { connectDB } from "../../../../lib/mongodb";
import { Address } from "../../../../models/address";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    if (!params || !params.id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const address = await Address.findById(params.id);

    if (!address) {
      return NextResponse.json({ success: false, error: "No address found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, address }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    if (!params || !params.id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { street, city, state, zip, country } = body;

    const address = await Address.findByIdAndUpdate(
      params.id,
      { street, city, state, zip, country },
      { new: true }
    );

    if (!address) {
      return NextResponse.json({ success: false, error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, address }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    if (!params || !params.id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const address = await Address.findByIdAndDelete(params.id);

    if (!address) {
      return NextResponse.json({ success: false, error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Address deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
