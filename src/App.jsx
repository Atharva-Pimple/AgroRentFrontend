import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/NavigationBar";
import { SignIn } from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import MyBookings from "./components/MyBookings";
import MyEquipments from "./components/MyEquipments";
import AddEquipment from "./components/AddEquipment";
import MyEquipmentBookings from "./components/MyEquipmentBookings";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <AppNavbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/my-bookings" element={<MyBookings/>}/>
        <Route path="/my-equipments" element={<MyEquipments/>}/>
        <Route path="/add-equipment" element={<AddEquipment/>}/>
        <Route path="/equipment-bookings" element={<MyEquipmentBookings/>}/>
      </Routes>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover/>
    </BrowserRouter>
  )
}

export default App
