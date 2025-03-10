"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store"; 

// Create a Theme Context
const ThemeContext = createContext<{ theme: string; toggleTheme: () => void } | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
          {children}
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
}

// Custom Hook to use Theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a Providers component");
  }
  return context;
};