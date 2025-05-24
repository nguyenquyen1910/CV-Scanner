"use client";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth mdl-js">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
