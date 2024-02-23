import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import { useUser } from "../../context/UserContext";
import Projects from "./Projects";

export default () => {
  const { userToken } = useUser();

  return (
    <>
      <section className="section header">
        <div className="container">
          <div className="about-component">
            <div className="about-content slide-up">
              <h1 className="H1">
                Our <span className="accent-color">purpose</span>
              </h1>
              <div className="padding-1-5"></div>
              <p>
                We're on a mission to inspire and connect individuals with
                shared interests. Every story is unique and valuable, and we're
                here to create a space where creativity thrives. Join us in
                celebrating diversity, encouraging collaboration, and building
                something extraordinary together!{" "}
              </p>
              <div className="padding-2"></div>
              {userToken ? (
                <Link to={"/projects"} element={<Projects />}>
                  <button className="button fade-in">Get Inspired</button>
                </Link>
              ) : (
                <Link to={"/signup"} element={<SignUp />}>
                  <button className="button fade-in">Join Now</button>
                </Link>
              )}
            </div>

            <figure className="about-img-wrapper">
              <img
                src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65c4dc238275bf382c015963_about%20img.svg"
                alt="grphic of a person looking for inspiration online"
              />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
};
