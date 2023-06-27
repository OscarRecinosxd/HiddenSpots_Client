import { createContext, useState, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [usersList, setUsersList] = useState();

  const addUser = (
    role,
    data,
    setStatus,
    handleClose,
    setMessage,
    setErrorMessage
  ) => {
    try {
      axios
        .post(process.env.REACT_APP_API_URL + "admin/save-user", {...data, role: role})
        .then((res) => {
          if (res.status === 201) {
            setStatus(true);
            handleClose();
            setMessage("Usuario creado exitosamente.");
            getUsers();
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(
            err.response.data.result
              ? err.response.data.result
              : err.response.data
          );
        });
    } catch (error) {
      throw console.error(error);
    }
  };

  const toggleUserStatus = (userId, setStatus, setMessage, handleClose) => {
    try {
      axios
        .patch(process.env.REACT_APP_API_URL + `admin/deactivate/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            setStatus(true);
            setMessage("El estado del usuario se actualizó exitosamente.");
            handleClose();
            getUsers();
          }
        })
        .catch((err) => {
          setMessage("Algo salió mal.");
          throw console.error(err);
        });
    } catch (error) {
      throw console.error(error);
    }
  };

  const getUsers = () => {
    try {
      axios
        .get(process.env.REACT_APP_API_URL + "admin/users")
        .then((res) => {
          if (res.status === 200) {
            setUsersList(res.data);
          }
        })
        .catch((err) => {
          throw console.error(err);
        });
    } catch (error) {
      throw console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const values = useMemo(
    () => ({
      usersList,
      addUser,
      toggleUserStatus,
    }),
    [usersList]
  );

  return (
    <ListsContext.Provider value={values}>{children}</ListsContext.Provider>
  );
};

ListsProvider.propTypes = {
  children: PropTypes.node,
};

export const useLists = () => {
  return useContext(ListsContext);
};
