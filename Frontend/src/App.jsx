import { Routes, Route } from "react-router-dom";
import Login from "./mycomp/Authentication/Login";
import Signup from "./mycomp/Authentication/Signup";
import Landing from "./mycomp/LandingPage";
import ProtectedRoute from "./utils/ProtectedRoutes";
import MainForm from "./mycomp/Form/MainForm";
import PublicPitch from "./mycomp/PublicPitch";
import PitchReady from "./mycomp/PitchReady";
import PitchTemplate from "./Pitchcomp/PitchTemplate";
import WaitlistDataView from "./mycomp/Waitlist/WaitlistDataView";
import HomePage from "./AdminComp/HomeComp/HomePage";
const App = () => {
  return (
    <Routes>

      {/* Public */}
      {/* <Route path="/tech-land" element={<ServicePitch />} />   TEMPORARY FOR TESTING */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/p/:slug" element={<PublicPitch />} />   {/* <-- MOVE HERE */}
      <Route path="/pitch-ready/:slug" element={<PitchReady />} />
      <Route path="/demo" element={<PitchTemplate />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-form" element={<MainForm />} />
        <Route path="/view-waitlist/:slug" element={<WaitlistDataView />} />
      </Route>

    </Routes>

  );
};

export default App;
