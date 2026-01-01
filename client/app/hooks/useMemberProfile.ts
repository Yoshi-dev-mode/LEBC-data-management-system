'use client';

import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/layout";
import { memberToRow } from "@/lib/memberMapper";
import {
  uploadImage,
  deleteImage,
  saveMembers,
  deleteMember,
} from "@/app/services/memberService";
import { extractDriveFileId } from "@/lib/drive";

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

export function useMemberProfile(id: string | string[] | undefined) {
  const { data, setRows } = useContext(Context);

  const memberIndex = data.findIndex(m => String(m.id) === String(id));
  const member = data[memberIndex];

  const [form, setForm] = useState<Member | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // sync form with member
  useEffect(() => {
    setForm(member ?? null);
  }, [member]);

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewPhoto) URL.revokeObjectURL(previewPhoto);
    };
  }, [previewPhoto]);

  async function uploadPhoto(file: File) {
    if (!form) return;

    setUploading(true);
    setPreviewPhoto(URL.createObjectURL(file));

    try {
      const oldId = extractDriveFileId(form.photo);
      if (oldId) await deleteImage(oldId);

      const url = await uploadImage(file);
      setForm(prev => (prev ? { ...prev, photo: url } : prev));
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!form || uploading) return;

    const updated = [...data];
    updated[memberIndex] = form;

    const rows = updated.map(memberToRow);
    setRows(rows);
    setIsEditing(false);
    await saveMembers(rows);
    setPreviewPhoto(null);
  }

  async function remove() {
    if (!form) return;

    const fileId = extractDriveFileId(form.photo);
    if (fileId) await deleteImage(fileId);

    await deleteMember(form.id);

    const updated = data.map(m =>
      String(m.id) === String(form.id)
        ? { ...m, deleted: "TRUE" }
        : m
    );

    setRows(updated.map(memberToRow));
  }

  return {
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
  };
}
