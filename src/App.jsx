import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/NavigationBar";
import { SignIn } from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import MyBookings from "./components/MyBookings";
import MyEquipments from "./components/MyEquipments";
import AddEquipment from "./components/AddEquipment";
import EditEquipment from "./components/EditEquipment";
import MyEquipmentBookings from "./components/MyEquipmentBookings";
import Payments from "./components/Payments";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Equipment from "./components/Equipment";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./components/Users";


function App() {

  return (
    <BrowserRouter>
      <AppNavbar />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* ROLE_FARMER Routes */}
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute allowedRoles={["ROLE_FARMER", "ROLE_ADMIN"]}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-equipments"
          element={
            <ProtectedRoute allowedRoles={["ROLE_FARMER", "ROLE_ADMIN"]}>
              <MyEquipments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-equipment"
          element={
            <ProtectedRoute allowedRoles={["ROLE_FARMER", "ROLE_ADMIN"]}>
              <AddEquipment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-equipment/:equipmentId"
          element={
            <ProtectedRoute allowedRoles={["ROLE_FARMER", "ROLE_ADMIN"]}>
              <EditEquipment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/equipment-bookings"
          element={
            <ProtectedRoute allowedRoles={["ROLE_FARMER", "ROLE_ADMIN"]}>
              <MyEquipmentBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute allowedRoles={["ROLE_FARMER", "ROLE_ADMIN"]}>
              <Payments />
            </ProtectedRoute>
          }
        />

        {/* ROLE_ADMIN Routes */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <Users/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/equipments"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <Equipment />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App
