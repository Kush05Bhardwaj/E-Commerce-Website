import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";

interface UIState {
  theme: ThemeMode;
  isSidebarOpen: boolean;
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme") as ThemeMode | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const initialState: UIState = {
  theme: getInitialTheme(),
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      window.localStorage.setItem("theme", state.theme);
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { toggleTheme, setSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;

