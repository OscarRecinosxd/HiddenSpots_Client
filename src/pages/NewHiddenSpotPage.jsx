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
  const [openCreateSpotWindow, setOpenCreateSpotWindow] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState("");

  const handleClickOpenCreateSpotWindow = () => {
    setOpenCreateSpotWindow(true);
  };

  const handleCloseCreateSpotWindow = () => {
    setOpenCreateSpotWindow(false);
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
        <Typography variant="h4">Crear lugar</Typography>
        <Button
          variant="contained"
          disabled={disabled}
          onClick={handleClickOpenCreateSpotWindow}
          startIcon={<RoomIcon />}
        >
          Crear
        </Button>
      </Grid>
      {openCreateSpotWindow && (
        <CreateHiddenSpot
          lat={lat}
          lng={lng}
          open={openCreateSpotWindow}
          handleClose={handleCloseCreateSpotWindow}
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
      <NewHiddenSpotMap
        setLatitude={setLat}
        setLongitude={setLng}
        setDisabled={setDisabled}
      />
    </Box>
  );
};

export default NewHiddenSpotPage;
