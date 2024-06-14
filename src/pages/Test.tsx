import {FC} from "react"
import CustomButton from '../components/button/Button.tsx';


const Test:FC = () => {
    const handleClick = () => {
        alert('Button clicked!');
      };
    return(
    <div>
      <h1>Test Page</h1>
      <br></br>
      <CustomButton text="Primary Button" onClick={handleClick} variant="primary" />
      <CustomButton text="Secondary Button" onClick={handleClick} variant="secondary" className="custom-class" />
    </div>
    )
}

export default Test