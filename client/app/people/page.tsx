"use client";
import { useState, useContext } from "react";
import { Context } from "../layout";
import { PeopleQuantityIcon } from "../../lib/icons";
import CustomSelect from "@/app/components/CustomSelect"
import { extractDriveFileId } from "@/lib/drive";
import Link from "next/link";
import Image from "next/image";

const selectStyle = `
    border px-4 py-2 rounded-lg
    transition
    focus:outline-none
    focus:border-[#1CB536]
    focus:ring-2
    focus:ring-[#1CB536]/40
    cursor-pointer
  `;

export default function PeopleGrid() {
  const { data } = useContext(Context);
  console.log(data)
  const [search, setSearch] = useState("");
  const [memberFilter, setMemberFilter] = useState("All");
  const [baptizedFilter, setBaptizedFilter] = useState("All");
  const [marriedFilter, setMarriedFilter] = useState("All");

  const filteredData = data
    // 1️⃣ remove deleted members FIRST
    .filter(person => String(person.deleted).toUpperCase() !== "TRUE")

    // 2️⃣ apply dropdown filters
    .filter(person => {
      const memberMatch =
        memberFilter === "All" || person.member === memberFilter;

      const baptizedMatch =
        baptizedFilter === "All" || person.baptized === baptizedFilter;

      const marriedMatch =
        marriedFilter === "All" || person.married === marriedFilter;

      return memberMatch && baptizedMatch && marriedMatch;
    })

    // 3️⃣ apply search
    .filter(person =>
      person.name?.toLowerCase().includes(search.toLowerCase())
    );


  function driveToDirect(url?: string) {
    if (!url) return "/user.png";

    const match = url.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)/);
    return match
      ? `https://drive.google.com/uc?export=view&id=${match[1]}`
      : "/lebc.jpg";
  }

  return (
    <section className="mr-20 mt-10 ml-20">
      <div className="flex items-center mb-3">
        <PeopleQuantityIcon fontSize="large" sx={{ color: "#1CB536" }} />
        <h1 className="text-2xl ml-3">Church Members</h1>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-6 py-2 rounded-full flex-1 focus:outline-none caret-[#1CB536]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CustomSelect
          label="Members"
          value={memberFilter}
          onChange={setMemberFilter}
          options={["All", "Yes", "No"]}
        />

        <CustomSelect
          label="Baptized"
          value={baptizedFilter}
          onChange={setBaptizedFilter}
          options={["All", "Yes", "No"]}
        />

        <CustomSelect
          label="Married"
          value={marriedFilter}
          onChange={setMarriedFilter}
          options={["All", "Yes", "No"]}
        />

      </div>

      {/* GRID */}
      {filteredData.length === 0 ? (
        <p>No members found</p>
      ) : (
        <div className="grid items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {filteredData.map((person, index) => {
            const safeId =
              person.id && person.id !== "undefined"
                ? person.id
                : `temp-${index}`;

            return (
              <Link
                key={safeId}
                href={`/people/${safeId}`}
                className="rounded-lg text-center shadow-lg hover:shadow-xl transition"
              >
                <div className="h-36 mx-auto overflow-hidden rounded-t-lg">
                  {extractDriveFileId(person.photo) ? (
                    <Image
                      src={driveToDirect(person.photo)}
                      alt={person.name || "Member"}
                      width={150}
                      height={150}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-light-blue">
                      <Image
                        src="/user-unknown.png"
                        alt="Default user"
                        width={48}
                        height={48}
                        className="opacity-60"
                      />
                    </div>
                  )}
                </div>

                <p className="p-3 font-semibold">{person.name || "Unnamed"}</p>
              </Link>
            );
          })}

        </div>
      )}
    </section>
  );
}
