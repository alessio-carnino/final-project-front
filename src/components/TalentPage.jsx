import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { axiosHeaders } from "../../libraries/utilitites";
import NotFound from "./NotFound";

const { VITE_API_URL } = import.meta.env;

export default () => {
  const { userToken } = useUser();
  const { _id } = useParams();

  const [talent, setTalent] = useState();
  const [relatedProjects, setRelatedProjects] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/users/${_id}`, axiosHeaders(userToken))
      .then((obj) => setTalent(obj.data))
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/projects?userId=${_id}`, axiosHeaders(userToken))

      .then((obj) => setRelatedProjects(obj.data))
      .catch((e) => {
        setError(e);
        console.error(e);
      });
  }, [talent]);

  return (
    <>
      {error ? (
        <NotFound />
      ) : (
        <>
          {talent === undefined ? (
            <>
              <div className="align-center">
                <h3 className="paragraph-L">Loading...</h3>
              </div>
            </>
          ) : (
            <>
              <section className="section header">
                <div className="container">
                  <div className="talents-header-component">
                    <div className="talents-component-content">
                      <h1 className="H1">{talent.user_name}</h1>

                      <div className="padding-S"></div>
                      <p className="paragraph-L tag">
                        {talent.profession_title}
                      </p>
                      <p className="paragraph-L white">{talent.email}</p>
                      <div className="padding-2"></div>
                      <p>{talent.description}</p>
                    </div>

                    <figure className="talents-image-wrapper">
                      <img
                        className="talent-cover"
                        src={talent.cover_img}
                        alt="Cover image"
                      />
                    </figure>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      {error ? (
        <>
          <section className="section header">
            <div className="container">
              <div className="align-center">
                <h1 className="H1">Projects</h1>
                <p>{error.message}</p>
                <div className="padding-3"></div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {relatedProjects === undefined ? (
            <p>Loading...</p>
          ) : (
            <section className="section header">
              <div className="container">
                <div className="align-center">
                  <h1 className="H1">Projects</h1>
                  <div className="padding-3"></div>
                </div>
                <div className="gallery-grid">
                  {relatedProjects.map((p, i) => {
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
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};
