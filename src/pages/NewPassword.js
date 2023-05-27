import { ThemeProvider } from "@emotion/react";
import { Alert, AlertTitle, Avatar, Box, Container, CssBaseline, Typography, createTheme } from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NewPasswordForm from "../components/NewPasswordForm";
const theme = createTheme();
const NewPasswordPage = () => {
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
                        Change your password
                    </Typography>
                    {error && <Alert severity="error">{errorMessage}</Alert>}
                    {status === "success" && (
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            <strong>{successMessage} </strong>
                        </Alert>
                    )}
                    {status === "success" && (
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            <a href="/">
                                <strong>Click here </strong>
                            </a>
                            to go to sign in page.
                        </Alert>
                    )}
                    <NewPasswordForm setError={setError} setErrorMessage={setErrorMessage}
                        setStatus={setStatus} setSuccessMessage={setSuccessMessage} />
                </Box>
            </Container>
        </ThemeProvider>
    )

}
export default NewPasswordPage;