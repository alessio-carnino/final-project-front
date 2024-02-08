import "./App.scss";
import "./index.scss";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Projects from "./components/Projects";
import Talents from "./components/Talents";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { useUser } from "../context/UserContext";

function App() {
  const { userData } = useUser();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/signup"
          element={userData ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={!userData ? <LogIn /> : <Navigate to="/" />}
        />

        <Route path="/projects" element={userData ? <Outlet /> : <LogIn />}>
          <Route index element={<Projects />} />
        </Route>

        <Route path="/talents" element={userData ? <Outlet /> : <LogIn />}>
          <Route index element={<Talents />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
