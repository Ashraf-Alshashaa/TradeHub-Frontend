import { FC, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store.ts";
import { fetchProductById } from "../features/products/productsSlice.ts";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import TextInput from "../components/text-input/Text-input";
import Textarea from "../components/textarea/Textarea.tsx";
import CustomButton from "../components/button/Button";
import RadioButton from "../components/radio-button/Radio-button.tsx";
import FilterBy from "../components/filter-by/Filter-by";
import AddProduct from "../modals/Add-product.tsx";
import EditProfile from "../modals/Edit-profile.tsx";
import EditProduct from "../modals/Edit-product.tsx";
import { Product } from "../components/product-listing/types";
import Notification from "../toasts/Notification.tsx";
import CloudinaryUploadWidget from "../components/cloudinary-upload-widget/CloudinaryUploadWidget";

const Test: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleUpload = (url: string) => {
    alert(url);
  };

  useEffect(() => {
    dispatch(fetchProductById(1));
  }, [dispatch]);

  const { product: existingData } = useSelector(
    (state: RootState) => state.products
  );

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

  const [price, setPrice] = useState<number | undefined>();
  const handleInputPriceChange = (value: number) => {
    setPrice(value);
  };

  const handlePrimaryClick = () => {
    alert("Primary Button Clicked!");
  };

  const handleSecondaryClick = () => {
    alert("Secondary Button Clicked!");
  };

  const categories = ["Electronics", "Furniture", "Toys", "Clothes"];

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
        <Notification/>
        <div className="col-6"></div>
        <div className="col-6">
          <CloudinaryUploadWidget onUpload={handleUpload} />
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
              value={price ? price.toString() : ""}
              onChange={(e) => handleInputPriceChange(parseFloat(e))}
              type="number"
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
          <div className="row my-4">
            <AddProduct />
          </div>
          <div className="row my-4">
            <EditProfile />
          </div>
          <div className="row my-4">
            {existingData && <EditProduct existingData={existingData} />}
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
