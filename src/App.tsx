import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface ISearch {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: any;
}

const Search = ({ value, onChange, children }: ISearch) => {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input id="search" type="text" value={value} onChange={onChange} />
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
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
}

export default App;
