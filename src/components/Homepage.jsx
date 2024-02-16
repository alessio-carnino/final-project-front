import { useUser } from "../../context/UserContext";
import About from "./About";
import Projects from "./Projects";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";

export default () => {
  const { userToken } = useUser();

  return (
    <>
      <section className="section hero">
        <div className="container">
          <div className="hero-component">
            <div className="hero-content">
              <h1 className="H3">Elevate Your Creativity with</h1>
              <figure className="hero-logo">
                <img src="../logo.svg" alt="iNSPiREd logo" />
              </figure>
              <div className="padding-1-5"></div>
              <p className="paragraph-L">
                Discover a digital haven for creators! iNSPiREd is your canvas
                to showcase, collaborate, and be inspired. Unleash your talent,
                connect with a vibrant community, and let your creativity soar.
              </p>
              <div className="padding-2"></div>

              <div className="buttons-wrapper">
                {userToken ? (
                  <>
                    <Link to={"/projects"} element={<Projects />}>
                      <button className="button">Get Inspired</button>
                    </Link>
                    <Link to={"/about"} element={<About />}>
                      <button className="button secondary">Learn More</button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={"/signup"} element={<SignUp />}>
                      <button className="button">Join Now</button>
                    </Link>
                    <Link to={"/about"} element={<About />}>
                      <button className="button secondary">Learn More</button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            <figure className="hero-img-wrapper">
              <img
                src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65c4db97d61b0998c6e815c7_hero%20img.svg"
                alt="grphic of a person looking for inspiration online"
              />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
};
