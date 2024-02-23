import { Link } from "react-router-dom";
import Homepage from "./Homepage";
import { useUser } from "../../context/UserContext";
import Projects from "./Projects";
import MyProfile from "./MyProfile";
import About from "./About";

export default () => {
  const { userToken } = useUser();

  return (
    <>
      <section className="section footer">
        <div className="container">
          <div className="align-center">
            <menu className="footer-top">
              <Link className="foot-link" to={"/"} element={<Homepage />}>
                <img
                  src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb71842883eedf5181e1aa_home.svg"
                  alt="home icon"
                />
                Home
              </Link>

              {userToken ? (
                <>
                  <Link
                    className="foot-link"
                    to={"/projects"}
                    element={<Projects />}
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb746f66fe090b40f3ccf9_gallery.svg"
                      alt="home icon"
                    />
                    Gallery
                  </Link>

                  <Link
                    className="foot-link"
                    to={"/myprofile"}
                    element={<MyProfile />}
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb718479d7a58d180aafbb_user.svg"
                      alt="home icon"
                    />
                    My Profile
                  </Link>
                </>
              ) : (
                <Link className="foot-link" to={"/about"} element={<About />}>
                  <img
                    src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb746f66fe090b40f3ccf9_gallery.svg"
                    alt="home icon"
                  />
                  About
                </Link>
              )}
            </menu>
            <div className="footer-bottom">
              <figure className="footer-logo">
                <img src="../logo.svg" alt="iNSPiREd logo" />
              </figure>

              <div className="socials-wrapper">
                <Link className="social-link">
                  <img
                    src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb7184ff9b432d9bbbc887_instagram.svg"
                    alt="Instagram icon"
                  />
                </Link>

                <Link className="social-link">
                  <img
                    src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb7183810fbcff761ffc58_facebook.svg"
                    alt="Facebook icon"
                  />
                </Link>
                <Link className="social-link">
                  <img
                    src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb718424da4295db4b64df_twitter.svg"
                    alt="Twitter icon"
                  />
                </Link>

                <Link className="social-link">
                  <img
                    src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb7183443bc7bf6d913774_youtube.svg"
                    alt="Youtube icon"
                  />
                </Link>
              </div>
            </div>
            <div className="padding-2"></div>
            <p className="paragraph-S">
              Copyright© 2024 <br /> Alessio Carnino <br />
              Full-Stack Web Developer
            </p>
            <a
              className="paragraph-S accent-color"
              href="mailto:alessiocarnino.web@gmail.com"
            >
              alessiocarnino.web@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
