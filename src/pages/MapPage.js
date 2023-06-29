import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Collapse, IconButton, Typography } from "@mui/material";
import HiddenSpotsMap from "../components/HiddenSpotsMap";
import DeleteHiddenSpot from "../components/emergentWindows/DeleteHiddenSpot";
import { useLists } from "../contexts/ListsContext";
import EditHiddenSpot from "../components/emergentWindows/EditHiddenSpot";
import axios from "axios";

const MapPage = () => {
  const { deleteHiddenSpot } = useLists();
  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
  const [openEditSpotWindow, setOpenEditSpotWindow] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [spotId, setSpotId] = useState(null);
  const [spotToEdit, setSpotToEdit] = useState({});

  const handleOpenConfirmationWindow = (id) => {
    setSpotId(id);
    setOpenConfirmationWindow(true);
  };

  const handleOpenEditSpotWindow = (id) => {
    try {
      setSpotId(id);
      axios
        .get(process.env.REACT_APP_API_URL + `spots/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setSpotToEdit(res.data);
            setOpenEditSpotWindow(true);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      throw console.error(error);
    }
  };

  const handleCloseConfirmationWindow = () => setOpenConfirmationWindow(false);
  const handleCloseEditSpotWindow = () => setOpenEditSpotWindow(false);

  const handleDeleteHiddenSpot = () => {
    deleteHiddenSpot(
      spotId,
      setStatus,
      setMessage,
      handleCloseConfirmationWindow
    );
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
      {openEditSpotWindow && spotToEdit && (
        <EditHiddenSpot
        spotId={spotId}
        spotToEdit={spotToEdit}
          open={openEditSpotWindow}
          handleClose={handleCloseEditSpotWindow}
          setStatus={setStatus}
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
      <HiddenSpotsMap
        onEdit={handleOpenEditSpotWindow}
        onDelete={handleOpenConfirmationWindow}
      />
    </Box>
  );
};

export default MapPage;
