// app/layout.tsx (SERVER)
import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Providers from "./providers/Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LEBC Data Management System",
  description: "Internal LEBC data management system",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Providers>
          <section className="flex">
            <Sidebar />
            <div className="w-full">
              <Navbar />
              {children}
            </div>
          </section>
        </Providers>
      </body>
    </html>
  );
}
