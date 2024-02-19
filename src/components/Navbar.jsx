import { NavLink, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";
import Projects from "./Projects";
import Talents from "./Talents";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useUser } from "../../context/UserContext";
import MyProfile from "./MyProfile";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default () => {
  const { userToken, logOut } = useUser();
  console.log({ userToken });
  const navigate = useNavigate();

  return (
    <>
      {/* <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

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
      </nav>
    </>
  );
};
