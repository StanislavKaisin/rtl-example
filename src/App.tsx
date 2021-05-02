import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface ISearch {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: any;
}

interface IUser {
  id: number;
  name: string;
}

const getUser = () => {
  return Promise.resolve({ id: 1, name: "Bob" });
};

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
        // required
      />
    </div>
  );
};

function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<IUser | undefined>(undefined);
  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };
  return (
    <div className="App">
      {user && <h2>Logged in as {user.name}</h2>}
      <img src="" alt="search image" className="image" />
      <Search value={search} onChange={handleChange}>
        SEARCH:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
}

export default App;
