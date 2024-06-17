import React from "react";
import "./image.css";
import { ImageComponentProps } from "./types";
import { Image } from "react-bootstrap";

const CustomImage: React.FC<ImageComponentProps> = ({ src, alt }) => {
  return <Image src={src} alt={alt} fluid className="custom-img" rounded />;
};

export default CustomImage;
