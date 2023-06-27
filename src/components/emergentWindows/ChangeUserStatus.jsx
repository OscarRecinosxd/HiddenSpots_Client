import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useLists } from "../../contexts/ListsContext";

export default function ChangeUserStatus({
  userId,
  open,
  handleClose,
  setStatus,
  setMessage,
}) {
  const { toggleUserStatus } = useLists();

  const handleChangeUserStatus = () => {
   toggleUserStatus(userId, setStatus, setMessage, handleClose);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Activar/Desactivar usuario"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro que desea cambiar el estado?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button onClick={handleChangeUserStatus} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ChangeUserStatus.propTypes = {
  userId: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};
