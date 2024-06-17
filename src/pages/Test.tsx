import { FC } from 'react';
import FilterBy from '../components/filter-by/Filter-by.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import DropdownMenu from "../components/dropdown/Dropdown";
import { useNavigate } from "react-router-dom";


import {FC} from "react"
import CustomButton from '../components/button/Button.tsx';
import ProductCard from "../components/product-card/Product-card";
import CustomImage from "../components/image/Image";

const Test: FC = () => {
   const handlePrimaryClick = () => {
    alert('Primary Button Clicked!');
  };

  const handleSecondaryClick = () => {
    alert('Secondary Button Clicked!');
  };
  
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
  
  const handlePriceChange = (value: [number, number]) => {
    console.log('Price range changed:', value);
  
  const categories = ['Electronics', 'Furniture', 'Toys', 'Clothes']; 
        
  return (
    <div>
      <h1>Test Page</h1>
       <div style={{ width: "200px" }}>
        <DropdownMenu data={dropdownTestData} title="Test Dropdown" />
      </div>
      <div style={{ width: "16rem", height: "18rem" }}>
        <ProductCard
          photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
          name="Hair Oil"
          price={11.4}
          location="Nijmegen"
        />
      </div>
      <CustomImage
        src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
        alt=""
      />
      <h1>Test Page</h1>
      <CustomButton text="Primary Button" onClick={handlePrimaryClick} buttonType="primary" />
      <br></br>
      <br></br>
      <CustomButton text="Secondary Button" onClick={handleSecondaryClick} buttonType="secondary" />
      <Footer githubUrl="https://github.com/yourprofile" email="your.email@example.com" />
      
      <br></br>
      <FilterBy onPriceChange={handlePriceChange} categories={categories} />
    </div>
  );
};

export default Test
  
