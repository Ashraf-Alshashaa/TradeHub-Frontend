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
import RadioButton from "../components/radio-button/Radio-button.tsx";
import EditProduct from "../modals/Add-product.tsx";
import Textarea from "../components/textarea/Textarea.tsx";

const Test: FC = () => {
  const handlePrimaryClick = () => {
    alert("Primary Button Clicked!");
  };

  const handleSecondaryClick = () => {
    alert("Secondary Button Clicked!");
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (value: string) => {
    setPassword(value);
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

  const handlePriceChange = (value: [number, number]) => {
    console.log("Price range changed:", value);
  };

  const categories = ["Electronics", "Furniture", "Toys", "Clothes"];

  const cardClicked = () => alert("Card Clicked");

  const bidders = [
    ["user1", "12.4"],
    ["user2", "11.0"],
    ["user3", "10.5"],
  ];
  const chooseWinnerHandle = () => console.log("choosing the bid");

  return (
    <div>
      <Header />
      <div className="row">
        <h1>Test Page</h1>
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
          <div className="row my-4">
            <CustomImage
              src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
              alt="Sample Image"
            />
          </div>
          <div className="row my-4" style={{ width: "200px" }}>
            <DropdownMenu data={dropdownTestData} title="Test Dropdown" />
          </div>
          <div className="row my-4">
            <div className="col-6">
              <ProductCard
                photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
                name="Hair Oil"
                price={11.4}
                location="Nijmegen"
                onClick={cardClicked}
              />
            </div>
            <div className="col-6">
              {bidders.map(([bidder_name, bid]) => (
                <RadioButton
                  key={bidder_name}
                  bidder_name={bidder_name}
                  group_name="group1"
                  bid={bid}
                  onClick={chooseWinnerHandle}
                />
              ))}
            </div>
          </div>
          <div className="row my-4">
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
            <EditProduct/>
          </div>
        </div>
      </div>
      <Footer
        githubUrl="https://github.com/Ashraf-Alshashaa/TradeHub-Frontend"
        email="your.email@example.com"
      />
    </div>
  );
};

export default Test;
