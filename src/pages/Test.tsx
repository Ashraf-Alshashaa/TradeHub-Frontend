import {FC} from "react"
import CustomButton from '../components/button/Button.tsx';



const Test:FC = () => {
  const handlePrimaryClick = () => {
    alert('Primary Button Clicked!');
  };

  const handleSecondaryClick = () => {
    alert('Secondary Button Clicked!');
  };

  return (
    <div className="Test">
      <h1>Test Page</h1>
      <CustomButton text="Primary Button" onClick={handlePrimaryClick} buttonType="primary" />
      <br></br>
      <br></br>
      <CustomButton text="Secondary Button" onClick={handleSecondaryClick} buttonType="secondary" />
    </div>
  );
};

export default Test