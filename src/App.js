import React from "react";
import { AuthProvider } from "./contexts/AuthProvider";
import { Route, Routes } from "react-router-dom";
/*import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import CONFIG from "./config/config.js";*/

import SignInPage from "./pages/SignInPage";
import RequireAuth from "./utils/RequireAuth";
import Layout from "./pages/Layout";
import PublicRoute from "./utils/PublicRoute";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import NewPasswordPage from "./pages/NewPassword";
import MapPage from "./pages/MapPage";
import UsersPage from "./pages/UsersPage";
import AdminRoute from "./utils/AdminRoute";

const App = () => {
  /*const { isLoaded } = useJsApiLoader({
    // eslint-disable-next-line no-undef
    googleMapsApiKey: CONFIG.API_KEY,
  });
  const center = { lat: 13.795802, lng: -88.961608 };
  const casa =   { lat : 13.670549, lng : -89.239163}

  if (!isLoaded) {
    return <div>Loading....</div>;
  } */

  return (
    /*<GoogleMap
      center={center}
      zoom={10}
      mapContainerStyle={{ width: '100%', height: "800px"}}>
    {isLoaded && console.log("Loaded")}
    {isLoaded && <Marker position={casa} />}
    <Marker position={casa}/>

    </GoogleMap>*/

    <>
      <AuthProvider>
        <Routes>
          <Route path="" element={<PublicRoute><SignInPage /></PublicRoute>} />
          <Route path="signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
          <Route path="recover" element={<PublicRoute><ForgotPasswordPage/></PublicRoute>} />
          <Route path="new-password/:token" element={<PublicRoute><NewPasswordPage/></PublicRoute>} />
          <Route
            exact
            path="home"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
          <Route path="users" element={<AdminRoute><UsersPage /></AdminRoute>} />
          <Route path="map" element={<MapPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
