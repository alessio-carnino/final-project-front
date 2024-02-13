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

  const [currentUser, setCurrentUser] = useState();
  console.log(userToken);
  const [relatedProjects, setRelatedProjects] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/users/${userToken._id}`, axiosHeaders(userToken))
      .then((obj) => setCurrentUser(obj.data))
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${VITE_API_URL}/projects`, axiosHeaders(userToken.token))

  //     .then((obj) => setRelatedProjects(obj.data))
  //     .catch((e) => {
  //       setError(e);
  //       console.error(e);
  //     });
  // }, [currentUser]);

  return (
    <>
      {error ? (
        <NotFound />
      ) : (
        <>
          {currentUser === undefined ? (
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
                      <h1 className="H1">{currentUser.user_name}</h1>

                      <div className="padding-S"></div>
                      <p className="paragraph-L tag">
                        {currentUser.profession_title}
                      </p>
                      <p className="paragraph-L white">{currentUser.email}</p>
                      <div className="padding-1"></div>
                      <p>{currentUser.description}</p>
                    </div>

                    <figure className="talents-image-wrapper">
                      <img
                        className="talent-cover"
                        src={currentUser.cover_img}
                        alt="Cover image"
                      />
                    </figure>
                  </div>

                  <div className="align-center">
                    <button className="button">Edit Profile</button>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
      {/* 
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
              {relatedProjects === undefined ? (
                <p>Loading...</p>
              ) : (
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
              )}
            </>
          )}
        </div>
      </section> */}
    </>
  );
};
