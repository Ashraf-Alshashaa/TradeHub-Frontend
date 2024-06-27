import React, { useState, useEffect } from 'react';
import { TextInputProps } from './types';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, type = 'text', className, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // State to track validation errors
  const [emailError, setEmailError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value;
  
    if (type === 'email') {
      onChange(inputValue);
      if (inputValue.trim() !== '') {
        validateEmail(inputValue);
      } else {
        setEmailError(null);
      }
    } else if (type === 'password') {
      onChange(inputValue);
      setTouched(true); // Set touched immediately for real-time error display
  
      if (required && inputValue.trim() === '') {
        setError(`${label} is required`);
      } else {
        setError(null);
      }
    } else if (type === 'price') {
      const numericValue = inputValue.replace(/[^0-9.]/g, '');
  
      if (numericValue === '') {
        onChange(''); // Update parent component with empty string if input is empty
        setError(required ? `${label} is required` : null);
      } else {
        const parsedValue = parseFloat(numericValue);
  
        if (isNaN(parsedValue)) {
          onChange(''); // Update parent component with empty string if parsedValue is NaN
          setError('Please enter a valid number');
        } else {
          onChange(parsedValue); // Update parent component with parsed numeric value
          setError(null);
        }
      }
    } else {
      onChange(inputValue);
  
      if (required && inputValue.trim() === '') {
        setError(`${label} is required`);
      } else {
        setError(null);
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);

    if (type === 'password') {
      const trimmedValue = typeof value === 'string' ? value.trim() : '';

      if (required && trimmedValue === '') {
        setError(`${label} is required`);
      } else {
        setError(null);
      }
    } else {
      if (required && (value === '' || value === 0 || isNaN(Number(value)))) {
        setError(`${label} is required`);
      } else {
        setError(null);
      }
    }
  };

  useEffect(() => {
    if (touched && required && (value === '' || value === 0 || isNaN(Number(value)))) {
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
            value={value as string}
            onChange={handleChange}
            placeholder={label}
            required={required}
            isInvalid={!!error}
            onBlur={handleBlur}
          />
          <Button variant="outline-success" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </InputGroup>
      ) : (
        <InputGroup>
          {type === 'price' && (
            <InputGroup.Text>€</InputGroup.Text>
          )}
          <Form.Control
            type={type === 'price' ? 'text' : type}
            value={type === 'price' ? (value !== undefined && value !== null ? value.toString() : '') : value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={label}
            required={required}
            isInvalid={!!error}
            inputMode={type === 'price' ? 'decimal' : undefined}
            pattern={type === 'price' ? '[0-9]*' : undefined}
          />
        </InputGroup>
      )}
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
