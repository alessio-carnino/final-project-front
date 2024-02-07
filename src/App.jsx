import "./App.scss";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Projects from "./components/Projects";
import Talents from "./components/Talents";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />

        <Route path="/" element={<Homepage />} />

        <Route path="/about" element={<About />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/talents" element={<Talents />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
