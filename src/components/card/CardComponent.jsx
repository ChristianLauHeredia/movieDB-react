import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const CardComponent = props => {
  const { title, poster_path, id } = props.movieInfo;
  console.log(props.movieInfo)

  const [imageLoaded, setImageLoaded]=React.useState(false);
  
  return (
    <div className="card-container">
      <Link to={`/show/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w154${poster_path}`}
          className={`card-img image-${imageLoaded ? 'visible' : 'hidden'}`}
          alt={title}
          onLoad={()=> setImageLoaded(true)}
        />
      </Link>
      {
        !imageLoaded && <p>Loading...</p>
      }
      <p>{title}</p>
      {
        //TODO circle rate component
        //TODO like movie
      }
    </div>
  )
}

export default CardComponent;