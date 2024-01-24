"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import useLocalStorage from "../hooks/useLocalStorage";
import useTheme from "../hooks/useTheme";
import Loader from "./Loader";
import EmptyState from "./EmptyState";
import TODOList from "./TODOList";
import AppBar from "./AppBar";
import FiltersBar from "./FiltersBar";

const App = () => {
  const [savedTheme, setSavedTheme] = useLocalStorage("theme");
  const { theme, set } = useTheme();

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

  const mockTODO = [
    {
      id: "1",
      title: "TODO 1",
      description: "TODO 1 description",
      status: "DONE",
      priority: 1,
      createdAt: new Date(),
    },
  ];

  return (
    <main
      className={clsx(
        "h-screen w-screen bg-skin-main",
        theme === "dark" ? "theme-dark" : ""
      )}
    >
      <AppBar />
      <FiltersBar />
      <div className="w-full flex justify-center top-20 sm:top-4 text-center">
        {mockTODO.length > 0 ? <TODOList data={mockTODO} /> : <EmptyState />}
      </div>
    </main>
  );
};

export default App;
