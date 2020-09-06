import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import HeartComponent from "./../heart";
import Loader from 'react-loader-spinner';
const PosterImageComponent = lazy(() => import("./../poster-image"));
import "./styles.scss";

const CardComponent = props => {
  const { title, poster_path, id, vote_average } = props.movieInfo;

  return (
    <div className="card-component-container">
      <Link to={`/show/${id}`}>
        <Suspense fallback={
          <div className="card-loader-container">
            <Loader
              type="Oval"
              color="#00BFFF"
              height={50}
              width={50}
            />
          </div>
        }>
          <PosterImageComponent
            poster_path={poster_path}
            title={title}
          />
        </Suspense>
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