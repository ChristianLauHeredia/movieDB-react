import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import i18n from "i18next";
import {initReactI18next} from 'react-i18next';
import { saveLang } from "./../../services/local-storage";
import "./styles.scss";

import US_FLAG from "./../../assets/img/us-icon.png";
import MX_FLAG from "./../../assets/img/mx-icon.png";

const HeaderComponent = () => {
  const [isSticky, setSticky] = useState(false);
  const [lang, setLang] = useState('en');

  //Function to show / hide the header if scroll
  const handleScroll = () => {
    // If window Y position > 64 return true
    setSticky(window.pageYOffset > 64);
  };

  useEffect(() => {
    setLang(i18n.language)
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  // Switch Language
  const switchLang = () => {
    const newLang = lang === "es" ? "en" : "es";
    setLang(newLang);
    saveLang(newLang);
    i18n.use(initReactI18next)
        .init({lng: newLang});
  }

  return (
    //If isSticky hide header
    <div className={`header-container${isSticky ? ' sticky' : ''}`} >
      <NavLink to='/'>
        <h1 className="header-text">MOOVIES</h1>
      </NavLink>
      <div className="lang-container" onClick={() => switchLang()}>
        <span id="lang-btn">{lang.toUpperCase()}</span>
        <button className="language-btn" aria-labelledby="lang-btn">
          <img src={lang === "es" ? MX_FLAG : US_FLAG} alt="flag icon" />
        </button>
      </div>
    </div>
  );
}

export default HeaderComponent;