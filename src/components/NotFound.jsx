import { Link } from "react-router-dom";
import Homepage from "./Homepage";

export default () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="align-center">
            <h1 className="H1">404</h1>
            <h2 className="H3">Page not found</h2>
            <div className="padding-5"></div>
            <Link className={"button"} to={"/"} element={<Homepage />}>
              Homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
