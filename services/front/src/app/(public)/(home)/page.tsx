"use client";

import { AnnouncementBar } from "@/components/landing-page/AnnouncementBar";
import { Hero } from "@/components/landing-page/Hero";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { ProductShowcase } from "@/components/landing-page/ProductShowcase";


export default function Page() {

      const { theme, setTheme } = useTheme();
  return (
    <main>
      {/* <AnnouncementBar /> */}

      <Hero />

          <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-md p-2 hover:bg-muted"
    >
      {theme === "light" ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
    </main>
  );
}
