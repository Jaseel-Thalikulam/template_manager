"use client";


import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const pathLinks = [
    {
      name: "Assign Concern",
      link: "/assign-concern",
    },
    {
      name: "Request Recording",
      link: "/",
    },
  ];
  const filteredLinks = pathLinks.filter((path) => pathname !== path.link);
  console.log(pathname,filteredLinks)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-5`}
      >
        <div className="h-16 w-full bg-violet-700 flex items-center justify-center rounded-3xl gap-5">
          {filteredLinks.map((path, index) => (
            <Link key={index} href={path.link} className="hover:text-white">
              <button >{path.name}</button>
            </Link>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
