import TextInput from "../../components/text-input/Text-input";
import CustomButton from "../../components/button/Button";
import React from "react";
import { useState, useEffect } from "react";
import LoginImage from "../../assets/trade-hub.png";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { login } from "../../features/auth/authSlice";
import { registerUser } from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { fetchPriceRange } from "../../features/pricerange/priceRangeSlice";

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    email?: string;
    form?: string;
  }>({});

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated, navigate]);

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

  const handleLoginClick = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { username?: string; password?: string, form?: string } = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(login({ username, password })).unwrap();
    } catch (err: any) {
      // Assuming the error object has a response.data.detail structure
      const errorMessage = err.response?.data?.detail || "Login failed. Please check your credentials and try again.";
      setErrors({ form: errorMessage });
      setUsername(""); // Clear username input
      setPassword(""); // Clear password input
    }
  };

  useEffect(() => {
    dispatch(fetchPriceRange());
  }, [dispatch]);

  const handleRegisterClick = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { username?: string; email?: string; password?: string } =
      {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(registerUser({ username, email, password })).unwrap();
      setIsRegistering(false);
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
    <div className="login-page-container">
      <div className="row d-flex justify-content-center ">
        <div className="col-md-6 text-center p-0 ">
          <img src={LoginImage} alt="Login" className="img-fluid" />
        </div>
        <div className="col-md-5 d-flex flex-column align-items-center justify-content-center login-form">
          <form
            onSubmit={isRegistering ? handleRegisterClick : handleLoginClick}
            className="w-100 d-flex flex-column align-items-center"
          >
            {isRegistering ? (
              <>
                <div className="mb-3 text-input-container">
                  <TextInput
                    label="Username"
                    value={username}
                    onChange={handleNameChange}
                  />
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </div>
                <div className="mb-3 text-input-container">
                  <TextInput
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3 text-input-container">
                  <TextInput
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="mb-3 text-input-container">
                  <TextInput
                    label="Username"
                    value={username}
                    onChange={handleNameChange}
                  />
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </div>
                <div className="mb-3 text-input-container">
                  <TextInput
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
              </>
            )}
            <div className="mt-3 text-center">
              <CustomButton
                text={isRegistering ? "Register" : "Login"}
                buttonType="primary"
                onClick={(event) => {
                  if (isRegistering) {
                    handleRegisterClick(event as unknown as React.FormEvent);
                  } else {
                    handleLoginClick(event as unknown as React.FormEvent);
                  }
                }}
              />
            </div>
            {loading && <div>Loading...</div>}
            {error && typeof error === "string" && (
              <div className="text-danger text-center">{error}</div>
            )}
            {isAuthenticated && (
              <div className="text-success">Successfully authenticated!</div>
            )}
            {typeof errors.form === "string" && (
              <div className="text-danger text-center">{errors.form}</div>
            )}
            <div className="mt-5 text-center">
              {isRegistering ? (
                <p>
                  Already have an account?{" "}
                  <a href="#" onClick={toggleRegisterForm}>
                    Login here!
                  </a>
                </p>
              ) : (
                <p>
                  Don't have an account yet?{" "}
                  <a href="#" onClick={toggleRegisterForm}>
                    Register here!
                  </a>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
