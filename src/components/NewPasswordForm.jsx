import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
//import { useLocation, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import axios from "axios";
import { Grid, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useParams } from "react-router-dom";
const NewPasswordForm = ({ setError, setErrorMessage, setStatus, setSuccessMessage }) => {
   const {token}=useParams();
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            axios
        .patch(process.env.REACT_APP_API_URL + `reset-password/${token}`, data)
        .then((res)=>{
            setIsLoading(false);
          if (res.status === 200) {
            setSuccessMessage(res.data.result)
            setStatus("success");
          }
        })
        .catch((err) => {
            console.log(err)
            setIsLoading(false);
            setStatus("error");
            setError(true);
            setErrorMessage(
              err.response.data.result
                ? err.response.data.result
                : err.response.data
            );
          });
        } catch (error) {
            setIsLoading(false);
            throw console.error(error);
        }
    }
    const [data, setData] = useState({
        new_password: "",
        confirm_password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid item xs={2} sm={4} md={18}>
                <TextField
                    margin="normal"
                    required
                    name="new_password"
                    label="Nueva contraseña"
                    type={showPassword ? "text" : "password"}
                    id="new_password"
                    autoComplete="off"
                    onChange={(e) =>
                        setData((prevState) => ({
                            ...prevState,
                            new_password: e.target.value,
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
                    label="Confirmar contraseña"
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
                <Grid>
                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Cambiar contraseña
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}
NewPasswordForm.propTypes = {
    setErrorMessage: PropTypes.func.isRequired,
    setSuccessMessage: PropTypes.func.isRequired,
    setStatus:PropTypes.func.isRequired,
    setError:PropTypes.func.isRequired
  };
export default NewPasswordForm;