import React from "react";
import { usePalette } from "react-palette";
import { hexToRGB } from "../../utils";
import "./styles.scss";

const BlurredBackgroundColorComponent = props => {
  const { children, url } = props;
  const { data } = usePalette(url);

  // This component use react palette to set the donimant color of an image 
  return (
    <div className="blurred-background-container" style={{backgroundColor: hexToRGB(data.darkVibrant || "#000000", .8)}}>
      {children}
    </div>
  );
}

export default BlurredBackgroundColorComponent;