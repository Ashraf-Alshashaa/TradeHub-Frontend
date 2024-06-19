import { FC, useState } from "react";
import TextInput from "../components/text-input/Text-input";
import FilterBy from "../components/filter-by/Filter-by";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/footer/Footer";
import DropdownMenu from "../components/dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/button/Button";
import ProductCard from "../components/product-card/Product-card";
import CustomImage from "../components/image/Image";
import Header from "../components/header/Header";

const Test: FC = () => {
  const handlePrimaryClick = () => {
    alert("Primary Button Clicked!");
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSecondaryClick = () => {
    alert("Secondary Button Clicked!");
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
    console.log("Price range changed:", value);
  };

  const categories = ["Electronics", "Furniture", "Toys", "Clothes"];

  return (
    <div>
      <Header />
      <div className='row'>
      <h1>Test Page</h1>
      <div className='col-6'>
        <FilterBy onPriceChange={handlePriceChange} categories={categories} />
      </div>
      <div className='col-6'>
        <div className='row my-4'> 
      <TextInput
        label="Email"
        value={email}
        onChange={handleEmailChange}
        type="email"
      />
      <TextInput
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        type="password"
      />
      </div>
      <div className='row my-4'>
        <CustomImage
          src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
          alt="Sample Image"
        />
      </div>
      <div className='row my-4' style={{ width: "200px" }}>
        <DropdownMenu data={dropdownTestData} title="Test Dropdown" />
      </div>
      <div  className='row my-4' style={{ width: "16rem", height: "18rem" }}>
        <ProductCard
          photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
          name="Hair Oil"
          price={11.4}
          location="Nijmegen"
        />
      </div>
      <div className='row my-4'>
        <CustomButton
          text="Primary Button"
          onClick={handlePrimaryClick}
          buttonType="primary"
        />
        <CustomButton
          text="Secondary Button"
          onClick={handleSecondaryClick}
          buttonType="secondary"
        />
      </div>
    </div></div>
    <Footer
          githubUrl="https://github.com/yourprofile"
          email="your.email@example.com"
        />
    </div>
  );
};

export default Test;
