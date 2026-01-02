import { Member } from "@/app/types/member";
import { SheetRow } from "@/app/types/sheet";

export function memberToRow(member: Member): SheetRow {
  return [
    member.id,
    member.timestamp ?? "",
    member.name ?? "",
    member.gender ?? "",
    member.address ?? "",
    member.birthday ?? "",
    member.member ?? "",
    member.baptized ?? "",
    member.contact ?? "",
    member.email ?? "",
    member.motherName ?? "",
    member.fatherName ?? "",
    member.married ?? "",
    member.photo ?? "",
    member.deleted ?? "",
  ];
}
