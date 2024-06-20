import "./styles.css";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Form, FormControl, Button } from "react-bootstrap";
import Icon from "../icon/Icon";
import { Category } from "./types";
import CustomButton from "../button/Button";
import DropdownMenu from "../dropdown/Dropdown";

const Header: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useNavigate();

  const user = {
    username: "Ashraf",
  };

  useEffect(() => {
    setCategories([
      { id: 1, name: "Electronics" },
      { id: 2, name: "Furniture" },
      { id: 3, name: "Clothing" },
      { id: 4, name: "Auto and Parts" },
      { id: 5, name: "Electronics" },
      { id: 6, name: "Furniture" },
      { id: 7, name: "Clothing" },
      { id: 8, name: "Auto and Parts" },
    ]);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(searchQuery);
  };

  const handleSellNowOnclick = () => {
    !user ? navigate("/login") : alert("Sell Now clicked");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogoutSelect = (srt: string) => {
    alert(srt);
  };

  const handleCategorySelect = (categoryId: number) => {
    console.log(categoryId);
    setActiveCategory(categoryId);
  };

  const handleNotifications = () => {
    !user ? navigate("/login") : alert("notifications clicked");
  };

  const handleShoppingCart = () => {
    !user ? navigate("/login") : alert("shopping cart clicked");
  };

  const nav = [
    {
      id: "1",
      onClick: () => navigate("/profile"),
      content: (
        <div className="header-dropdown-item">
          <Icon name="person" />
          <span className="header-dropdown-item-text">My Profile</span>
        </div>
      ),
    },
    {
      id: "3",
      onClick: () => handleLogoutSelect("loged out"),
      content: (
        <div className="header-dropdown-item">
          <Icon name="logout" />
          <span className="header-dropdown-item-text">Logout</span>
        </div>
      ),
    },
  ];

  return (
    <header className="header">
      <div className="header-top-container">
        <h1>Trade Hub</h1>
        <div className="header-search-container">
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <FormControl
              type="text"
              placeholder="Search products..."
              className="me-1"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <CustomButton
              text={<Icon name="search" />}
              type="submit"
              buttonType="secondary"
              onClick={() => console.log("")}
            />
          </Form>
        </div>
        <div className="header-sell-now-btn-container">
          <CustomButton
            text="Sell Now"
            onClick={handleSellNowOnclick}
            buttonType="primary"
          />
        </div>
        {user?.username ? (
          <div className="profile-select">
            <DropdownMenu title={`Hi, ${user.username}`} data={nav} />
          </div>
        ) : (
          <CustomButton
            text="Login"
            buttonType="primary"
            onClick={handleLogin}
          />
        )}
      </div>
      <div className="header-bottom-container">
        <ButtonGroup className="px-1 py-2 bg-light rounded-1 asd">
          {categories.map((category) => (
            <Button
              className={`mx-1 rounded-1 ${
                activeCategory === category.id
                  ? "header-catygory-btn-active"
                  : "header-catygory-btn"
              }`}
              key={"header-category-" + category.id}
              variant={
                activeCategory === category.id
                  ? "secondary header-catygory-btn"
                  : "light"
              }
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </ButtonGroup>
        <div className="header-cart-notifications-cont">
          <Icon name="notifications" onclick={handleNotifications} />
          <Icon name="shopping_cart" onclick={handleShoppingCart} />
        </div>
      </div>
    </header>
  );
};

export default Header;
