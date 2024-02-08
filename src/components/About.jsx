import { Link } from "react-router-dom";
import SignUp from "./SignUp";

export default () => {
  return (
    <>
      <section className="section header">
        <div className="container">
          <div className="about-component">
            <div className="about-content">
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
              <Link to={"/signup"} element={<SignUp />}>
                <button className="button">Join Now</button>
              </Link>
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
