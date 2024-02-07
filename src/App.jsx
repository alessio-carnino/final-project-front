import "./App.scss";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Talents from "./components/Talents";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/about" element={<About />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/talents" element={<Talents />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
