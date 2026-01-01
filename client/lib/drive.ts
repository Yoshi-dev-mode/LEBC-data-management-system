export function extractDriveFileId(url?: string | null) {
  if (!url) return null;
  const match = url.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export function driveToDirect(url?: string | null) {
  if (!url) return "/user.png";
  if (url.includes("drive.google.com/uc")) return url;

  const id = extractDriveFileId(url);
  return id
    ? `https://drive.google.com/uc?export=view&id=${id}`
    : "/user.png";
}
