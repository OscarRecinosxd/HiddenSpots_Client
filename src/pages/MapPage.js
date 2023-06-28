import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Collapse, IconButton, Typography } from "@mui/material";
import HiddenSpotsMap from "../components/HiddenSpotsMap";
import DeleteHiddenSpot from "../components/emergentWindows/DeleteHiddenSpot";
import { useLists } from "../contexts/ListsContext";

const MapPage = () => {
  const { deleteHiddenSpot } = useLists();
  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [spotId, setSpotId] = useState(null);

  const handleOpenConfirmationWindow = (id) => {
    setSpotId(id);
    setOpenConfirmationWindow(true);
  };

  const handleCloseConfirmationWindow = () => setOpenConfirmationWindow(false);

  const handleDeleteHiddenSpot = () => {
    deleteHiddenSpot(spotId, setStatus, setMessage, handleCloseConfirmationWindow);
  };

  return (
    <Box
      sx={{
        margin: 4,
      }}
    >
      <Typography variant="h4">Todos los lugares</Typography>
      {openConfirmationWindow && (
        <DeleteHiddenSpot
          open={openConfirmationWindow}
          handleClose={handleCloseConfirmationWindow}
          handleDeleteHiddenSpot={handleDeleteHiddenSpot}
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
      <HiddenSpotsMap onDelete={handleOpenConfirmationWindow} />
    </Box>
  );
};

export default MapPage;
