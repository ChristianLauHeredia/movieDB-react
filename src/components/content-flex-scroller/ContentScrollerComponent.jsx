import React, { useState, useEffect, lazy, Suspense } from "react";
import { getCustomQuery } from "./../../services/data-request";
import Loader from 'react-loader-spinner';
const CardComponent = lazy(() => import("./../card"));
import "./styles.scss";

const ContentScrollerComponent = props => {
  const { title, hasBackground, customParams, errorMsg="" } = props;
  const [movies, setMovies] = useState([]);

  useEffect( () => {
    getMovies()
  }, []);

  // Get Shows data
  const getMovies = async () => {
    const newMovies = await getCustomQuery(customParams);
    setMovies(newMovies ? movies.concat(newMovies) : movies);
  }

  // Returns array with cards
  const createCardsList = () => (
    movies.map(movie => {
      return movie.poster_path ? <CardComponent movieInfo={movie} key={movie.id} /> : null
    })
  )
  
  return movies.length > 0 ? (
    <div className={`content-scroller-container ${hasBackground && 'container-bg-color'}`}>
      <h2>{title}</h2>
      <div className="content-flex-scroller">
        <Suspense fallback={
          <div className="content-flex-scroller-loader-container">
            <Loader
              type="Oval"
              color="#00BFFF"
              height={50}
              width={50}
            />
          </div>
        }>
          {createCardsList()}
        </Suspense>
      </div>
    </div>
  ) : <p>{errorMsg}</p>
}

export default ContentScrollerComponent;