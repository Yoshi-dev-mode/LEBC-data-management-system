import { google } from "googleapis";
import { NextResponse } from "next/server";
import { getDriveOAuth } from "@/lib/googleDriveAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { fileId } = await req.json();

    if (!fileId) {
      return NextResponse.json({ error: "No fileId provided" }, { status: 400 });
    }

    const auth = await getDriveOAuth();
    const drive = google.drive({ version: "v3", auth });

    await drive.files.delete({ fileId });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Delete failed" },
      { status: 500 }
    );
  }
}
