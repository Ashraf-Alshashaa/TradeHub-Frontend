import React, { useState } from 'react';
import { TextInputProps } from './types';
import { Form, Button , Alert} from 'react-bootstrap';

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, type = 'text', className }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null); // State to track email format error

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);

    // Validate email format if type is 'email'
    if (type === 'email') {
      validateEmail(event.target.value);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError(null);
    }
  };

  return (
    <Form.Group controlId={`formBasic${label}`} className={className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type === 'password' && showPassword ? 'text' : type}
        value={value}
        onChange={handleChange}
        placeholder={label}
        isInvalid={type === 'email' && !!emailError} // Mark input as invalid if there's an email error
      />
      {type === 'email' && emailError && (
        <Alert variant="danger">{emailError}</Alert>
      )}
      {type === 'password' && (
        <Form.Text>
          <br></br>
          <Button variant="outline-success" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default TextInput;