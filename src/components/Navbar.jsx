import { NavLink } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";
import Gallery from "./Gallery";
import Talents from "./Talents";

export default () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-left">
          <figure className="brand">
            <img src="../logo.svg" alt="iNSPiREd logo" />
          </figure>

          <div className="nav-right">
            <NavLink className={"navlink"} to={"/"} element={<Homepage />}>
              Home
            </NavLink>
            <NavLink className={"navlink"} to={"/about"} element={<About />}>
              About
            </NavLink>
            <NavLink
              className={"navlink"}
              to={"/gallery"}
              element={<Gallery />}
            >
              Gallery
            </NavLink>
            <NavLink
              className={"navlink"}
              to={"/talents"}
              element={<Talents />}
            >
              Talents
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
