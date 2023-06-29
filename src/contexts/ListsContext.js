import { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "./AuthProvider";

const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const auth = useAuth();
  const [usersList, setUsersList] = useState([]);
  const [hiddenSpotsMarkers, setHiddenSpotsMarkers] = useState([]);

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
        .post(process.env.REACT_APP_API_URL + "admin/save-user", {
          ...data,
          role: role,
        })
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

  const editUser = (
    userId,
    role,
    data,
    setStatus,
    handleClose,
    setMessage,
    setErrorMessage
  ) => {
    try {
      axios
        .patch(process.env.REACT_APP_API_URL + `admin/update-user/${userId}`, {
          ...data,
          roleId: role,
        })
        .then((res) => {
          if (res.status === 200) {
            setStatus(true);
            handleClose();
            setMessage("Usuario editado exitosamente.");
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

  const getHiddenSpots = () => {
    try {
      axios
        .get(process.env.REACT_APP_API_URL + "spots/hidden-spots")
        .then((res) => {
          if (res.status === 200) {
            setHiddenSpotsMarkers(res.data);
          }
        });
    } catch (error) {
      throw console.error(error);
    }
  };

  const createHiddenSpot = (
    data,
    category,
    condition,
    image,
    setStatus,
    handleClose,
    setMessage,
    setErrorMessage
  ) => {
    try {
      const loggedUserId = auth.user.id;
      const body = {
        ...data,
        tourismcategoryId: category,
        phisicalconditiontypeId: condition,
        imageUrl: image,
        userId: loggedUserId,
      };
      axios
        .post(process.env.REACT_APP_API_URL + "spots/create-hidden-spot", body)
        .then((res) => {
          if (res.status === 201) {
            setStatus(true);
            handleClose();
            setMessage("Lugar creado exitosamente.");
            getHiddenSpots();
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

  const editHiddenSpot = (
    spotId,
    data,
    category,
    condition,
    image,
    setStatus,
    handleClose,
    setMessage,
    setErrorMessage
  ) => {
    try {
      const loggedUserId = auth.user.id;
      axios
        .patch(
          process.env.REACT_APP_API_URL + `spots/update-hidden-spot/${spotId}`,
          {
            ...data,
            ...data,
            tourismcategoryId: category,
            phisicalconditiontypeId: condition,
            imageUrl: image,
            userId: loggedUserId,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setStatus(true);
            handleClose();
            setMessage("Lugar editado exitosamente.");
            getHiddenSpots();
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

  const deleteHiddenSpot = (
    spotId,
    setStatus,
    setMessage,
    handleCloseConfirmationWindow
  ) => {
    try {
      axios
        .delete(
          process.env.REACT_APP_API_URL + `spots/delete-hidden-spot/${spotId}`
        )
        .then((res) => {
          if (res.status === 200) {
            setStatus(true);
            setMessage("Lugar eliminado exitosamente");
            handleCloseConfirmationWindow();
            getHiddenSpots();
          }
        })
        .catch((err) => {
          setStatus(false);
          setMessage(
            err.response.data.result
              ? err.response.data.result
              : err.response.data
          );
        });
    } catch (error) {
      throw console.error(error);
    }
  };

  const values = useMemo(
    () => ({
      usersList,
      getUsers,
      addUser,
      editUser,
      toggleUserStatus,
      hiddenSpotsMarkers,
      getHiddenSpots,
      createHiddenSpot,
      editHiddenSpot,
      deleteHiddenSpot,
    }),
    [usersList, hiddenSpotsMarkers]
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
