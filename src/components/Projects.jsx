import axios from "axios";
import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;
import { Link } from "react-router-dom";

export default () => {
  const [projects, setProjects] = useState();
  console.log(projects);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/projects`)
      .then((obj) => setProjects(obj.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="align-center">
            <h1 className="H1">Gallery</h1>
          </div>
          <div className="gallery-grid">
            <Link className="gallery-card">
              <img
                src="https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="project cover"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
