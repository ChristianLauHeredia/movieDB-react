import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

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
      <NavLink to='/'>
        <h1 className="header-text">MOOVIES</h1>
      </NavLink>
    </div>
  );
}

export default HeaderComponent;