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
    <div className="App">
      <h1>Custom Buttons with React Bootstrap</h1>
      <CustomButton text="Primary Button" onClick={handlePrimaryClick} buttonType="primary" />
      <CustomButton text="Secondary Button" onClick={handleSecondaryClick} buttonType="secondary" />
    </div>
  );
};

export default Test