import "./CSS/app.css";
import GridContainer from "./Components/Grid";
import { useRef, useState } from "react";

import ResizeObserver from "react-resize-observer";

function App() {
  let searchBar = useRef();
  let [searched, setSearched] = useState(false);
  let [searchQuery, setSearcheQuery] = useState("");
  let [width, setWidth] = useState(window.innerWidth);
  let [height, setHeight] = useState(window.innerHeight);

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
      <GridContainer
        searchQuery={searchQuery}
        searched={searched}
        width={width}
        height={height}
      />
      <ResizeObserver
        onResize={({ width, height }) => {
          setWidth(width - 40);
          setHeight(height);
        }}
      />
    </div>
  );
}

export default App;
