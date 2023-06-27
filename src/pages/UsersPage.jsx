import React, { useState } from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UsersTable from "../components/UsersTable";
import CreateUser from "../components/emergentWindows/CreateUser";
import {
  Alert,
  Box,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UsersPage = () => {
  const [openCreateUserWindow, setOpenCreateUserWindow] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState("");

  const handleClickOpenCreateUserWindow = () => {
    setOpenCreateUserWindow(true);
  };

  const handleCloseCreateUserWindow = () => {
    setOpenCreateUserWindow(false);
  };

  const handleShowAlert = () => {
    setStatus(true);
    setOpenAlert(true);
  };

  return (
    <Box
      sx={{
        margin: 4,
      }}
    >
      <Grid container justifyContent="space-between">
        <Typography variant="h4">Manejo de usuarios</Typography>
        <Button
          variant="contained"
          onClick={handleClickOpenCreateUserWindow}
          startIcon={<PersonAddIcon />}
        >
          Crear
        </Button>
      </Grid>
      {openCreateUserWindow && (
        <CreateUser
          open={openCreateUserWindow}
          handleClose={handleCloseCreateUserWindow}
          setStatus={handleShowAlert}
          setMessage={setMessage}
        />
      )}
      {status && (
        <Collapse in={openAlert}>
          <Alert
            severity={status === true ? "success" : "error"}
            variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ my: 2 }}
          >
            {message}
          </Alert>
        </Collapse>
      )}
      <UsersTable
        setStatus={handleShowAlert}
        setMessage={setMessage}
      />
    </Box>
  );
};

export default UsersPage;
