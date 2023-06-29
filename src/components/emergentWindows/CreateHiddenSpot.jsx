import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
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
import { useLists } from "../../contexts/ListsContext";

const CreateHiddenSpot = ({
  open,
  handleClose,
  setStatus,
  setMessage,
  lat,
  lng,
}) => {
  const { createHiddenSpot } = useLists();
  const [data, setData] = useState({
    name: "",
    description: "",
    lat: lat,
    lng: lng,
    tourismcategoryId: "",
    phisicalconditiontypeId: "",
  });
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [conditionsList, setConditionsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
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
            setConditionsList(res.data);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      throw console.error(error);
    }
  }, []);

  const handleSelectFile = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    console.log("img ", image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createHiddenSpot(
      data,
      category,
      condition,
      image,
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
          <DialogTitle>Crear lugar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {errorMessage !== "" && (
                <Alert severity="error" variant="filled" sx={{ my: 1 }}>
                  {errorMessage}
                </Alert>
              )}
              Para crear un lugar, por favor complete los siguientes datos:
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
                  id="name"
                  label="Nombre del lugar"
                  name="name"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={2} sm={4} md={18}>
                <TextareaAutosize
                  margin="normal"
                  required
                  id="description"
                  aria-label="empty description"
                  placeholder="Descirpción"
                  name="description"
                  autoComplete="off"
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={2} sm={4} md={18}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Categoría</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    label="Categoría"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categoriesList?.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} sm={4} md={18}>
                <FormControl fullWidth>
                  <InputLabel id="condition-label">Condición</InputLabel>
                  <Select
                    labelId="condition-label"
                    id="condition-select"
                    label="Condición"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    {conditionsList?.map((cond) => (
                      <MenuItem key={cond.id} value={cond.id}>
                        {cond.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} sm={4} md={18}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="spot-image"
                  type="file"
                  onChange={handleSelectFile}
                />
                <label htmlFor="spot-image">
                  <Button variant="raised" component="span">
                    Subir imágen
                  </Button>
                </label>
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

CreateHiddenSpot.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default CreateHiddenSpot;
