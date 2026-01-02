'use client'

import Cards from "./Cards";
import {
  TotalPeopleIcon, PeopleIcon, WaterDropIcon,
  NotWaterDropIcon, NotMemberIcon, MaleIcon, FemaleIcon, DashboardIcon
} from "../../lib/icons";
import { useContext } from "react";
import { Context } from "../providers/Providers";
import { Member } from "@/app/types/member";

// Import recharts
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

export default function Mainpage() {
  const { data } = useContext(Context);

  // ✅ ONLY active (not deleted) members
  const activeData = data.filter(p => p.deleted !== "TRUE");

  // ✅ COUNTS
  const counts = activeData.reduce(
    (acc, p) => {
      if (p.gender === "Male") acc.male++;
      if (p.gender === "Female") acc.female++;
      if (p.member === "Yes") acc.member++;
      if (p.member === "No") acc.non_member++;
      if (p.baptized === "Yes") acc.baptized++;
      if (p.baptized === "No") acc.not_baptized++;
      return acc;
    },
    {
      male: 0,
      female: 0,
      member: 0,
      non_member: 0,
      baptized: 0,
      not_baptized: 0,
    }
  );
  
  const pie = (labels: string[], values: number[]) =>
    labels.map((name, i) => ({ name, value: values[i] }));

  const genderData = pie(
    ["Male", "Female"],
    [counts.male, counts.female]
  );

  const memberData = pie(
    ["Member", "Non-member"],
    [counts.member, counts.non_member]
  );

  const baptizedData = pie(
    ["Baptized", "Not Baptized"],
    [counts.baptized, counts.not_baptized]
  );

  // Chart data
  const cards = [
    { text: "Total People", value: activeData.length, icon: TotalPeopleIcon, bg: "bg-light-blue" },
    { text: "Male", value: counts.male, icon: MaleIcon, bg: "bg-light-green" },
    { text: "Female", value: counts.female, icon: FemaleIcon, bg: "bg-light-blue" },
    { text: "Baptized", value: counts.baptized, icon: WaterDropIcon, bg: "bg-light-blue" },
    { text: "Not Baptized", value: counts.not_baptized, icon: NotWaterDropIcon, bg: "bg-light-green" },
    { text: "Member", value: counts.member, icon: PeopleIcon, bg: "bg-light-blue" },
    { text: "Non-member", value: counts.non_member, icon: NotMemberIcon, bg: "bg-light-blue" },
  ];

  const COLORS = ["#4F46E5", "#16A34A", "#F59E0B", "#EF4444"];

  return (
    <section className="mr-20 mt-10 ml-20">
      <div className="flex items-center mb-3">
        <DashboardIcon fontSize="large" sx={{ color: "#1CB536" }} />
        <h1 className="text-2xl ml-3">Dashboard</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-3 gap-4 mt-3">
        {cards.map(c => (
          <Cards
            key={c.text}
            bgColor={c.bg}
            integer={c.value}
            text={c.text}
            image={c.icon}
          />
        ))}
      </div>


      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        {/* Gender Pie Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-2">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Member Pie Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-2">Membership Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={memberData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={90}
                fill="#82ca9d"
                dataKey="value"
              >
                {memberData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Baptism Bar Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-2">Baptism Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={baptizedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
