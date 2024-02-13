import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { axiosHeaders } from "../../libraries/utilitites";
const { VITE_API_URL } = import.meta.env;

export default () => {
  const { userToken } = useUser();

  const [projects, setProjects] = useState();
  console.log(projects);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/projects`, axiosHeaders(userToken))

      .then((obj) => setProjects(obj.data))
      .catch((e) => {
        setError(e);
        console.error(e);
      });
  }, []);

  return (
    <>
      <section className="section header">
        <div className="container">
          <div className="align-center">
            <h1 className="H1">Projects</h1>
            <div className="padding-3"></div>
          </div>

          {error ? (
            <p>{error.message}</p>
          ) : (
            <>
              {projects === undefined ? (
                <p>Loading...</p>
              ) : (
                <div className="gallery-grid">
                  {projects.map((p, i) => {
                    return (
                      <Link
                        key={`project-${i}`}
                        className="gallery-card"
                        to={`/projects/${p._id}`}
                      >
                        <img
                          className="card-img"
                          src={p.cover_img}
                          alt="project cover"
                        />
                        <div className="gallery-card-top">
                          <p className="card-title">{p.title}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};
