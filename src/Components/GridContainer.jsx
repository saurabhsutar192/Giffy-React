import React, { useEffect, useState } from "react";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import "../CSS/gridContainer.css";

function GridContainer({ searchQuery, searched, width, height }) {
  let [fetched, setFetched] = useState(false);
  const giphyFetch = new GiphyFetch("UcIefYLGg8sAVMUtZmrc3pK28yXuUX0H");

  function trendingGifs() {
    return giphyFetch.trending({ limit: 20 });
  }

  function searchGifs() {
    return giphyFetch.search(searchQuery, { limit: 20 });
  }
  useEffect(() => {
    setFetched(false);
    searched
      ? searchGifs().then((res) => {
          setFetched(true);
        })
      : trendingGifs().then((res) => {
          setFetched(true);
        });
  }, [searched, searchQuery]);

  return fetched ? (
    <div className="gridContainer">
      {!searched ? (
        <Grid
          fetchGifs={trendingGifs}
          width={height > width || width < 728 ? width : width / 2}
          columns={3}
          gutter={6}
        />
      ) : (
        <Grid
          fetchGifs={searchGifs}
          width={height > width || width < 728 ? width : width / 2}
          columns={3}
          gutter={6}
        />
      )}
    </div>
  ) : (
    <div className="loader">Loading...</div>
  );
}

export default GridContainer;

//non Grid approach

// <div className="searchContainer">
//   {searchRes.map((gif) => {
//     return (
//       <div key={gif.id} className="grid">
//         <Gif
//           gif={gif}
//           width={width > 728 ? 200 : 100}
//           height={width > 728 ? 200 : 100}
//         />
//       </div>
//     );
//   })}
// </div>
