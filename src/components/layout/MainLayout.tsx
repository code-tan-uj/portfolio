"use client";

import type { ReactNode } from "react";
import GlassNavbar from "./GlassNavbar";
import Footer from "./Footer";
import { Cursor } from "@/components/effects";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div
      className="relative flex flex-col"
      style={{ minHeight: "100dvh" }}
    >
      {/* Mesh gradient background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: -1,
          backgroundImage: "var(--gradient-mesh)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Custom animated cursor — desktop only */}
      <Cursor />

      <GlassNavbar />

      <main
        className="flex-1"
        style={{ paddingTop: 72 }}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
