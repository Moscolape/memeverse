import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Providers } from "./providers"; // Wraps Redux & Theme
import "./globals.css";
import TopNav from "../components/top-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MemeVerse",
  description: "Explore, upload, and interact with memes",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TopNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
