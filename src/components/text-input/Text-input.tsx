import React, { useState, useEffect } from 'react';
import { TextInputProps } from './types';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, type = 'text', className, required=false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // State to track validation errors
  const [emailError, setEmailError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);

    // Validate email format if type is 'email' and value is not empty
    if (type === 'email' && event.target.value.trim() !== '') {
      validateEmail(event.target.value);
    } else {
      setEmailError(null); // Clear email error if value is empty
    }

  // Validate required fields
  if (required && !event.target.value) {
    setError(`${label} is required`);
  } else {
    setError(null);
  }
};

const handleBlur = () => {
  setTouched(true);
  if (required && !value) {
    setError(`${label} is required`);
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

  useEffect(() => {
    // Validate required fields on initial render and on value change
    if (touched && required && !value) {
      setError(`${label} is required`);
    } else {
      setError(null);
    }
  }, [value, label, required, touched]);

  return (
    <Form.Group controlId={`formBasic${label}`} className={className}>
      <Form.Label>{label}</Form.Label>
      {type === 'password' ? (
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={handleChange}
            placeholder={label}
            required={required}
            isInvalid={!!error} // Mark input as invalid if there's an email error
            onBlur={handleBlur}
          />
          <Button variant="outline-success" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </InputGroup>
      ) : (
        <Form.Control
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={label}
          isInvalid={!!error} // Mark input as invalid if there's an email error
          required={required} // Pass the required prop
          onBlur={handleBlur}
        />
      )}
      {/* Show specific error messages */}
      {type === 'email' && required && !value && touched && (
        <Alert variant="danger">Email is required</Alert>
      )}
      {type === 'email' && emailError && touched && (
        <Alert variant="danger">{emailError}</Alert>
      )}
      {error && touched && type !== 'email' && (
        <Alert variant="danger">{error}</Alert>
      )}
    </Form.Group>
    
  );
};

export default TextInput;