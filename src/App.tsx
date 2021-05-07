import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

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

const URL = "http://hn.algolia.com/api/v1/search";

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

  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    try {
      const result = await axios.get(`${URL}?query=React`);
      setNews(result.data.hits);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="App">
      {user && <h2>Logged in as {user.name}</h2>}
      <img src="" alt="search image" className="image" />
      <Search value={search} onChange={handleChange}>
        SEARCH:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
      <hr />
      <button type="button" onClick={handleFetch}>
        Fetch News
      </button>
      {error && <span>Something went wrong...</span>}
      <ul>
        {news.map((objectId, url, title) => {
          return (
            <li key={objectId}>
              <a href={url}>{title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
