"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";

export const ThemaSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
          color="primary"
        />
      }
      label=""
    />
  );
};
