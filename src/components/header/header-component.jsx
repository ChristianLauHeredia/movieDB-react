import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import cowIcon from "./../../assets/images/cow-icon.png";

const HeaderComponent = () => {
  const [isSticky, setSticky] = useState(false);

  //Function to show / hide the header if scroll
  const handleScroll = () => {
    // If window Y position > 64 return true
    setSticky(window.pageYOffset > 64);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    //If isSticky hide header
    <div className={`header-container${isSticky ? ' sticky' : ''}`} >
      <Link to={`/`}>
        <img src={cowIcon} alt="english icon" className="img-logo" />        
        <h1 className="header-text">Moovies</h1>
      </Link>
    </div>
  );
}

export default HeaderComponent;