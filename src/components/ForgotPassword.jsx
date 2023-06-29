/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
//import { useLocation, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import axios from "axios";


const ForgotPassWordForm = ({ setError, setErrorMessage, setStatus, setSuccessMessage}) => {
    const [isLoading, setIsLoading] = useState(false);
    //const navigate = useNavigate();
    //let location = useLocation();
    //let from = location.state?.from?.pathname || "/new-password";
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(event.currentTarget);
            const data = {
              email: formData.get("email"),
            };
            axios.post(process.env.REACT_APP_API_URL + "request-password",data)
            .then((res)=>{
                setIsLoading(false);
                if(res.status===200){
                    setStatus("success");
                    setSuccessMessage(res.data.result)
                    //navigate(from, { replace: true })
                }
            }).catch((err)=>{
                setIsLoading(false);
                setError(true);
                setErrorMessage(err.response.data.result ? err.response.data.result : err.response.data);
           });
        } catch (err) {
            setIsLoading(false);
            throw console.error(err);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <LoadingButton
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Enviar correo
            </LoadingButton>
        </Box>
    )
}
ForgotPassWordForm.propTypes = {
    setError: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
    setStatus:PropTypes.func.isRequired,
    setSuccessMessage: PropTypes.func.isRequired,
}
export default ForgotPassWordForm;