import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Collapse, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
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
  const [categories, setCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const [conditions,setConditions]=useState([]);
  const [condition,setCondition]=useState("");

  const handleOpenConfirmationWindow = (id) => {
    setSpotId(id);
    setOpenConfirmationWindow(true);
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "tourism-categories")
      .then((res) => {
        if (res.status === 200) {
          setCategoriesList(res.data);
        }
      })
      .catch((err) => console.log(err));
      axios
        .get(process.env.REACT_APP_API_URL + "phisical-condition")
        .then((res) => {
          if (res.status === 200) {
            setConditions(res.data);
          }
        })
        .catch((err) => console.log(err));
  }, []);
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
      <Grid container>
      <Grid item md={1} marginY={4}>
        <Typography variant="h5">Filtros</Typography>
        </Grid>
        <Grid item md={4} marginY={4}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            label="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
        <Grid item md={4} marginY={4} marginX={1}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Condición</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            label="Condicion"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            {conditions?.map((con) => (
              <MenuItem key={con.id} value={con.id}>
                {con.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
      </Grid>

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
        filter={category}
        condition={condition}
      />
    </Box>
  );
};

export default MapPage;
