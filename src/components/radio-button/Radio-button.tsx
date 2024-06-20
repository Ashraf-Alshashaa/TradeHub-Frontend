import React from 'react';
import Form from 'react-bootstrap/Form';
import { RadioButtonProps } from './types';
import './radio-button.css'



const RadioButton: React.FC<RadioButtonProps> = ({bidder_name, group_name, bid, onClick}) => {
  const type = 'radio'
    return (
          <div key={`default-${type}`} className="my-2 ml-2">
            <Form.Check
              label= {
              <div className='row'>
              <div className='col mx-1'>{bidder_name}</div>
              <div className='col mx-5'>€{bid}</div>
              </div>
            }
              name={group_name}
              type={type}
              id={`default-${type}-1`}
              onClick={onClick}
            />
          </div>
    );
  }
  
  export default RadioButton;