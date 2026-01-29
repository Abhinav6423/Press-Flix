import { Routes, Route } from "react-router-dom";
import Login from "./mycomp/Login";
import Home from "./mycomp/Home";
import Landing from "./mycomp/LandingPage";
import ProtectedRoute from "./utils/ProtectedRoutes";
import CreatePitchCategory from "./mycomp/createPitchCategory";
import PitchDetailsForm from "./utils/Form";
const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected wrapper */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<CreatePitchCategory />} />
        <Route path="/pitchForm/:category" element={<PitchDetailsForm />} />
        {/* add more protected routes here */}
      </Route>
    </Routes>
  );
};

export default App;
