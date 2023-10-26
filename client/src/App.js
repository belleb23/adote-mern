import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ApplyVolunter from "./pages/ApplyVolunter";
import Notifications from "./pages/Notifications";
import Userslist from "./pages/Admin/Userslist";
import VolunteersList from "./pages/Admin/VolunteersList";
import Profile from "./pages/Volunter/Profile";
import Appointments from "./pages/Appointments";


import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";



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
          path="/admin/userslist"
          element={
            <ProtectedRoute>
              <Userslist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/volunteerslist"
          element={
            <ProtectedRoute>
              <VolunteersList />
            </ProtectedRoute>
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

    </Routes>

   </BrowserRouter>
  );
}

export default App;
