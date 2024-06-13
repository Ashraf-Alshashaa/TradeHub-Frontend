import { FC } from 'react';
import Image from '../components/image/Image'

const Test: FC = () => {
  return(
    <div>
    <h1>Test Page</h1>
    <Image
      src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
      alt = ""
      width={400}
      height={400}
      className="responsive-image"
    />
    </div>
  ) 
};

export default Test;