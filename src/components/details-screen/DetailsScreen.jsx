import React, { useState, useEffect, lazy, Suspense  } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "./../../services/data-request";
import BlurredBackgroundColorComponent from "./../custom-background-color";
import { CircularProgressbar } from 'react-circular-progressbar';
import HeartComponent from "./../heart";
import ContentScrollerComponent from "./../content-flex-scroller";
import Loader from 'react-loader-spinner';
const PosterImageComponent = lazy(() => import("./../poster-image"));
import "./styles.scss";

const urlBackdropImg = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

const DetailsScreen = () => {
  const [movie, setMovie] = useState({});
  const [bgUrl, setBGUrl] = useState("");
  const [movieLoaded, setLoading] = useState(false);
  const { id } = useParams();

  useEffect( () => {
    getMovie();
  }, []);

  useEffect( () => {
    if(movie.backdrop_path) {
      setBGUrl(`${urlBackdropImg}${movie.backdrop_path}`)
      setLoading(true)
    }
  }, [movie]);

  // Get Show data
  const getMovie = async () => {
    setMovie(await getMovieDetails(id));
  }

  const mapGenres = genres => (
    genres.map((genre, index) => <span key={genre.id}>{`${genre.name}${index + 1 === genres.length ? '.' : ', '}`}</span>)
  )

  const formatRuntime = runtime => {
    const min = runtime % 60;
    const hour = (runtime - min) / 60;
    return <span>{`${hour}h ${min}m - `}</span>
  }

  const detailsDataComponent = () => (
    <>
      <h2>
        {movie.title}
        {
          movie.release_date && <span>{` (${movie.release_date.split('-')[0]}).`}</span>
        }
      </h2>
      <p>
        {movie.runtime && formatRuntime(movie.runtime)}
        {movie.genres && mapGenres(movie.genres)}
      </p>
      <div className="score-container">
        <CircularProgressbar
          value={movie.vote_average*10}
          text={movie.vote_average}
          background
        />
        <span>User Score</span>
      </div>
      <div className="overview-container">
        <h3>Overview</h3>
        <p>{movie.overview}</p>
      </div>
    </>
  )

  const deskViewDetails = () => (
    <div className="details-data details-desk-container ">
      {detailsDataComponent()}
    </div>
  )

  const mobileViewDetails = () => (
    <div className="details-data details-mobile-container">
      {detailsDataComponent()}
    </div>
  )

  return movieLoaded ? (
    <>
      <div className="details-component-header" style={bgUrl?{backgroundImage:`url(${bgUrl})`}:{}}>
        <BlurredBackgroundColorComponent
          url={bgUrl}
        >
          <div className="details-container">
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
              <div className="details-poster-container">
                <PosterImageComponent
                  poster_path={movie.poster_path}
                  title={movie.title}
                  bigSize
                />
                <HeartComponent id={id} />
              </div>
            </Suspense>
            {deskViewDetails()}
          </div>
        </BlurredBackgroundColorComponent>
      </div>
      {mobileViewDetails()}
      <ContentScrollerComponent
        title="Similar Shows"
        customParams={`/movie/${id}/similar`}
      />
    </>
  ) : null;
}

export default DetailsScreen;