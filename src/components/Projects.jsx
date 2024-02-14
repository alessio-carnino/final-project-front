import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { axiosHeaders } from "../../libraries/utilitites";
const { VITE_API_URL } = import.meta.env;
// SSwefjhqwebfpiweabvpwaijevbpawjvbpwabBPIRWEBVEPRAIVBAPBC
export default () => {
  const { userToken } = useUser();

  const [projects, setProjects] = useState();
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/projects?page=${page}`, axiosHeaders(userToken))
      .then((response) => {
        setProjects(response.data.projects);
        setTotalPages(response.data.totalPages);
      })
      .catch((e) => {
        setError(e);
        console.error(e);
      });
  }, [page, userToken]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

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
                <>
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
                            <p className="card-user">{p.user}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* PAGINATION -------------- */}
                  <div className="pagination">
                    <span>{`Page ${page} of ${totalPages}`}</span>
                    <div className="buttons-wrapper">
                      <button
                        className="button secondary"
                        onClick={handlePrevPage}
                        disabled={page === 1}
                      >
                        Prev
                      </button>
                      <button
                        className="button secondary"
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                      >
                        Next
                      </button>
                    </div>
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
