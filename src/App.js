import "./CSS/app.css";
import GridContainer from "./Components/GridContainer";
import { useRef, useState } from "react";

function App() {
  let searchBar = useRef();
  let [searched, setSearched] = useState(false);
  let [searchQuery, setSearcheQuery] = useState("");

  function search(e) {
    if (e.keyCode === 13 && e.target.value !== "") {
      setSearched(true);
      setSearcheQuery(e.target.value);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <div
          onClick={() => {
            setSearched(false);

            searchBar.current.value = "";
          }}
          className="title"
        >
          Giffy
        </div>
        <input
          ref={searchBar}
          onKeyDown={search}
          className="search"
          type="text"
          placeholder="Search"
        />
      </div>
      <GridContainer searchQuery={searchQuery} searched={searched} />
    </div>
  );
}

export default App;
