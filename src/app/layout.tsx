import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Management SaaS",
  description: "Multi-tenant restaurant platform with role dashboards"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
