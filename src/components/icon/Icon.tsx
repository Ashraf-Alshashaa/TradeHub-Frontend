import { FC } from "react";
import { IconProps } from "./types";
import "./styles.css";

const Icon: FC<IconProps> = ({ name, size, onclick }) => {
  return (
    <span
      className={`material-symbols-outlined 
        ${size == "s" && "icon-s"} 
        ${size == "m" && "icon-m"} 
        ${size == "l" && "icon-l"}
        ${onclick && "icon-pointer"}`}
      onClick={onclick}
    >
      {name}
    </span>
  );
};

export default Icon;
