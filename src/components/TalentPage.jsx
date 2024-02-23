import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { axiosHeaders } from "../../libraries/utilitites";
import NotFound from "./NotFound";
import GridProjects from "./GridProjects";

const { VITE_API_URL } = import.meta.env;

export default () => {
  const { userToken } = useUser();
  const { _id } = useParams();

  const [talent, setTalent] = useState();
  const [relatedProjects, setRelatedProjects] = useState();
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // CALL TO CURRENT USER
  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/users/${_id}`, axiosHeaders(userToken))
      .then((obj) => setTalent(obj.data))
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  // CALL TO PROJECTS FROM THE SAME USER ----------
  useEffect(() => {
    if (_id)
      axios
        .get(
          `${VITE_API_URL}/projects?userId=${_id}&page=${page}`,
          axiosHeaders(userToken)
        )
        .then((response) => {
          setRelatedProjects(response.data.projects);
          setTotalPages(response.data.totalPages);
        })
        .catch((e) => {
          setError(e);
          console.error(e);
        });
  }, [page, _id, talent]);

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
                    <div className="talents-component-content slide-up">
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
              <section className="section header">
                <div className="container">
                  {relatedProjects === undefined ? (
                    <p>Loading...</p>
                  ) : relatedProjects.length === 0 ? (
                    <div className="align-center">
                      <p className="paragraph-L">No projects available</p>
                    </div>
                  ) : (
                    <GridProjects
                      projects={relatedProjects}
                      page={page}
                      totalPages={totalPages}
                      setPage={setPage}
                    />
                  )}
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};
