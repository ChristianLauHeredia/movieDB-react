import React, { useState, useEffect, lazy, Suspense } from "react";
import { getCustomQuery } from "./../../services/data-request";
const CardComponent = lazy(() => import("./../card"));
import "./styles.scss";

const ContentScrollerComponent = props => {
  const { title, hasBackground, customParams } = props;
  const [movies, setMovies] = useState([]);

  useEffect( () => {
    getMovies()
  }, []);

  //TODO call endpoint
  const getMovies = async () => {
    const newMovies = await getCustomQuery(customParams);
    setMovies(newMovies ? movies.concat(newMovies) : movies);
  }

  // Returns array with cards
  const createCardsList = () => (
    movies.map(movie => {
      return <CardComponent movieInfo={movie} key={movie.id} />
    })
  )
  
  return (
    <div className={`content-scroller-container ${hasBackground && 'container-bg-color'}`}>
      <div className="container-wrapper">
        <h2 className={hasBackground && 'color-white'}>{title}</h2>
        <div className="content-flex-scroller">
          {
            //TODO on loading component
          }
          <Suspense fallback={<span>Loading...</span>}>
            {createCardsList()}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ContentScrollerComponent;