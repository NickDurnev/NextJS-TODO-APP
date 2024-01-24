import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import App from "./components/App";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODO App",
  description: "TODO App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterContext />
        <App />
      </body>
    </html>
  );
}
