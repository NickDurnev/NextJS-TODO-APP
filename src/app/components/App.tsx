"use client";

import { useState } from "react";
import { FILTER, PRIORITY, ORDER_BY } from "@/app/constants";

import TODOList from "@/app/components/TODOList";
import AppBar from "@/app/components/AppBar";
import FiltersBar from "@/app/components/FiltersBar";

const DEFAULT_FILTERS = {
  status: FILTER[0].value,
  priority: PRIORITY[0],
  orderBy: ORDER_BY[0],
};

const App = () => {
  const [filters, setFilters] = useState<{ status: string; orderBy: string }>(
    DEFAULT_FILTERS
  );
  const [search, setSearch] = useState("");
  const [mutation, setMutation] = useState(null);

  return (
    <main className="w-full h-full min-h-screen flex flex-col gap-6 bg-skin-main py-8">
      <AppBar
        setSearch={(search) => setSearch(search)}
        setMutation={setMutation}
      />
      <FiltersBar setFilters={(filters) => setFilters(filters)} />
      <TODOList
        filters={filters}
        search={search}
        mutation={mutation}
        setMutation={setMutation}
      />
    </main>
  );
};

export default App;
