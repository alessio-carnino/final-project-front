import { NavLink } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";
import Projects from "./Projects";
import Talents from "./Talents";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useUser } from "../../context/UserContext";

export default () => {
  const { user } = useUser();

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-left">
          <NavLink className="brand" to={"/"} element={<Homepage />}>
            <img src="../logo.svg" alt="iNSPiREd logo" />
          </NavLink>
        </div>

        {!user && (
          <menu className="nav-right">
            <NavLink className={"navlink"} to={"/login"} element={<LogIn />}>
              Log In
            </NavLink>
            <NavLink className={"navlink"} to={"/signup"} element={<SignUp />}>
              Sign Up
            </NavLink>
          </menu>
        )}

        {user && (
          <menu className="nav-right">
            <NavLink className={"navlink"} to={"/"} element={<Homepage />}>
              Home
            </NavLink>
            <NavLink className={"navlink"} to={"/about"} element={<About />}>
              About
            </NavLink>
            <NavLink
              className={"navlink"}
              to={"/projects"}
              element={<Projects />}
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

            <NavLink className={"navlink"} to={"/signup"} element={<SignUp />}>
              Sign up
            </NavLink>

            <NavLink className={"navlink"} to={"/login"} element={<LogIn />}>
              Log in
            </NavLink>
          </menu>
        )}
      </div>
    </nav>
  );
};
