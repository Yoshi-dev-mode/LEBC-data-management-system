'use client'
import React, { useEffect, useState } from 'react'
import { Roboto } from 'next/font/google'
import './globals.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '100', '300'],
  variable: '--font-roboto',
})

export const Context = React.createContext<{
  data: any[];
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
}>({
  data: [],
  setRows: () => {},
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [rows, setRows] = useState<any[]>([])

useEffect(() => {
  fetch("/api/members")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setRows(data);
      } else {
        setRows([]);
      }
    })
    .catch(() => setRows([]));
}, []);


const formattedRows = rows
  .filter(row => row?.[0])
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
    deleted: String(item[14] ?? ""), // ✅ THIS FIXES EVERYTHING
  }));


  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Context.Provider value={{ data: formattedRows, setRows }}>
          <section className="flex">
            <Sidebar />
            <div className="w-full">
              <Navbar />
              {children}
            </div>
          </section>
        </Context.Provider>
      </body>
    </html>
  )
}
