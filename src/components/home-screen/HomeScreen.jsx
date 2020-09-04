import React from "react";
import ContentScrollerComponent from "./../content-flex-scroller";
import "./styles.css";

const HomeScreen = () =>  {
  return (
    <div className="container">
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
    </div>
  );
}

export default HomeScreen;