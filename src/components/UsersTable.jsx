import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useLists } from "../contexts/ListsContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ChangeUserStatus from "./emergentWindows/ChangeUserStatus";
import EditUser from "./emergentWindows/EditUser";

const UsersTable = ({ setStatus, setMessage }) => {
  const { usersList, getUsers } = useLists();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openEditUserWindow, setOpenEditUserWindow] = useState(false);
  const [userToModify, setUserToModify] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const totalUsers = usersList?.length || 0;

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    { id: "username", label: "Nombre de usuario", minWidth: 170 },
    { id: "email", label: "Correo electrónico", minWidth: 100 },
    {
      id: "roleId",
      label: "Rol",
      minWidth: 100,
      format: (value) => (value === 1 ? "Administrador" : "Turista"),
    },
    {
      id: "isActive",
      label: "Estado",
      minWidth: 100,
      format: (value) => formatUserStatus(value),
    },
    {
      id: "id",
      label: "Acciones",
      minWidth: 50,
      format: (value) => formatActions(value),
    },
  ];
  const formatUserStatus = (status) =>
    status === true ? (
      <ToggleOnIcon fontSize="large" color="success" />
    ) : (
      <ToggleOffIcon fontSize="large" color="error" />
    );

  const formatActions = (id) => (
    <div key={id}>
      <Tooltip title="Editar">
        <IconButton onClick={() => handleOpenEditUserWindow(id)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Desactivar/Activar">
        <IconButton onClick={() => handleOpenDeactivateUserDialog(id)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDeactivateUserDialog = (userId) => {
    setUserToModify(userId);
    setOpenConfirmationDialog(true);
  };

  const handleCloseDeactivateUserDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleOpenEditUserWindow = async (userId) => {
    setUserToModify(userId);
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL + `admin/${userId}`
    );
    setUserInfo(data);
    setOpenEditUserWindow(true);
  };

  const handleCloseEditUserWindow = () => {
    setOpenEditUserWindow(false);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {openConfirmationDialog && (
        <ChangeUserStatus
          userId={userToModify}
          open={openConfirmationDialog}
          handleClose={handleCloseDeactivateUserDialog}
          setStatus={setStatus}
          setMessage={setMessage}
        />
      )}
      {openEditUserWindow && userInfo && (
        <EditUser
          userId={userToModify}
          userToEdit={userInfo}
          open={openEditUserWindow}
          handleClose={handleCloseEditUserWindow}
          setStatus={setStatus}
          setMessage={setMessage}
        />
      )}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="users table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format &&
                          (typeof value === "number" ||
                            typeof value === "boolean")
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalUsers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
UsersTable.propTypes = {
  setStatus: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default UsersTable;
