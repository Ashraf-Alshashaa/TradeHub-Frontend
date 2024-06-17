import { FC } from "react";
import { DropDownMenuProps } from "./types";
import { Dropdown } from "react-bootstrap";
import "./styles.css";

const DropdownMenu: FC<DropDownMenuProps> = ({ title, data, variant }) => {
  return (
    <Dropdown className="w-100 h-100">
      <Dropdown.Toggle
        className="w-100"
        variant={variant ? variant : "light"}
        id="dropdown-basic"
      >
        <span className="dropdown-title">{title}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100">
        {data.map(({ id, onClick, content }) => (
          <Dropdown.Item
            key={"dropdown-" + "title-" + id}
            id={id}
            onClick={onClick}
            className="dropdown-item"
          >
            {content}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
