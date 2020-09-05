import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import HeartComponent from "./../heart";
import "./styles.scss";

const CardComponent = props => {
  const { title, poster_path, id, vote_average } = props.movieInfo;
  // console.log(props.movieInfo)

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="card-component-container">
      {
        // Show this if image is loading
        !imageLoaded && <p>Loading...</p>
      }
      <Link to={`/show/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w154${poster_path}`}
          className={`card-img card-image-${imageLoaded ? 'visible' : 'hidden'}`}
          alt={title}
          onLoad={()=> setImageLoaded(true)}
        />
      </Link>
      <div>
        <CircularProgressbar
          value={vote_average*10}
          text={vote_average}
          background
        />
        <HeartComponent id={id} />
      </div>
      <p>{title}</p>
    </div>
  )
}

export default CardComponent;