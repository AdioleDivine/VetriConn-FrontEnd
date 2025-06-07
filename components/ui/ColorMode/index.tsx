import React from "react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import styles from "./index.module.scss";

const ColorModeButton: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  return (
    <button
      className={styles.colorModeButton}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label="Toggle color mode"
    >
      {isLight ? <LuSun /> : <LuMoon />}
    </button>
  );
};

export default ColorModeButton;
