import "./styles.css";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Form, FormControl, Button } from "react-bootstrap";
import Icon from "../icon/Icon";
import CustomButton from "../button/Button";
import DropdownMenu from "../dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { AppDispatch, RootState } from "../../app/store";
import Cart from "../../modals/Cart";
import AddProduct from "../../modals/Add-product";
import { fetchCategories } from "../../features/categories/categorySlice";
import { useLocation } from "react-router-dom"; // Import useHistory and useLocation



const Header: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  

  const { categories } = useSelector( (state: RootState) => state.categories)
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get("search") || "";
    setSearchQuery(searchParam);
  }, [location.search]);



  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    if (searchQuery.trim() !== "") {
      queryParams.set("search", searchQuery.trim());
    } else {
      queryParams.delete("search");
    }
    navigate(`/products?${queryParams.toString()}`);
  };

  
  const handleCategoryChange = (categoryId: number | null) => {
    setCategoryId(categoryId);
    const queryParams = new URLSearchParams(location.search);
    if (categoryId !== null) {
      queryParams.set("category", categoryId.toString());
    } else {
      queryParams.delete("category");
    }
    navigate(`/products?${queryParams.toString()}`);
  };
  // Reset categoryId to null when navigating to the profile page
  useEffect(() => {
    if (location.pathname === "/profile") {
      setCategoryId(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Update categoryId state when location.search changes
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") || null;
    setCategoryId(category ? parseInt(category) : null);
  }, [location.search]);
  
  
  
  const handleSellNowOnclick = () => {
    !user ? navigate("/login") : setShowAddProductModal(true);
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogoutSelect = () => {
    dispatch(logout());
    navigate("/login");
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
              categoryId === null
                ? "header-catygory-btn-active"
                : "header-catygory-btn"
            }`}
            variant={categoryId === null ? "secondary header-catygory-btn" : "light"}
            onClick={() => handleCategoryChange(null)}
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              className={`mx-1 rounded-1 ${
                categoryId === category.id
                  ? "header-catygory-btn-active"
                  : "header-catygory-btn"
              }`}
              key={"header-category-" + category.id}
              variant={
                categoryId === category.id
                  ? "secondary header-catygory-btn"
                  : "light"
              }
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </ButtonGroup>
        <div className="header-cart-notifications-cont">
          <Cart />
        </div>
      </div>
      {/* Render AddProductModal based on showAddProductModal state */}
    <AddProduct  user={user} show={showAddProductModal} handleClose={() => setShowAddProductModal(false)}  />
    </header>
  );
};

export default Header;


