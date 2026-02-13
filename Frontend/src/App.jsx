import { Routes, Route } from "react-router-dom";
import Login from "./mycomp/Authentication/Login";
import Signup from "./mycomp/Authentication/Signup";
import Home from "./mycomp/Home";
import Landing from "./mycomp/LandingPage";
import ProtectedRoute from "./utils/ProtectedRoutes";
import CreatePitchCategory from "./mycomp/createPitchCategory";
import MainForm from "./mycomp/Form/MainForm";
import PublicPitch from "./mycomp/PublicPitch";
import PitchReady from "./mycomp/PitchReady";
const App = () => {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/p/:slug" element={<PublicPitch />} />   {/* <-- MOVE HERE */}
      <Route path="/pitch-ready/:slug" element={<PitchReady />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<CreatePitchCategory />} />
        <Route path="/creationForm/:category" element={<MainForm />} />
      </Route>

    </Routes>

  );
};

export default App;
