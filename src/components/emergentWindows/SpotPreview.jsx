import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid, Typography } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../contexts/AuthProvider";

const SpotPreview = ({ spot, onDelete }) => {
  const auth = useAuth();

  return (
    <Box key={spot.id}>
      {spot.imageUrl !== null ? (
        <img
          src={spot.imageUrl}
          alt={spot.name}
          style={{ width: "100", height: "100" }}
        />
      ) : (
        <ImageNotSupportedIcon />
      )}
      <Typography variant="h4">{spot.name}</Typography>
      <hr />
      <Typography variant="h6">{spot.description}</Typography>
      {auth.user.id === spot.userId && (
        <Grid container justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(spot.id)}
          >
            Eliminar
          </Button>
          <Button variant="contained" startIcon={<EditIcon />}>
            Editar
          </Button>
        </Grid>
      )}
    </Box>
  );
};

SpotPreview.propTypes = {
  spot: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SpotPreview;
