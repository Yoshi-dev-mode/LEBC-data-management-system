import { google } from "googleapis";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { getDriveOAuth } from "@/lib/googleDriveAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const auth = await getDriveOAuth();

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const drive = google.drive({
      version: "v3",
      auth,
    });

const response = await drive.files.create({
  requestBody: {
    name: file.name,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
  },
  media: {
    mimeType: file.type,
    body: Readable.from(buffer),
  },
});

const fileId = response.data.id;

if (!fileId) {
  throw new Error("Google Drive upload failed");
}

await drive.permissions.create({
  fileId,
  requestBody: {
    role: "reader",
    type: "anyone",
  },
});
    return NextResponse.json({
      url: `https://drive.google.com/uc?export=view&id=${fileId}`,
    });
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
