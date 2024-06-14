import React, { useEffect, useState } from 'react';
import {Category} from "./types"
import { ButtonGroup, Form, FormControl, Button, Dropdown } from 'react-bootstrap';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(
      [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Furniture' },
        { id: 3, name: 'Clothing' },
        { id: 4, name: 'Auto and Parts' },
        { id: 5, name: 'Electronics' },
        { id: 6, name: 'Furniture' },
        { id: 7, name: 'Clothing' },
        { id: 8, name: 'Auto and Parts' },
      ]
    )
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(searchQuery)
  };

  const handleSellNowOnclick = () => {
    console.log("Sell Now clicked");
  }

  const handleProfileSelect = (srt: string) => {
    console.log(srt);
  }

  const handleCategorySelect = (categoryId: number) => {
    console.log(categoryId);
    setActiveCategory(categoryId);
  };

  return (
    <header className="header">
      <div className='header-top-container'> 
        <h1>Trade Hub</h1>
        <Form onSubmit={handleSearchSubmit}>
          <FormControl
            type="text"
            placeholder="Search products..."
            className="mr-sm-2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>
        <Button variant="success" onClick={handleSellNowOnclick}>Sell Now</Button>
        <div className="profile-select">
          <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Hi, user 
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleProfileSelect('myProfile')}>My Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => handleProfileSelect('logout')}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
      </div>
      <div className="header-bottom-container">
        <ButtonGroup className="mr-2">
          {categories.map(category => (
            <Button
              key={"header-category-" + category.id}
              variant={activeCategory === category.id ? 'secondary' : 'light'}
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </ButtonGroup>
        <div className="header-cart-notifications-cont">
          <span className="material-symbols-sharp">
            notifications
          </span>
          <span className="material-symbols-sharp">
            shopping_cart
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;