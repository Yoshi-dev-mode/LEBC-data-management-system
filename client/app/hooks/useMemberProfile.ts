'use client';

import { useContext, useEffect, useState } from "react";
import { Context } from "../providers/Providers";
import { memberToRow } from "@/lib/memberMapper";
import {
  uploadImage,
  deleteImage,
  saveMembers,
  deleteMember,
} from "@/app/services/memberService";
import { extractDriveFileId } from "@/lib/drive";
import { Member } from "@/app/types/member";

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
    if (memberIndex === -1) return;

    const updated = [...data];
    updated[memberIndex] = form;

    setRows(updated); 
    setIsEditing(false);

    await saveMembers(updated.map(memberToRow)); 
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

    setRows(updated);
    await saveMembers(updated.map(memberToRow));
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
