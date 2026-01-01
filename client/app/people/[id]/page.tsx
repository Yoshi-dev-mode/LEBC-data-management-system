'use client';

import { useParams } from "next/navigation";
import Image from "next/image";
import Editable, { EditableField } from "@/app/components/Editable";
import { driveToDirect } from "@/lib/drive";
import { useMemberProfile } from "@/app/hooks/useMemberProfile";
import { useRouter } from "next/navigation";

const PROFILE_FIELDS: { label: string; field: EditableField }[] = [
  { label: "Gender", field: "gender" },
  { label: "Birthday", field: "birthday" },
  { label: "Address", field: "address" },
  { label: "Contact", field: "contact" },
  { label: "Email", field: "email" },
  { label: "Member", field: "member" },
  { label: "Baptized", field: "baptized" },
  { label: "Married", field: "married" },
  { label: "Mother", field: "motherName" },
  { label: "Father", field: "fatherName" },
];

const baseBtn =
  "px-6 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1CB536]/40 cursor-pointer ";


export default function MemberProfile() {
  const { id } = useParams();
  const router = useRouter();

  const {
    member,
    form,
    setForm,
    isEditing,
    setIsEditing,
    previewPhoto,
    uploading,
    uploadPhoto,
    save,
    remove,
  } = useMemberProfile(id);

  if (!member) return <p className="p-10">Member not found</p>;
  if (!form) return <p className="p-10">Loading profile...</p>;

  return (
    <section className="p-10 max-w-3xl mx-auto">
      {/* IMAGE */}
      <div className="flex flex-col items-center">
        {isEditing && previewPhoto ? (
          <Image
            src={previewPhoto}
            alt="Preview"
            className="w-40 h-40 rounded-full object-cover"
            width={150}
            height={150}
          />
        ) : (
          <Image
            src={driveToDirect(form.photo)}
            alt={form.name}
            width={150}
            height={150}
            className="w-40 h-40 rounded-full object-cover"
          />
        )}

        {isEditing && (
          <div className="mt-3">
            <label className="
      flex items-center justify-center
      px-4 py-2 rounded-full
      border-1 border-green text-green
      hover:text-white
      cursor-pointer
      hover:bg-[#17a82f]
      transition
      focus:outline-none
      focus:ring-2 focus:ring-[#1CB536]/40
    ">
              {previewPhoto ? "Change Photo" : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadPhoto(file);
                }}
                className="hidden"
              />
            </label>
          </div>

        )}

        <h1 className="text-3xl font-bold mt-4">
          {isEditing ? (
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded"
            />
          ) : (
            member.name
          )}
        </h1>
      </div>

      {/* INFO */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROFILE_FIELDS.map(({ label, field }) => (
          <Editable
            key={field}
            label={label}
            field={field}
            form={form}
            setForm={setForm}
            edit={isEditing}
          />
        ))}
      </div>

      {/* ACTIONS */}
      <div className="mt-8 flex gap-4 justify-center">
        {isEditing ? (
          <>
            <button
              onClick={save}
              disabled={uploading}
              className={`${baseBtn} text-white ${uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1CB536] hover:bg-[#17a82f] active:scale-95"
                }`}
            >
              {uploading ? "Uploading Image..." : "Save"}
            </button>

            <button
              onClick={async () => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this item?"
                );

                if (!confirmed) return;

                await remove();        // ✅ delete first
                router.push("/people"); // ✅ then redirect
              }}
              className={`${baseBtn} bg-red-600 text-white hover:bg-red-700 active:scale-95`}
            >
              Delete
            </button>


            <button
              onClick={() => setIsEditing(false)}
              className={`${baseBtn} bg-gray-200 text-gray-800 hover:bg-gray-300 active:scale-95`}
            >
              Cancel
            </button>

          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green text-white px-6 py-2 rounded-full w-36 cursor-pointer hover:bg-light-green hover:text-green transition-all"
          >
            Edit Profile
          </button>
        )}
      </div>
    </section>
  );
}
