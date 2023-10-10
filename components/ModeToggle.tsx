"use client";

import { useTheme } from "next-themes";
import { MdBrightness4, MdBrightness7 } from "react-icons/md";

import { Button } from "@/components/ui/button";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <MdBrightness4 size={20} />
      ) : (
        <MdBrightness7 size={20} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ModeToggle;
