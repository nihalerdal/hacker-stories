import * as React from "react";

const useStorageState = (key: any, initialState: any) => {
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

  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        id="search"
        onInputChange={handleSearch}
        value={searchTerm}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      <hr />
      <List list={searchedStories} />
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}: any) => {

 const inputRef = React.useRef();

 React.useEffect(() => {
   if (isFocused && inputRef.current) {
     inputRef.current.focus();
   }
 }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
      <p>
        Searching for <strong>{value}</strong>
      </p>
    </>
  );
};

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
