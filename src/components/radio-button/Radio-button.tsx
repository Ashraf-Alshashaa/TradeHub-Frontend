import React from 'react';
import Form from 'react-bootstrap/Form';
import { RadioButtonProps } from './types';
import './radio-button.css';

const RadioButton: React.FC<RadioButtonProps> = ({ bidder_name, group_name, bid, onClick }) => {
  const type = 'radio';
  const id = `default-${type}-${bidder_name}-${bid}`;

  return (
    <div key={`default-${type}`} className="my-2 ml-2">
      <Form.Check 
        type={type}
        id={id}
      >
        <Form.Check.Input 
          type={type}
          name={group_name}
          id={id}
          onClick={onClick}
        />
        <Form.Check.Label htmlFor={id} className="radio-label">
          <div className='row'>
            <div className='col mx-1'>{bidder_name}</div>
            <div className='col mx-5'>€{bid}</div>
          </div>
        </Form.Check.Label>
      </Form.Check>
    </div>
  );
}

export default RadioButton;
