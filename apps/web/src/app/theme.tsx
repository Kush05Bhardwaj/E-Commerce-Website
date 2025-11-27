import { PropsWithChildren, useEffect } from "react";

import { toggleTheme } from "@/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { ThemeContext } from "./theme-context";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggle: () => dispatch(toggleTheme()),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

