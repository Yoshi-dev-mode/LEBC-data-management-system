"use client";

import React, { useEffect, useState } from "react";
import { Member } from "@/app/types/member";

export type RawMemberRow = (string | number | null | undefined)[];

type ContextType = {
  data: Member[];
  setRows: React.Dispatch<React.SetStateAction<Member[]>>;
};

export const Context = React.createContext<ContextType>({
  data: [],
  setRows: () => {},
});

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rows, setRows] = useState<Member[]>([]);

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data: RawMemberRow[]) => {
        const members: Member[] = Array.isArray(data)
          ? data
              .filter((row) => row?.[0])
              .map((item) => ({
                id: String(item[0]),
                timestamp: String(item[1] ?? ""),
                name: String(item[2] ?? ""),
                gender: String(item[3] ?? ""),
                address: String(item[4] ?? ""),
                birthday: String(item[5] ?? ""),
                member: String(item[6] ?? ""),
                baptized: String(item[7] ?? ""),
                contact: String(item[8] ?? ""),
                email: String(item[9] ?? ""),
                motherName: String(item[10] ?? ""),
                fatherName: String(item[11] ?? ""),
                married: String(item[12] ?? ""),
                photo: String(item[13] ?? ""),
                deleted: String(item[14] ?? ""),
              }))
          : [];

        setRows(members);
      })
      .catch(() => setRows([]));
  }, []);

  return (
    <Context.Provider value={{ data: rows, setRows }}>
      {children}
    </Context.Provider>
  );
}
