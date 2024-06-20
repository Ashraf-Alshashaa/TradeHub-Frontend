import React from 'react';
import Form from 'react-bootstrap/Form';
import { RadioButtonProps } from './types';
import './radio-button.css'



const RadioButton: React.FC<RadioButtonProps> = ({bidder_name, group_name, bid}) => {
  const type = 'radio'
    return (
      <Form>
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
            />
          </div>
      </Form>
    );
  }
  
  export default RadioButton;