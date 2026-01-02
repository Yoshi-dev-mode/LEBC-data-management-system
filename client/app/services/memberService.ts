import { SheetRows } from "@/app/types/sheet";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data: { url?: string } = await res.json();
  if (!data.url) throw new Error("Upload failed");

  return data.url;
}

export async function deleteImage(fileId: string): Promise<void> {
  await fetch("/api/delete-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileId }),
  });
}

export async function saveMembers(rows: SheetRows): Promise<void> {
  await fetch("/api/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rows),
  });
}

export async function deleteMember(id: string | number): Promise<void> {
  await fetch("/api/members", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
}
