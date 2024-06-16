import { FC } from "react";
import DropdownMenu from "../components/dropdown/Dropdown";
import { useNavigate } from "react-router-dom";

const Test: FC = () => {
  const navigate = useNavigate();
  const dropdownTestData = [
    {
      id: "1",
      onClick: () => console.log("id 1"),
      content: <div>Item 1</div>,
    },
    {
      id: "2",
      onClick: () => console.log("id 2"),
      content: "Item 2",
    },
    {
      id: "3",
      onClick: () => navigate("/"),
      content: <div>Navigate Home</div>,
    },
  ];

  return (
    <div style={{ padding: "32px" }}>
      <h1>Test page</h1>
      <div style={{ width: "200px" }}>
        <DropdownMenu data={dropdownTestData} title="Test Dropdown" />
      </div>
    </div>
  );
};

export default Test;
