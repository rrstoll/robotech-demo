"use client";

import { ThemeProvider } from "@/lib/theme-provider";

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
