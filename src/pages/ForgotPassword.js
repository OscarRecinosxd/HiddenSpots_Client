import { ThemeProvider } from "@emotion/react";
import { Alert, AlertTitle, Avatar, Box, Container, CssBaseline, Typography, createTheme } from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ForgotPassWordForm from "../components/ForgotPassword";
const theme = createTheme();
const ForgotPasswordPage = () => {
    const [error, setError] = useState(false);
    const [status, setStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Restablecer contraseña
                    </Typography>
                    {error && <Alert severity="error">{errorMessage}</Alert>}
                    {status === "success" && (
                        <Alert severity="success">
                            <AlertTitle>Correcto</AlertTitle>
                            <strong>{successMessage} </strong>
                        </Alert>
                    )}
                    <ForgotPassWordForm setError={setError} setErrorMessage={setErrorMessage}
                        setStatus={setStatus} setSuccessMessage={setSuccessMessage} />
                </Box>
            </Container>
        </ThemeProvider>

    )
}
export default ForgotPasswordPage;