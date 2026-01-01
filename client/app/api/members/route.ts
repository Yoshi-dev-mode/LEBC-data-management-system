import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function GET() {
  try {
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Members!A2:Z",
    });

    return Response.json(res.data.values ?? []);
  } catch {
    return Response.json([]);
  }
}

export async function POST(req: Request) {
  const values = await req.json();

  if (!Array.isArray(values)) {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  // 🔥 Clear old rows
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: "Members!A2:O",
  });

  // 🔥 Write all rows back
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Members!A2",
    valueInputOption: "RAW",
    requestBody: { values },
  });

  return Response.json({ success: true });
}


export async function DELETE(req: Request) {
  const { id } = await req.json();

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Members!A2:O",
  });

  const rows = res.data.values ?? [];

  const updated = rows.map(row => {
    if (String(row[0]) !== String(id)) return row;

    const fixedRow = [...row];

    // ✅ ensure photo column exists (index 13)
    if (!fixedRow[13]) fixedRow[13] = "";

    // ✅ ensure deleted column exists (index 14)
    fixedRow[14] = "TRUE";

    return fixedRow;
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Members!A2",
    valueInputOption: "RAW",
    requestBody: { values: updated },
  });

  return Response.json({ success: true });
}





