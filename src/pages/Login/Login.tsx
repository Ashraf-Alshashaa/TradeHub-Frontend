import TextInput from "../../components/text-input/Text-input"
import CustomButton from "../../components/button/Button";
import React from 'react';
import { useState } from "react";
import LoginImage from '../../assets/login.jpg'
import './login.css'

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; password?: string; email?: string; form?: string }>({});

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


  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
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

const handleRegisterClick = (event: React.FormEvent) => {
  event.preventDefault();
  const newErrors: { name?: string; email?: string; password?: string } = {};
  if (!name) newErrors.name = "Username is required";
  if (!email) newErrors.email = "Email is required";
  if (!password) newErrors.password = "Password is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  alert('Register form submitted');

};

const toggleRegisterForm = () => {
  setIsRegistering(!isRegistering);
  setErrors({}); // Clear any existing errors when switching forms
};

return (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-7 mt-auto text-center">
        <img src={LoginImage} alt="Login" className="img-fluid" />
      </div>
      <div className="col-md-5 d-flex flex-column align-items-center justify-content-center login-form">
        <form onSubmit={isRegistering ? handleRegisterClick : handleLoginClick} className="w-100 d-flex flex-column align-items-center">
        {isRegistering ? (
              <>
                <div className="mb-3 text-input-container">
                  <TextInput label="Username" value={name} onChange={handleNameChange} />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="mb-3 text-input-container">
                  <TextInput label="Email" value={email} onChange={handleEmailChange} type="email"/>
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3 text-input-container">
                  <TextInput label="Password" value={password} onChange={handlePasswordChange}  type="password"/>
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
              </>
            ) : (
              <>
                <div className="mb-3 text-input-container">
                  <TextInput label="Username" value={name} onChange={handleNameChange} />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="mb-3 text-input-container">
                  <TextInput label="Password" value={password} onChange={handlePasswordChange} type="password" />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
              </>
            )}
            <div className="my-3 text-center">
              <CustomButton text={isRegistering ? "Register" : "Login"} buttonType="primary" onClick={isRegistering ? handleRegisterClick : handleLoginClick} />
            </div>
            {errors.form && <div className="text-danger text-center">{errors.form}</div>}
            <div className="mt-5 text-center">
              {isRegistering ? (
                <p>Already have an account? <a href="#" onClick={toggleRegisterForm}>Login here!</a></p>
              ) : (
                <p>Don't have an account yet? <a href="#" onClick={toggleRegisterForm}>Register here!</a></p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;