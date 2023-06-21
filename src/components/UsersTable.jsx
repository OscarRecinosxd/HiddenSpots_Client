import React, { useState, useEffect } from "react";
import axios from "axios";
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
     format: (value) => (value === true ? "Activo" : "Inactivo"),
  },
  {
    id: "id",
    label: "Acciones",
    minWidth: 50,
    format: (value) => (
      <div key={value}>
        <Tooltip title="Editar">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Desactivar">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    ),
  },
];

const UsersTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "admin/users")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data[0].isActive)
          console.log(res.data)
          setUsersList(res.data);
        }
      })
      .catch((err) => {
        throw console.error(err);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="users table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.format && (typeof value === "number" || typeof value==="boolean")
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
        count={usersList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UsersTable;
