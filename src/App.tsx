import * as React from "react";

const Search = (props: any) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);

    //C: is executed there as callback handler
    props.onSearch(event);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </div>
  );
};

const List = (props: any) => (
  <ul>
    {props.list.map((item: any) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = (props: any) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

const App = () => {
  //A: A callback handler gets introduced as event handler
  const handleSearch = (event: any) => {
    //D: calls back to the place it was introduced
    console.log(event.target.value);
  };

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

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/*B: is passed as function in props to another component*/}
      <Search onSearch={handleSearch} />
      <hr />
      <List list={stories} />
    </div>
  );
};

export default App;
