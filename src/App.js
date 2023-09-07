import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Gallery from "./pages/Gallery";
import UploadPage from "./pages/UploadPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/uploadImage" element={<UploadPage />} />
      </Routes>
    </>
  );
}

export default App;
