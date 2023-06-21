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
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          onClick={handleClickOpen}
          startIcon={<PersonAddIcon />}
        >
          Crear
        </Button>
      </Grid>
      {open && (
        <CreateUser
          open={open}
          handleClose={handleClose}
          setStatus={handleShowAlert}
        />
      )}
      {status === true && (
        <Collapse in={openAlert}>
          <Alert
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
            Usuario creado exitosamente!
          </Alert>
        </Collapse>
      )}
      <UsersTable />
    </Box>
  );
};

export default UsersPage;
