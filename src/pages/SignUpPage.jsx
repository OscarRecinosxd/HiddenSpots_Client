import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, AlertTitle, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import SignUpForm from "../components/SignUpForm";

const theme = createTheme();

const SignUpPage = () => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

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
            Sign Up
          </Typography>
          {status === "error" && <Alert severity="error">{message}</Alert>}
          {status === "success" && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              <a href="/">
                <strong>Click here </strong>
              </a>
              to go to sign in page.
            </Alert>
          )}
          <SignUpForm setStatus={setStatus} setMessage={setMessage} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;
