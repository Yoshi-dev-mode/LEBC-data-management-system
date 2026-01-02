'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  PeopleQuantityIcon,
} from "../../lib/icons";

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, link: "/" },
    { id: "people", label: "People", icon: <PeopleQuantityIcon />, link: "/people" },
  ];

  return (
    <nav className="shadow-xl sidebar sticky top-0 h-screen w-64 bg-white">
      <div className="flex items-center p-5">
        <Image src="/favicon.ico" alt="Logo" width={35} height={70} />
        <h4 className="text-green text-2xl font-extrabold ml-3">LEBC</h4>
      </div>

      <section className="my-6">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.link;

          return (
            <Link href={item.link} key={item.id}>
              <div
                className={`flex pl-5 pr-16 py-5 w-full cursor-pointer
                  ${isActive ? "bg-light-green text-green-700" : "sidebar-hover"}
                `}
              >
                <div className="flex items-center">
                  {item.icon}
                  <p className="ml-4">{item.label}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </nav>
  );
}
