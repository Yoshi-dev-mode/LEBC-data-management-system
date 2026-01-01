import React from "react";

// Define your Member type (can be imported from your hook if you already have it)
export type Member = {
  id: string | number;
  name: string;
  gender?: string;
  birthday?: string;
  address?: string;
  contact?: string;
  email?: string;
  member?: string;
  baptized?: string;
  married?: string;
  motherName?: string;
  fatherName?: string;
  photo?: string;
  deleted?: string;
};

// Only allow editable fields in the Editable component
export type EditableField = Exclude<keyof Member, "id" | "photo" | "deleted">;

interface EditableProps {
  label: string;
  field: EditableField;
  form: Member;
  setForm: React.Dispatch<React.SetStateAction<Member | null>>;
  edit: boolean;
}

const SELECT_FIELDS: Record<string, string[]> = {
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
  const isSelect = SELECT_FIELDS[field as string];

  const handleChange = (value: string) => {
    setForm(prev => {
      if (!prev) return prev; // safety guard
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  return (
    <div className="border rounded p-3">
      <p className="text-sm text-gray-500">{label}</p>

      {edit ? (
        isSelect ? (
          <select
            value={(form[field] as string) || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="border p-2 rounded w-full cursor-pointer"
          >

            <option value="">Select</option>
            {isSelect.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            value={(form[field] as string) || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="border p-2 rounded w-full"
          />

        )
      ) : (
        <p className="font-medium">{form[field] || "-"}</p>
      )}
    </div>
  );
}
