import React, { useState, useEffect } from "react";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { TextInputProps } from "./types";

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  className,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // State to track validation errors
  const [emailError, setEmailError] = useState<string | null>(null); // State to track email validation error
  const [touched, setTouched] = useState(false); // State to track if input has been touched (blurred)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(null);
    }
  };

  const validateHouseNumber = (houseNumber: string) => {
    const regex = /^\d+$/;
    if (!regex.test(houseNumber)) {
      setError("Please enter a valid house number");
    } else {
      setError(null);
    }
  };

  const validatePostcode = (postcode: string) => {
    const regex = /^[0-9]{4}[a-zA-z]{2}$/;
    if (!regex.test(postcode)) {
      setError("Please enter a valid postcode");
    } else {
      setError(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value;
    onChange(inputValue);

    setTouched(true);

    if (type === "email") {
      if (inputValue.trim() !== "") {
        validateEmail(inputValue);
      } else {
        setEmailError(null);
      }
    } else if (type === "price") {
      if (!/^\d*\.?\d*$/.test(inputValue)) {
        setError("Only numeric values are allowed");
      } else {
        setError(null);
      }
    } else if (type === "housenumber") {
      validateHouseNumber(inputValue);
    } else if (type === "postcode") {
      validatePostcode(inputValue);
    } else {
      if (required && inputValue.trim() === "") {
        setError(`${label} is required`);
      } else {
        setError(null);
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);

    if (required && `${value}`.trim() === "") {
      setError(`${label} is required`);
    } else if (type === "price" && `${value}`.trim() !== "") {
      if (!/^\d*\.?\d*$/.test(`${value}`)) {
        setError("Only numeric values are allowed");
      } else {
        setError(null);
      }
    } else if (type === "housenumber") {
      validateHouseNumber(`${value}`);
    } else if (type === "postcode") {
      validatePostcode(`${value}`);
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    if (touched && required && `${value}`.trim() === "") {
      setError(`${label} is required`);
    } else if (type === "price" && `${value}`.trim() !== "") {
      if (!/^\d*\.?\d*$/.test(`${value}`)) {
        setError("Only numeric values are allowed");
      } else {
        setError(null);
      }
    }
  }, [required, touched, type]);

  useEffect(() => {
    if (type === "housenumber") {
      validateHouseNumber(`${value}`);
    } else if (type === "postcode") {
      validatePostcode(`${value}`);
    } else {
      setError(null);
    }
  }, [value, label]);

  return (
    <Form.Group controlId={`formBasic${label}`} className={className}>
      {label && <Form.Label>{label}</Form.Label>}
      {type === "password" ? (
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            value={value as string}
            onChange={handleChange}
            placeholder={label}
            required={required}
            isInvalid={!!error && touched} // Only show invalid state if touched
            onBlur={handleBlur}
          />
          <Button variant="outline-success" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputGroup>
      ) : (
        <InputGroup>
          {type === "price" && <InputGroup.Text>€</InputGroup.Text>}
          <Form.Control
            type={type === "price" ? "number" : type}
            value={value as string}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={label}
            required={required}
            isInvalid={!!error && touched} // Only show invalid state if touched
          />
        </InputGroup>
      )}
      {type === "email" && emailError && touched && (
        <Alert variant="danger">{emailError}</Alert>
      )}
      {error && touched && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
};

export default TextInput;
