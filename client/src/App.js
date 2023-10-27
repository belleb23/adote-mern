import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ApplyVolunter from "./pages/ApplyVolunter";
import Notifications from "./pages/Notifications";
import Pets from "./pages/Pets";


import Profile from "./pages/Volunter/Profile";
import Appointments from "./pages/Appointments";
import List from "./pages/Admin/List";
import AccessDenied from "./pages/AccessDenied";


import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";


function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
   <BrowserRouter>
    {loading && (
      <div className="spinner-parent">
        <div class="spinner-border" role="status"></div>
      </div>
    )}
   <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/apply-volunter"
        element={
          <ProtectedRoute>
            <ApplyVolunter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
          <Route
          path="/admin/list"
          element={
            <ProtectedRouteAdmin>
              <List />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunter/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pets"
          element={
            <ProtectedRoute>
              <Pets />
            </ProtectedRoute>
          }
        />



<Route path="/access-denied" element={<AccessDenied />} />

    </Routes>

   </BrowserRouter>
  );
}

export default App;
