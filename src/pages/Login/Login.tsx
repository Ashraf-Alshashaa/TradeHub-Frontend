import TextInput from "../../components/text-input/Text-input"
import CustomButton from "../../components/button/Button";
import React from 'react';
import { useState } from "react";
import LoginImage from '../../assets/login.jpg'
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store/store';
import { loginUser, registerUser } from '../../redux/store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; email?: string; form?: string }>({});

  const dispatch = useDispatch <AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleNameChange = (value: string) => {
    setUsername(value);
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, username: undefined }));
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
const handleLoginClick = async (event: React.FormEvent) => {
  event.preventDefault();
  const newErrors: { username?: string; password?: string } = {};
  if (!username) newErrors.username = "Username is required";
  if (!password) newErrors.password = "Password is required";
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  
  try {
    await dispatch(loginUser({ username, password })).unwrap();
    navigate('/products');
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.detail) {
      setErrors({ form: error.response.data.detail });
    } else {
      setErrors({ form: "An error occurred while logging in." });
    }
  }
};


const handleRegisterClick = async (event: React.FormEvent) => {
  event.preventDefault();
  const newErrors: { username?: string; email?: string; password?: string } = {};
  if (!username) newErrors.username = "Username is required";
  if (!email) newErrors.email = "Email is required";
  if (!password) newErrors.password = "Password is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    await dispatch(registerUser({ username: username, email, password })).unwrap();
    navigate('/products');
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.detail) {
      setErrors({ form: error.response.data.detail });
    } else {
      setErrors({ form: "An error occurred while registering." });
    }
  }
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
                  <TextInput label="Username" value={username} onChange={handleNameChange} />
                  {errors.username && <div className="text-danger">{errors.username}</div>}
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
                  <TextInput label="Username" value={username} onChange={handleNameChange} />
                  {errors.username && <div className="text-danger">{errors.username}</div>}
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
            {loading && <div>Loading...</div>}
            {error && <div className="text-danger">{error}</div>}
            {isAuthenticated && <div className="text-success">Successfully authenticated!</div>}
            {typeof errors.form === 'string' && <div className="text-danger text-center">{errors.form}</div>}
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