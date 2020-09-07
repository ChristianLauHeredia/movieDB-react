import React from "react";
import { useTranslation } from 'react-i18next';
import "./styles.scss";

const NotFoundScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="page-not-found-container">
      <h2><span>404</span>{t('404.404-message')}</h2>
    </div>
  );
}

export default NotFoundScreen;