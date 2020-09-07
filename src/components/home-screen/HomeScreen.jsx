import React from "react";
import ContentScrollerComponent from "./../content-flex-scroller";
import { useTranslation } from 'react-i18next';
  import "./styles.scss";

const HomeScreen = () =>  {
  const { t } = useTranslation();

  return (
    <>
      <ContentScrollerComponent
        title={t("titles.whats-popular")}
        customParams="/movie/popular"
      />
      <ContentScrollerComponent
        title={t("titles.todays-trending")}
        customParams="/trending/all/day"
      />
      <ContentScrollerComponent
        title={t("titles.in-theaters")}
        customParams="/movie/now_playing"
      />
    </>
  );
}

export default HomeScreen;