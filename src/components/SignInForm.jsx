/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

const SignInForm = ({ setError, setErrorMessage }) => {
  const navigate = useNavigate();
  let location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let from = location.state?.from?.pathname || "/home";

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const data = {
        username: formData.get("username"),
        password: formData.get("password"),
      };
      axios
        .post(process.env.REACT_APP_API_URL + "login", data)
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200) {
            const user = {
              id: res.data.user.id,
              role: res.data.user.role,
              username: res.data.user.username,
              email: res.data.user.email,
              token: res.data.token
            };
            auth.login(user);
            navigate(from, { replace: true });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError(true);
          setErrorMessage(err.response.data.result ? err.response.data.result : err.response.data);
        });
    } catch (error) {
      setIsLoading(false);
      throw console.error(error);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        InputProps={{
          // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </LoadingButton>
    </Box>
  );
};

SignInForm.propTypes = {
  setError: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default SignInForm;
