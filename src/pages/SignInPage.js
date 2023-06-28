import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import SignInForm from "../components/SignInForm";

const theme = createTheme();

const SignInPage = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
            Iniciar sesión
          </Typography>
          {error && <Alert severity="error">{errorMessage}</Alert>}
          <SignInForm setError={setError} setErrorMessage={setErrorMessage} />
          <Grid container>
            <Grid item xs>
              <Link href="recover" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item xs>
              <Link href="signup" variant="body2">
                ¿No tienes una cuenta? Registrate aquí
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
