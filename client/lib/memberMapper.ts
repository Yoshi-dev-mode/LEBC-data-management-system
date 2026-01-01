export function memberToRow(m: any) {
  return [
    m.id,
    m.timestamp,
    m.name,
    m.gender,
    m.address,
    m.birthday,
    m.member,
    m.baptized,
    m.contact,
    m.email,
    m.motherName,
    m.fatherName,
    m.married,
    m.photo || "-",
    m.deleted || "",
  ];
}
