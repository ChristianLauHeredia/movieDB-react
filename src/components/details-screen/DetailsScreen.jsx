import React, { useState, useEffect, lazy, Suspense  } from "react";
import { useParams, withRouter } from "react-router-dom";
import { getMovieDetails } from "./../../services/data-request";
import BlurredBackgroundColorComponent from "./../custom-background-color";
import { CircularProgressbar } from 'react-circular-progressbar';
import HeartComponent from "./../heart";
import Loader from 'react-loader-spinner';
const PosterImageComponent = lazy(() => import("./../poster-image"));
import "./styles.scss";

const urlBackdropImg = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";
const posterBaseUrl = "https://image.tmdb.org/t/p/w154";

const DetailsScreen = props => {
  const [movie, setMovie] = useState({});
  const [bgUrl, setBGUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const { id } = useParams();

  useEffect( () => {
    getMovie();
  }, []);

  useEffect( () => {
    if(movie.backdrop_path) setBGUrl(`${urlBackdropImg}${movie.backdrop_path}`)
    if(movie.poster_path) setPosterUrl(`${posterBaseUrl}${movie.poster_path}`)
  }, [movie]);

  // Get Show data
  const getMovie = async () => {
    const movieData = await getMovieDetails(id);
    if (movieData.title) setMovie(movieData);
    else props.history.push('/');
  }

  // Return show genres
  const mapGenres = genres => (
    genres.map((genre, index) => <span key={genre.id}>{`${genre.name}${index + 1 === genres.length ? '.' : ', '}`}</span>)
  )

  // Return runtime in hours
  const formatRuntime = runtime => {
    const min = runtime % 60;
    const hour = (runtime - min) / 60;
    return <span>{`${hour}h ${min}m - `}</span>
  }

  // Return the details of the show
  const detailsDataComponent = () => (
    <>
      <h2>
        {movie.title}
        {movie.release_date && <span>{` (${movie.release_date.split('-')[0]}).`}</span>}
      </h2>
      <p>
        {movie.runtime !== 0 && formatRuntime(movie.runtime)}
        {movie.genres && mapGenres(movie.genres)}
      </p>
      {
        movie.vote_average !== 0 && (
          <div className="score-container">
            <CircularProgressbar
              value={movie.vote_average*10}
              text={movie.vote_average}
              background
            />
            <span>User Score</span>
          </div>
        )
      }
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

  return (
    <>
      <div className="details-component-header" style={bgUrl?{backgroundImage:`url(${bgUrl})`}:{}}>
        <BlurredBackgroundColorComponent
          url={posterUrl}
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
    </>
  )
}

export default withRouter(DetailsScreen);