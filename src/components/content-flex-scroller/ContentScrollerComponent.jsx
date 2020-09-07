import React, { useState, useEffect, lazy, Suspense } from "react";
import { getCustomQuery } from "./../../services/data-request";
import Loader from 'react-loader-spinner';
const CardComponent = lazy(() => import("./../card"));
import { useTranslation } from 'react-i18next';
import "./styles.scss";

const ContentScrollerComponent = props => {
  const { title, hasBackground, customParams, errorMsg="" } = props;
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("title-asc");
  const { t } = useTranslation();

  useEffect( () => {
    getMovies()
  }, []);

  // Update when lang changes
  useEffect( () => {
    getMovies();
  }, [t]);

  // Get Shows data
  const getMovies = async () => {
    let newMovies = await getCustomQuery(customParams);
    setMovies(newMovies);
  }

  // Sort by function
  const sortMovies = (arr) => {
    if (!sortBy) return arr
    return arr.sort(function(a, b){
      if(sortBy.includes("title")){
        const firstItem = a.title, secondItem = b.title;
        if (firstItem < secondItem) return sortBy.includes("asc") ? -1 : 1
        if (firstItem > secondItem) return sortBy.includes("asc") ? 1 : -1
        return 0;
      } else {
        const firstItem = a.vote_average, secondItem = b.vote_average;
        return sortBy.includes("asc") ? firstItem - secondItem : secondItem - firstItem
      }
    });
  }

  // Returns array with cards
  const createCardsList = () => (
    sortMovies(movies).map(movie => {
      return movie.poster_path ? <CardComponent movieInfo={movie} key={movie.id} /> : null
    })
  )

  // Select handler
  const changeSorting = event => {
    setSortBy(event.target.value)
  }

  return movies.length > 0 ? (
    <div className={`content-scroller-container ${hasBackground && 'container-bg-color'}`}>
      <div className="title-container">
        <h2>{title}</h2>
        <div className="sort-select">
          <span id="sort-select">{t('scroller.sort-by')}</span>
          <select id="sort" aria-labelledby="sort-select" onChange={e => changeSorting(e)} value={sortBy}>
            <option value="title-asc">{t('scroller.title')} &#8593;</option>
            <option value="title-desc">{t('scroller.title')} &#8595;</option>
            <option value="votes-asc">{t('scroller.votes')} &#8593;</option>
            <option value="votes-desc">{t('scroller.votes')} &#8595;</option>
          </select>
        </div>
      </div>
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