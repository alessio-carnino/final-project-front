import { Link } from "react-router-dom";
import Homepage from "./Homepage";

export default () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1>404</h1>
          <h2>Page not found</h2>
          <Link className={"button"} to={"/"} element={<Homepage />}>
            Homepage
          </Link>
        </div>
      </section>
    </>
  );
};
