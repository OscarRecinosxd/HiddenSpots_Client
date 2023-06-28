import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLists } from "../../contexts/ListsContext";
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
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const EditUser = ({
  userId,
  userToEdit,
  open,
  handleClose,
  setStatus,
  setMessage,
}) => {
  const { editUser } = useLists();
  const [data, setData] = useState({
    id: userToEdit.id,
    username: userToEdit.username,
    email: userToEdit.email,
    password: userToEdit.password,
    roleId: userToEdit.roleId,
  });

  const actualRole = userToEdit.roleId.toString() || "";
  const [role, setRole] = useState(actualRole);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
    console.log("DATA ", data);
    editUser(
      userId,
      role,
      data,
      setStatus,
      handleClose,
      setMessage,
      setErrorMessage
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <DialogTitle>Editar usuario</DialogTitle>
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
                  defaultValue={userToEdit.username?.toString()}
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
                  defaultValue={userToEdit.email?.toString()}
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

EditUser.propTypes = {
  userId: PropTypes.number.isRequired,
  userToEdit: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default EditUser;
