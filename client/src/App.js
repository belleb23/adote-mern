import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ApplyVolunter from "./pages/ApplyVolunter";
import Notifications from "./pages/Notifications";
import Pets from "./pages/Pets";
import UserAdoptions from "./pages/UserAdoptions";

import Profile from "./pages/Volunter/Profile";
import Appointments from "./pages/Appointments";
import List from "./pages/Admin/List";
import AccessDenied from "./pages/AccessDenied";

import DetailsPet from "./pages/DetailsPet";

import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import ProtectedRouteAdminVolunteer from "./components/ProtectedRouteAdminVolunteer";

import NewPet from "./pages/NewPet";
import Applications from "./pages/Volunter/Applications";
import BookAppointment from "./pages/BookAppointment";
import ListAppointments from "./pages/ListAppointments";
import VolunterAppointments from "./pages/Volunter/VolunterAppointments";
import UserAppointments from "./pages/UserAppointments";
import AdminAppointmnets from "./pages/Admin/AdminAppointmnets";

import CalendarTeste from "./pages/CalendarTeste";
import EditPet from "./pages/EditPet";
import Dashboard from "./pages/Temp/Dashboard";

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

      <Route 
        path="/login" 
        element={<Login/>
      }/>
      
      <Route 
        path="/register" 
        element={<Register/>}
      />

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
          <ProtectedRouteAdminVolunteer>
            <Pets />
          </ProtectedRouteAdminVolunteer>
        }
      /> 

      <Route
        path="/details-pet/:petId"
        element={
          <ProtectedRoute>
            <DetailsPet />
          </ProtectedRoute>
        }
      />    

      <Route
        path="/new-pet"
        element={
          <ProtectedRouteAdminVolunteer>
            <NewPet />
          </ProtectedRouteAdminVolunteer>
        }
      />  

      <Route
        path="/user-adoptions"
        element={
          <ProtectedRoute>
            <UserAdoptions />
          </ProtectedRoute>
        }
      />  

      <Route
        path="/volunter/applications"
        element={
          <ProtectedRouteAdminVolunteer>
            <Applications />
          </ProtectedRouteAdminVolunteer>
        }
      /> 


      <Route
        path="/book-appointment/:volunterId"
        element={
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/list-appointments"
        element={
          <ProtectedRoute>
            <ListAppointments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/volunter/appointments"
        element={
          <ProtectedRouteAdminVolunteer>
            <VolunterAppointments />
          </ProtectedRouteAdminVolunteer>
        }
      />


      <Route
        path="/calendario-teste"
        element={
          <ProtectedRouteAdminVolunteer>
            <CalendarTeste />
          </ProtectedRouteAdminVolunteer>
        }
      />

      <Route
        path="/edit-pet/:petId"
        element={
          <ProtectedRouteAdminVolunteer>
            <EditPet />
          </ProtectedRouteAdminVolunteer>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user-appointments"
        element={
          <ProtectedRoute>
            <UserAppointments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-appointments"
        element={
          <ProtectedRouteAdmin>
            <AdminAppointmnets />
          </ProtectedRouteAdmin>
        }
      />

        <Route path="/access-denied" 
          element={<AccessDenied />} 
        />

    </Routes>

   </BrowserRouter>
  );
}

export default App;
