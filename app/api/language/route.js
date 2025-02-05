import { connectDB } from "../../../lib/mongodb";
import Language from "../../../models/language";
import { NextResponse } from "next/server";

// ✅ إنشاء لغة جديدة
export async function POST(req) {
  try {
    await connectDB(); // الاتصال بقاعدة البيانات
    const body = await req.json();
    
    const language = new Language(body);
    await language.save(); // حفظ اللغة في MongoDB
    
    return NextResponse.json({ success: true, language }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ✅ جلب لغة بناءً على اسمها
export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang"); // ?lang=en

    if (!lang) {
      return NextResponse.json({ success: false, error: "Language name is required" }, { status: 400 });
    }

    const language = await Language.find({ nameLang: lang });

    if (!language.length) {
      return NextResponse.json({ success: false, error: "Language not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, language }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ✅ تحديث لغة بناءً على اسمها
export async function PUT(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang");
    const body = await req.json();

    if (!lang) {
      return NextResponse.json({ success: false, error: "Language name is required" }, { status: 400 });
    }

    const language = await Language.findOneAndUpdate({ nameLang: lang }, body, { new: true });

    if (!language) {
      return NextResponse.json({ success: false, error: "Language not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, language }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
