import { FC, useState, ChangeEvent } from "react";
import { Form, Alert } from "react-bootstrap";
import { TextareaProps } from "./types";

const Textarea: FC<TextareaProps> = ({ label, onChange, required = false }) => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    console.log(value);
    setText(value);

    if (required && !value) {
      setError("This field is required.");
    } else {
      setError(null);
    }

    onChange(e);
  };

  const handleOnBlur = () => {
    if (required && !text) {
      setError("This field is required.");
    }
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        value={text}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        rows={3}
        required={required}
        isInvalid={!!error}
      />
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
};

export default Textarea;
