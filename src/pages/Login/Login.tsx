import TextInput from "../../components/text-input/Text-input"
import CustomButton from "../../components/button/Button";
import React from 'react';
import { useState } from "react";
import LoginImage from '../../assets/login.png'
import './login.css'

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; password?: string; form?: string }>({});

  const handleNameChange = (value: string) => {
    setName(value);
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, name: undefined }));
    }
  };


  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
    }
  };

;
const handleLoginClick = (event: React.FormEvent) => {
  event.preventDefault();
  const newErrors: { name?: string; password?: string } = {};
  if (!name) newErrors.name = "Username is required";
  if (!password) newErrors.password = "Password is required";
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  
  alert('Form submitted');
  // Add your form submission logic here
};

return (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-7 mt-auto text-center">
        <img src={LoginImage} alt="Login" className="img-fluid" />
      </div>
      <div className="col-md-5 d-flex flex-column align-items-center justify-content-center login-form">
        <form onSubmit={handleLoginClick} className="w-100">
          <div className="mb-3 text-input-container ">
            <TextInput label="Username" value={name} onChange={handleNameChange} />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="mb-3 text-input-container">
            <TextInput label="Password" value={password} onChange={handlePasswordChange} type="password" />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>
          <div className="mb-3 text-center">
            <CustomButton text="Login" buttonType="primary" onClick={handleLoginClick} />
          </div>
          {errors.form && <div className="text-danger text-center">{errors.form}</div>}
          <div className="mt-5 text-center">
            Don't have an account yet? <a href="/register">Register here!</a>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default Login;