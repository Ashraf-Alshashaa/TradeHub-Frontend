import React, { useState } from "react";
import { TextInputProps } from "./types";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null); // State to track email format error

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value;

    // Validate email format if type is 'email'
    if (type === "email") {
      onChange(inputValue);
      validateEmail(inputValue);
    } else if (type === "price") {
      // Remove non-numeric characters from input value
      const numericValue = inputValue.replace(/[^0-9.]/g, "");

      // Update parent component with numeric value (could be float or empty string)
      onChange(numericValue !== "" ? parseFloat(numericValue) : "");
    } else {
      onChange(inputValue);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(null);
    }
  };

  return (
    <Form.Group controlId={`formBasic${label}`} className={className}>
      {label && <Form.Label>{label}</Form.Label>}
      {type === "password" ? (
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            value={(value as string) || ""}
            onChange={handleChange}
            placeholder={label}
          />
          <Button variant="outline-success" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputGroup>
      ) : (
        <InputGroup>
          {type === "price" && <InputGroup.Text>€</InputGroup.Text>}
          <Form.Control
            type={type === "price" ? "text" : type}
            value={
              type === "price"
                ? value !== undefined && value !== null
                  ? value.toString()
                  : ""
                : value
            }
            onChange={handleChange}
            placeholder={label}
            isInvalid={type === "email" && !!emailError}
            inputMode={type === "price" ? "decimal" : undefined}
            pattern={type === "price" ? "[0-9]*" : undefined}
          />
        </InputGroup>
      )}
      {type === "email" && emailError && (
        <Alert variant="danger">{emailError}</Alert>
      )}
    </Form.Group>
  );
};

export default TextInput;
