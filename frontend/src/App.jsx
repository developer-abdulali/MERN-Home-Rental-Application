import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Doctors from "./pages/Doctors/Doctors";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyAppointments from "./pages/MyAppointments/MyAppointments";
import Navbar from "./components/Navbar/Navbar";
import Appointment from "./pages/Appointment/Appointment";
import Footer from "./components/Footer/Footer";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
};
export default App;
