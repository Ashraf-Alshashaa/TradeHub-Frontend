import { FC } from 'react';
import ProductCard from '../components/product-card/Product-card';
import CustomImage from '../components/image/Image';

const Test: FC = () => {  
  return(
    <div>
    <h1>Test Page</h1>
    <div className="product-list">
          <ProductCard
            photo= {{
                  src : "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
                  alt : "Product1",
            }}
            name='Camera'
            price={11.40}
            location='Nijmegen'
          />
      </div>
    <CustomImage
      src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
      alt = ""
      width={300}
      height={300}
    />
    </div>
  ) 
};

export default Test;