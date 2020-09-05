import React from "react";
import ContentScrollerComponent from "./../content-flex-scroller";
import "./styles.scss";

const HomeScreen = () =>  {
  return (
    <>
      <ContentScrollerComponent
        title="What's Popular"
        hasBackground
        customParams="/movie/popular"
      />
      <ContentScrollerComponent
        title="Today's Trending"
        customParams="/trending/all/day"
      />
      <ContentScrollerComponent
        title="In Theaters"
        customParams="/movie/now_playing"
      />
    </>
  );
}

export default HomeScreen;