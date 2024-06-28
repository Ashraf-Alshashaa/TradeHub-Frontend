import React, { FC, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import TextInput from "../components/text-input/Text-input";
import Textarea from "../components/textarea/Textarea.tsx";
import CustomImage from "../components/image/Image";
import DropdownMenu from "../components/dropdown/Dropdown";
import CustomButton from "../components/button/Button";
import ProductCard from "../components/product-card/Product-card";
import RadioButton from "../components/radio-button/Radio-button.tsx";
import FilterBy from "../components/filter-by/Filter-by";

import { useNavigate } from "react-router-dom";

interface Product {
  image: string;
  name: string;
  price: number;
  onClick: () => void;
}

const Test: FC = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const [text, setText] = useState("");
  const handleTextChange = (value: string) => {
    setText(value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };


  const handlePrimaryClick = () => {
    alert("Primary Button Clicked!");
  };

  const handleSecondaryClick = () => {
    alert("Secondary Button Clicked!");
  };

  const [price, setPrice] = useState<number>();
  const handleInputPriceChange = (value: number) => {
    setPrice(value);
  };



  const navigate = useNavigate();

  const dropdownTestData = [
    {
      id: "1",
      onClick: () => alert("You chose the first item"),
      content: <div>Item 1</div>,
    },
    {
      id: "2",
      onClick: () => alert("You chose the second item"),
      content: "Item 2",
    },
    {
      id: "3",
      onClick: () => navigate("/"),
      content: <div>Navigate Home</div>,
    },
  ];

  const selctorDropdownTestData = [
    {
      id: "1",
      onClick: () => alert("You chose the first item"),
      content: <div>Item 1</div>,
    },
    {
      id: "2",
      onClick: () => alert("You chose the second item"),
      content: "Item 2",
    },
  ];

  const categories = ["Electronics", "Furniture", "Toys", "Clothes"];

  const product: Product = {
    image:
      "https://cdn.pixabay.com/photo/2019/12/29/08/37/women-4726513_640.jpg",
    name: "Product name",
    price: 25.99,
    onClick: () => alert("Card clicked"),
  };

  const cardClicked = () => {
    alert("Card Clicked");
  };

  const bidders = [
    ["user1", "12.4"],
    ["user2", "11.0"],
    ["user3", "10.5"],
  ];

  const chooseWinnerHandle = () => {
    console.log("Choosing the bid");
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h1>Test Page</h1>
        <div className="row">
          <div className="col-md-6">
            {/* <FilterBy
              onPriceChange={(min, max) => console.log(`Price range: ${min}-${max}`)}
              categories={categories}
            /> */}
        <div className="col-6">
          <FilterBy onPriceChange={handlePriceChange} categories={categories} />
        </div>
        <div className="col-6">
          <div className="row my-4">
            <TextInput
              label="Email"
              value={email}
              onChange={handleEmailChange}
              type="email"
              required={true}
            />
            <TextInput
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              required={true}
            />
            <TextInput
              label="Price"
              value={price}
              onChange={handleInputPriceChange}
              type="price"
              required={true}
            />
             <TextInput
              label="Text"
              value={text}
              onChange={handleTextChange}
              type="text"
              required={true}
            />
            <Textarea
              label="Text"
              required={true}
              onChange={(e) => console.log(e.target.value)}
            />

          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
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
                <Textarea
                  label="Text"
                  required={true}
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              </div>
              <div className="row">
              <div className="col-md-12">
                <CustomImage
                  src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                  alt="Sample Image"
                />
              </div>
            </div>
            <div className="row mt-4">
              <DropdownMenu
                data={selctorDropdownTestData}
                title="Selector Dropdown"
                selector={true}
              />
              <DropdownMenu data={dropdownTestData} title="Test Dropdown" />
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <ProductCard
                  photo={
                    "https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
                  }
                  name="Hair Oil"
                  price={11.4}
                  location="Nijmegen"
                  onClick={cardClicked}
                />
              </div>
              <div className="col-md-6">
                {bidders.map(([bidder_name, bid]) => (
                  <RadioButton
                    key={bidder_name}
                    bidder_name={bidder_name}
                    group_name="group1"
                    bid={parseFloat(bid)}
                    onClick={chooseWinnerHandle}
                  />
                ))}
              </div>
            </div>
            <div className="row mt-4">
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
          </div>
        </div>
      </div>
      <Footer
        githubUrl="https://github.com/yourprofile"
        email="your.email@example.com"
      />
    </div>
  );
};

export default Test;
