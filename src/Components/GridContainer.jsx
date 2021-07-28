import React, { useEffect, useState } from "react";

import { GiphyFetch } from "@giphy/js-fetch-api";
import "../CSS/gridContainer.css";

function GridContainer({ searchQuery, searched }) {
  let [fetched, setFetched] = useState(false);
  let [gifs, setGifs] = useState([]);

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
          setGifs(res.data);
        })
      : trendingGifs().then((res) => {
          setFetched(true);
          console.log(res.data);
          setGifs(res.data);
        });
  }, [searched, searchQuery]);

  return fetched ? (
    <div className="gridContainer">
      <section className="searchContainer">
        {gifs.map((gif) => {
          return (
            <a key={gif.id} href={gif.url}>
              <img src={gif.images.original.url} alt="" />
            </a>
          );
        })}
      </section>
    </div>
  ) : (
    <div className="loader">Loading...</div>
  );
}

export default GridContainer;

//Gif approach-----"React-resize-observer" required for dynamic dimensions

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

//Grid approach
// <Grid
//   fetchGifs={trendingGifs}
//   width={height > width || width < 728 ? width : width / 2}
//   columns={3}
//   gutter={6}
// />
