import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen ">
      <Navbar />
      <main
        className={`
        flex flex-1
      `}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
