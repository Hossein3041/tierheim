import React from "react";

export const SearchQueryContext = React.createContext<{
  searchQuery: string;
}>({
  searchQuery: "",
});
