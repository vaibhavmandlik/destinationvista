import React, { createContext, useContext, useState } from "react";

type SearchQuery = {
  state: string;
  city: string;
  startDate: string;
  duration: string;
  customDuration: string;
};

type SearchContextType = {
  query: SearchQuery;
  setQuery: (q: SearchQuery) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<SearchQuery>({
    state: "",
    city: "",
    startDate: "",
    duration: "",
    customDuration: "",
  });

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
};
