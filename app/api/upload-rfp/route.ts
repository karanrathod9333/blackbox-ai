import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" });
  }

  const text = await file.text();

  return NextResponse.json({
    text: text.slice(0, 2000), // limit size
  });
}