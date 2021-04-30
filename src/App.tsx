import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface ISearch {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: any;
}

const Search = ({ value = "123", onChange, children }: ISearch) => {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="search text..."
      />
    </div>
  );
};

function App() {
  const [search, setSearch] = useState("");
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };
  return (
    <div className="App">
      <img src="" alt="search image" />
      <Search value={search} onChange={handleChange}>
        SEARCH:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
}

export default App;
