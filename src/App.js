import React from "react";
import { AuthProvider } from "./contexts/AuthProvider";
import { Route, Routes } from "react-router-dom";
import { ListsProvider } from "./contexts/ListsContext";
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
import NewHiddenSpotPage from "./pages/NewHiddenSpotPage";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <AuthProvider>
      <ListsProvider>
          <Routes>
            <Route
              path=""
              element={
                <PublicRoute>
                  <SignInPage />
                </PublicRoute>
              }
            />
            <Route
              path="signup"
              element={
                <PublicRoute>
                  <SignUpPage />
                </PublicRoute>
              }
            />
            <Route
              path="recover"
              element={
                <PublicRoute>
                  <ForgotPasswordPage />
                </PublicRoute>
              }
            />
            <Route
              path="new-password/:token"
              element={
                <PublicRoute>
                  <NewPasswordPage />
                </PublicRoute>
              }
            />
            <Route
              exact
              path="home"
              element={
                <RequireAuth>
                  <Layout />
                  <Home/>
                </RequireAuth>
              }
            >
              <Route
                path="users"
                element={
                  <AdminRoute>
                    <UsersPage />
                  </AdminRoute>
                }
              />
              <Route path="map" element={<MapPage />} />
              <Route path="newhs" element={<NewHiddenSpotPage />} />
            </Route>
          </Routes>
        </ListsProvider>
      </AuthProvider>
    </>
  );
};

export default App;
