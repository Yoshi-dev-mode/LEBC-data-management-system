import React from "react";
import { Member } from "@/app/types/member";

// Only allow editable fields
export type EditableField = Exclude<
  keyof Member,
  "id" | "photo" | "deleted"
>;

interface EditableProps {
  label: string;
  field: EditableField;
  form: Member;
  setForm: React.Dispatch<React.SetStateAction<Member | null>>;
  edit: boolean;
}

const SELECT_FIELDS: Partial<Record<EditableField, string[]>> = {
  gender: ["Male", "Female"],
  member: ["Yes", "No"],
  baptized: ["Yes", "No"],
  married: ["Yes", "No"],
};

export default function Editable({
  label,
  field,
  form,
  setForm,
  edit,
}: EditableProps) {
  const options = SELECT_FIELDS[field];

  const handleChange = (value: string) => {
    setForm(prev =>
      prev ? { ...prev, [field]: value } : prev
    );
  };

  return (
    <div className="border rounded p-3">
      <p className="text-sm text-gray-500">{label}</p>

      {edit ? (
        options ? (
          <select
            value={String(form[field] ?? "")}
            onChange={(e) => handleChange(e.target.value)}
            className="border p-2 rounded w-full cursor-pointer"
          >
            <option value="">Select</option>
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            value={String(form[field] ?? "")}
            onChange={(e) => handleChange(e.target.value)}
            className="border p-2 rounded w-full"
          />
        )
      ) : (
        <p className="font-medium">
          {String(form[field] ?? "-")}
        </p>
      )}
    </div>
  );
}
