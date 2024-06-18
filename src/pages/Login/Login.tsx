import TextInput from "../../components/text-input/Text-input"
import CustomButton from "../../components/button/Button";
import React from 'react';
import { useState } from "react";
import LoginImage from '../../assets/login.png'
import './login.css'

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (value: string) => {
    setName(value);
  };


  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleLoginClick = () => {
    alert('??');
  };


  return (
  <div className="container">
    <div className="row">
      <div className="col-md-6 mt-auto">
        <img src={LoginImage} alt="Image" className="img-fluid" />
      </div>
      <div className="col-md-6 d-flex flex-column align-items-center justify-content-center login-form">
        <div className="mb-1 text-input-container">
          <TextInput label="Username" value={name} onChange={handleNameChange} />
        </div>
        <div className="mb-4 text-input-container">
          <TextInput label="Password" value={password} onChange={handlePasswordChange} type="password" />
        </div>
        <div className="mb-4">
          <CustomButton text="Login" onClick={handleLoginClick} buttonType="primary" />
        </div>
        <div className="mb-4">
          Don't have an account yet? <a href="/register">Register here!</a>
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;