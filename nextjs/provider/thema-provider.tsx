"use client";

import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

export const ThemaProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      {children}
    </ThemeProvider>
  );
};
