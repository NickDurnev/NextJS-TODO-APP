"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import useLocalStorage from "../hooks/useLocalStorage";
import useTheme from "../hooks/useTheme";
import Loader from "./Loader";
import Button from "./Button";
import TODOForm from "./TODOForm";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const [savedTheme, setSavedTheme] = useLocalStorage("theme");
  const { theme, set } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    savedTheme ? set(savedTheme) : setSavedTheme(theme);
    setIsLoading(false);
  }, [savedTheme, set, setSavedTheme, theme]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-gray-300">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "h-screen w-screen bg-skin-main",
        theme === "dark" ? "theme-dark" : ""
      )}
    >
      <div className="flex justify-center py-8">
        <Button onClick={() => setIsModalOpen(true)}>Add new task</Button>
      </div>
      <TODOForm onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
      {children}
    </div>
  );
};

export default AppContainer;
