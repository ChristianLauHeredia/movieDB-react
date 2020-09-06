import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";
import { saveFavorite, checkFavorite, removeFavorite } from "../../services/local-storage";

const HeartComponent = props => {
  const { id } = props;
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(checkFavorite(+id));
  }, [])

  // Add or remove id to localstorage
  const handleHeartClick = () => {
    if(!isFavorite) setFavorite(saveFavorite(+id))
    else setFavorite(removeFavorite(+id))
  }

  return <Heart isClick={isFavorite} onClick={() => handleHeartClick()} />
}

export default HeartComponent;