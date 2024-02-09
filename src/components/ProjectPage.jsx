import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { axiosHeaders } from "../../libraries/utilitites";
import NotFound from "./NotFound";

const { VITE_API_URL } = import.meta.env;

export default () => {
  const { userData } = useUser();
  const { _id } = useParams();

  const [project, setProject] = useState();
  console.log(project);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/projects/${_id}`, axiosHeaders(userData.token))
      .then((obj) => setProject(obj.data))
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

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
                    <div className="padding-XS "></div>
                    <p className="tag">category</p>
                    <div className="padding-1 "></div>
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
                  <div className="padding-3 "></div>
                  <figure className="project-img-wrapper">
                    <img src={project.img2} alt="cover image" />
                  </figure>
                  <div className="padding-3 "></div>
                  <div className="divider"></div>
                  <div className="padding-3 "></div>
                  // CONTINUARE DA AXIOS.GET PER L'AUTORE DEL PROGETTO!! DIO...
                  <div className="author-component">
                    <figure className="author-img">
                      <img src="" alt="" />
                    </figure>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};
