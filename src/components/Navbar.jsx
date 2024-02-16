import { NavLink, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";
import Projects from "./Projects";
import Talents from "./Talents";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useUser } from "../../context/UserContext";
import MyProfile from "./MyProfile";

export default () => {
  const { userToken, logOut } = useUser();

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-left">
          <NavLink className="brand" to={"/"} element={<Homepage />}>
            <img src="../logo.svg" alt="iNSPiREd logo" />
          </NavLink>
        </div>

        <menu className="nav-right">
          <NavLink className={"navlink"} to={"/"} element={<Homepage />}>
            Home
          </NavLink>
          <NavLink className={"navlink"} to={"/about"} element={<About />}>
            About
          </NavLink>

          {userToken ? (
            <>
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

              <NavLink
                className={"navlink"}
                to={`/myprofile`}
                element={<MyProfile />}
              >
                My Profile
              </NavLink>

              <button
                className={"navlink"}
                onClick={() => {
                  logOut();
                  navigate("/");
                }}
              >
                <b>Log Out</b>
              </button>
            </>
          ) : (
            <>
              <NavLink className={"navlink"} to={"/login"} element={<LogIn />}>
                <b>Log In</b>
              </NavLink>
              <NavLink
                className={"navlink"}
                to={"/signup"}
                element={<SignUp />}
              >
                <b>Sign Up</b>
              </NavLink>
            </>
          )}
        </menu>
      </div>
    </nav>
  );
};
