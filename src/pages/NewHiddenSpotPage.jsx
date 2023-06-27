import React, { useState } from "react";
import Button from "@mui/material/Button";
import RoomIcon from "@mui/icons-material/Room";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import NewHiddenSpotMap from "../components/NewHiddenSpotMap";
import CreateHiddenSpot from "../components/emergentWindows/CreateHiddenSpot";

const NewHiddenSpotPage = () => {
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
        <Typography variant="h4">Nuevo lugar</Typography>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<RoomIcon />}
        >
          Crear
        </Button>
      </Grid>
      {open && (
        <CreateHiddenSpot
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
      <NewHiddenSpotMap />
    </Box>
  );
};

export default NewHiddenSpotPage;
