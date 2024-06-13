import { FC } from 'react';
import Image from '../components/image/Image'
import ProductCard from '../components/product-card/Product-card';

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
    <div> <Image
      src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
      alt = ""
      width={400}
      height={400}
      className="responsive-image"
    /> </div>
    </div>
  ) 
};

export default Test;