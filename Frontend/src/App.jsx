import { Routes, Route } from "react-router-dom";
import Login from "./mycomp/Authentication/Login";
import Signup from "./mycomp/Authentication/Signup";
import Home from "./mycomp/Home";
import Landing from "./mycomp/LandingPage";
import ProtectedRoute from "./utils/ProtectedRoutes";
import CreatePitchCategory from "./mycomp/createPitchCategory";
import MainForm from "./mycomp/Form/MainForm";
const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      {/* Protected wrapper */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<CreatePitchCategory />} />
        <Route path="/creationForm/:category" element={<MainForm />} />
        {/* add more protected routes here */}
      </Route>
    </Routes>
  );
};

export default App;
