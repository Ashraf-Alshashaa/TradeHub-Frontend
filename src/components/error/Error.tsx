import React from "react";
import "./styles.css";
import CustomImage from "../image/Image";
import errorImage from "../../assets/error.jpg";

const ErrorComponent: React.FC<{ msg: string }> = ({ msg }) => {
  return (
    <div className="error-container">
      <div className="error-img">
        <CustomImage src={errorImage} alt="error img" />
      </div>
      <div className="error-text-container">
        <h3 className="error-msg">Error: {msg}</h3>
      </div>
    </div>
  );
};

export default ErrorComponent;
