import { FC } from 'react';
import CustomImage from '../components/image/Image';

const Test: FC = () => {
  return(
    <div>
    <h1>Test Page</h1>
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