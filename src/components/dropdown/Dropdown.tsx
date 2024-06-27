import { FC, ReactNode, useState } from "react";
import { DropDownMenuProps } from "./types";
import { Dropdown } from "react-bootstrap";
import "./styles.css";

const DropdownMenu: FC<DropDownMenuProps> = ({
  title,
  data,
  variant,
  selector = false,
}) => {
  const [dropdownTitle, setDropdownTitle] = useState<string | ReactNode>(title);
  return (
    <Dropdown className="w-100 h-100">
      <Dropdown.Toggle
        className="w-100"
        variant={variant ? variant : "light"}
        id="dropdown-basic"
      >
        <span className="dropdown-title">{dropdownTitle}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100">
        {data.map(({ id, onClick, content }) => (
          <Dropdown.Item
            key={"dropdown-" + "title-" + id}
            id={id}
            onClick={() => {
              onClick();

              selector && setDropdownTitle(content);
            }}
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
