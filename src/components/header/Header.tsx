import "./styles.css";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Form, FormControl, Button } from "react-bootstrap";
import Icon from "../icon/Icon";
import { Category , HeaderProps} from "./types";
import CustomButton from "../button/Button";
import DropdownMenu from "../dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { AppDispatch, RootState } from "../../app/store";
import { fetchCategories } from "../../features/categories/categorySlice";


const Header: FC<HeaderProps> = ({onSearchSubmit}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const {products,  loading, error } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();

  const { categories } = useSelector( (state: RootState) => state.categories)

  // useEffect(() => {
  //   dispatch(fetchCategories())
  // }, [dispatch]);



  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value); // Check what event object is received
    const searchQuery = event.target.value.toString() // Ensure event.target is defined
    setSearchQuery(searchQuery);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission
    onSearchSubmit(searchQuery.trim()); // Call parent component's search submit handler
  };

  
  const handleSellNowOnclick = () => {
    !user ? navigate("/login") : alert("Sell Now clicked");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogoutSelect = () => {
    dispatch(logout());
    navigate("/login");
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
      onClick: () => handleLogoutSelect(),
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
          <Form className="d-flex" onSubmit={handleSubmit}>
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
              onClick={handleSubmit}
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
        <Button
            className={`mx-1 rounded-1 ${
              activeCategory === null
                ? "header-catygory-btn-active"
                : "header-catygory-btn"
            }`}
            variant="outline-success"
            onClick={() => handleCategorySelect(null)}
          >
            All Products
          </Button>
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
