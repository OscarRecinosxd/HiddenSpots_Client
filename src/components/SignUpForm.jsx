import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import axios from "axios";

const SignUpForm = ({ setStatus, setMessage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      axios
        .post(process.env.REACT_APP_API_URL + "signup", data)
        .then((res) => {
          setIsLoading(false);
          if (res.status === 201) {
            setStatus("success");
          }
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false);
          setStatus("error");
          setMessage(
            err.response.data.result
              ? err.response.data.result
              : err.response.data
          );
        });
    } catch (error) {
      setIsLoading(false);
      throw console.error(error);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 1 }} 
        columns={{ xs: 4, sm: 8, md: 36 }}
      >
        <Grid item xs={2} sm={4} md={18}>
          <TextField
            margin="normal"
            required
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={2} sm={4} md={18}>
          <TextField
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={2} sm={4} md={18}>
          <TextField
            margin="normal"
            required
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="off"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
            InputProps={{
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
        </Grid>
        <Grid item xs={2} sm={4} md={18}>
          <TextField
            margin="normal"
            required
            name="confirm_password"
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirm_password"
            autoComplete="off"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                confirm_password: e.target.value,
              }))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <LoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </LoadingButton>
    </Box>
  );
};

SignUpForm.propTypes = {
  setStatus: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default SignUpForm;
