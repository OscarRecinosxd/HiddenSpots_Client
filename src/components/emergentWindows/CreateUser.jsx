import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CreateUser = ({ open, handleClose, setStatus }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    roleId: "",
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  useEffect(() => {
    try {
      axios
        .get(process.env.REACT_APP_API_URL + "admin/roles")
        .then((res) => {
          if (res.status === 200) {
            setRoles(res.data);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      throw console.error(error);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      setData((prevState) => ({
        ...prevState,
        roleId: role,
      }));
      axios
        .post(process.env.REACT_APP_API_URL + "admin/save-user", data)
        .then((res) => {
          if (res.status === 201) {
            setStatus(true);
            handleClose();
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(
            err.response.data.result
              ? err.response.data.result
              : err.response.data
          );
        });
    } catch (error) {
      throw console.error(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <DialogTitle>Crear usuario</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {errorMessage !== "" && (
                <Alert severity="error" variant="filled" sx={{ my: 1 }}>
                  {errorMessage}
                </Alert>
              )}
              Para crear un usuario, por favor complete los siguientes datos:
            </DialogContentText>
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
                  label="Nombre de usuario"
                  name="username"
                  autoComplete="off"
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
                  label="Correo electrónico"
                  name="email"
                  autoComplete="off"
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
                  label="Contraseña"
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
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={18}>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Rol</InputLabel>
                  <Select
                    labelId="Rol"
                    id="role-select"
                    label="Rol"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {roles?.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

CreateUser.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
};

export default CreateUser;
