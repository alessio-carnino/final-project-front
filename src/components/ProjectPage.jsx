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

  const [project, setProject] = useState();
  const [relatedProjects, setRelatedProjects] = useState();
  const [error, setError] = useState(false);

  const talentId = project?.user?._id;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/projects/${_id}`, axiosHeaders(userToken))
      .then((obj) => setProject(obj.data))
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (talentId)
      axios
        .get(
          `${VITE_API_URL}/projects?userId=${talentId}`,
          axiosHeaders(userToken)
        )

        .then((obj) => setRelatedProjects(obj.data))
        .catch((e) => {
          setError(e);
          console.error(e);
        });
  }, [talentId]);

  return (
    <>
      <section className="section header">
        <div className="container small">
          {error ? (
            <NotFound />
          ) : (
            <>
              {project === undefined ? (
                <>
                  <div className="align-center">
                    <h3 className="paragraph-L">Loading...</h3>
                  </div>
                </>
              ) : (
                <>
                  <div className="align-center">
                    <h1 className="H1">{project.title}</h1>
                    <div className="padding-S "></div>
                    <p className="tag">category</p>
                    <div className="padding-2 "></div>
                  </div>
                  <div className="project-info">
                    <p>DATE</p>
                    <p>LIKES</p>
                  </div>
                  <div className="padding-1 "></div>
                  <figure className="project-img-wrapper">
                    <img src={project.cover_img} alt="cover image" />
                  </figure>
                  <p>{project.description}</p>
                  <div className="padding-3 "></div>
                  <figure className="project-img-wrapper">
                    <img src={project.img1} alt="cover image" />
                  </figure>
                  <p>{project.description2}</p>
                  <div className="padding-3 "></div>
                  <figure className="project-img-wrapper">
                    <img src={project.img2} alt="cover image" />
                  </figure>
                  <div className="padding-3 "></div>
                  <div className="divider"></div>
                  <div className="padding-3 "></div>
                  <div className="author-card-component">
                    <figure className="author-img">
                      <img
                        src={project.user.cover_img}
                        alt="Author cover image"
                      />
                    </figure>

                    <div className="author-card-content">
                      <h2 className="H2">{project.user.user_name}</h2>
                      <p className="paragraph-L">
                        {project.user?.profession_title}
                      </p>
                      <div className="padding-1"></div>
                      <p>{project.user.description_preview}</p>
                      <div className="padding-2"></div>
                      <Link to={`/users/${project.user._id}`}>
                        <button className="button">Learn More</button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="H2">
            {project && project.user && project.user.user_name
              ? `Other projects by ${project.user.user_name}`
              : "Loading..."}
          </h2>
          <div className="padding-3"></div>

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
      </section>
    </>
  );
};
