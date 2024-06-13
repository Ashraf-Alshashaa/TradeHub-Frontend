import {FC} from "react"
import Button from '../components/button/Button.tsx';


const Test:FC = () => {
    const handleClick = () => {
        alert('Button clicked!');
      };
    return(
    <div>
      <h1>Test Page</h1>
      <br></br>
      <Button text="Primary Button" onClick={handleClick} variant="primary" /> &nbsp;
      <Button text="Secondary Button" onClick={handleClick} variant="secondary" />
    </div>
    )
}

export default Test