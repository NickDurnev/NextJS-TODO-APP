"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import useLocalStorage from "../hooks/useLocalStorage";
import useTheme from "../hooks/useTheme";
import Loader from "./Loader";
import TODOList from "./TODOList";
import AppBar from "./AppBar";
import FiltersBar from "./FiltersBar";
import { statusKeys, priorityKeys, orderByKeys } from "../constants";
import { Todo } from "@prisma/client";

const DEFAULT_FILTERS = {
  status: statusKeys[0].value,
  priority: priorityKeys[0],
  orderBy: orderByKeys[0],
};

const App = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isThemeLoading, setIsThemeLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [savedTheme, setSavedTheme] = useLocalStorage("theme");
  const { theme, set } = useTheme();

  useEffect(() => {
    savedTheme ? set(savedTheme) : setSavedTheme(theme);
    setIsThemeLoading(false);
  }, [savedTheme, set, setSavedTheme, theme]);

  if (isThemeLoading) {
    return (
      <div className="h-screen w-screen bg-gray-300">
        <Loader />
      </div>
    );
  }

  // const mockTODO = [
  //   {
  //     id: "1",
  //     title: "TODO 1",
  //     description: "TODO 1 description",
  //     status: "DONE",
  //     priority: 1,
  //     createdAt: new Date(),
  //   },
  // ];

  return (
    <main
      className={clsx(
        "h-screen w-screen flex flex-col gap-6 bg-skin-main py-8",
        theme === "dark" ? "theme-dark" : ""
      )}
    >
      <AppBar />
      <FiltersBar
        isLoading={isLoading}
        setFilters={(filters) => setFilters(filters)}
      />
      <TODOList filters={filters} />
    </main>
  );
};

export default App;
