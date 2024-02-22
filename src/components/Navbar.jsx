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

  // To close menu when clicking on a Navlink
  const collapseMenu = () => {
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container nav-container">
          <div className="nav-left">
            <NavLink
              className="brand"
              to={"/"}
              element={<Homepage />}
              onClick={collapseMenu}
            >
              <img src="../logo.svg" alt="iNSPiREd logo" />
            </NavLink>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <menu className="nav-right">
              <NavLink
                className={"navlink"}
                to={"/"}
                element={<Homepage />}
                onClick={collapseMenu}
              >
                Home
              </NavLink>
              <NavLink
                className={"navlink"}
                to={"/about"}
                element={<About />}
                onClick={collapseMenu}
              >
                About
              </NavLink>

              {userToken ? (
                <>
                  <NavLink
                    className={"navlink"}
                    to={"/projects"}
                    element={<Projects />}
                    onClick={collapseMenu}
                  >
                    Gallery
                  </NavLink>
                  <NavLink
                    className={"navlink"}
                    to={"/talents"}
                    element={<Talents />}
                    onClick={collapseMenu}
                  >
                    Talents
                  </NavLink>

                  <NavLink
                    className={"navlink"}
                    to={`/myprofile`}
                    element={<MyProfile />}
                    onClick={collapseMenu}
                  >
                    My Profile
                  </NavLink>

                  <button
                    className={"navlink"}
                    onClick={() => {
                      logOut();
                      navigate("/");
                      collapseMenu();
                    }}
                  >
                    <b>Log Out</b>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    className={"navlink"}
                    to={"/login"}
                    element={<LogIn />}
                    onClick={collapseMenu}
                  >
                    <b>Log In</b>
                  </NavLink>
                  <NavLink
                    className={"navlink"}
                    to={"/signup"}
                    element={<SignUp />}
                    onClick={collapseMenu}
                  >
                    <b>Sign Up</b>
                  </NavLink>
                </>
              )}
            </menu>
          </div>
        </div>
      </nav>

      {/* <nav className="navbar">
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
                <NavLink
                  className={"navlink"}
                  to={"/login"}
                  element={<LogIn />}
                >
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
      </nav> */}
    </>
  );
};
