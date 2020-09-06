import React from "react";
import "./styles.scss";

const PosterImageComponent = props => {
  const { title, poster_path, bigSize } = props;

  return (
    <picture>
      <source media="(max-width:768px)"
        srcSet={`https://image.tmdb.org/t/p/w154${poster_path}`}
        />
      <img
        src={`https://image.tmdb.org/t/p/${bigSize ? 'w300_and_h450_bestv2' : 'w154'}${poster_path}`}
        className="poster-img"
        alt={title}
      />
    </picture>
  )
}

export default PosterImageComponent;