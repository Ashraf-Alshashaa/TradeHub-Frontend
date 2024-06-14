import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { RadioButtonProps } from './types';
import './radio-button.css'

const RadioButton: React.FC<RadioButtonProps> = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleOptionChange = () => {
    setIsSelected(true);
  };

  return (
    <Form>
      <Form.Check
        type="radio"
        id="test"
        label='option'
        checked={isSelected}
        onChange={handleOptionChange}
        className = "custom-radio"
      />
    </Form>
  );
};

export default RadioButton;
