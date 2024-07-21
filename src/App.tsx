import * as React from "react";

  const useStorageState = (key:any, initialState:any) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]); //two arguments--> 1)a callback func that stores searchTerm value with 'search' key, 2) dependency array of variables. The func is called every time that changes.

    return [value, setValue];
  };

const App = () => {
  
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useStorageState(
    "search", "React"
  );

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch} searchTerm={searchTerm} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

const Search = ({ searchTerm, onSearch }: any) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={searchTerm} onChange={onSearch} />
    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </div>
);

const List = ({ list }: any) => (
  <ul>
    {list.map(({ objectID, ...item }: any) => (
      <Item key={item.objectID} {...item} />
    ))}
  </ul>
);

const Item = ({ title, url, author, num_comments, points }: any) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

export default App;
