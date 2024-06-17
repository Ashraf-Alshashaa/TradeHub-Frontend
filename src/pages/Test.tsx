import { FC } from "react";
import ProductCard from "../components/product-card/Product-card";
import CustomImage from "../components/image/Image";

const Test: FC = () => {
  return (
    <div>
      <h1>Test Page</h1>
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
    </div>
  );
};

export default Test;
