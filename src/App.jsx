import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/NavigationBar";
import { SignIn } from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {

  return (
    <BrowserRouter>
      <AppNavbar/>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        Define other routes here */}
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
