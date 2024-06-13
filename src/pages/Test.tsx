import {FC} from "react"
import { useState } from "react"
import TextInput from "../components/text-input/Text-input"


const Test:FC = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };
    return(
    <div>
      <h1>Test Page</h1>
      <br></br>
      <TextInput
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter something..."
        className="my-custom-input" // Additional class if needed
      />
      <br></br>
      <br></br>
      <p>Input value: {inputValue}</p>
    </div>
    )
}

export default Test