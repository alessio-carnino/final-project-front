import { Link } from "react-router-dom";
import NotFound from "./NotFound";

export default ({ projects, page, totalPages, setPage, error }) => {
  // NEXT PAGE
  const handleNextPage = () => {
    setPage(page + 1);
  };

  // PREV PAGE
  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="grid-component">
      {error ? (
        <NotFound />
      ) : (
        <>
          {projects.length === 0 ? (
            <div className="align-center">
              <h3 className="paragraph-L">Loading...</h3>
            </div>
          ) : (
            <>
              <div className="gallery-grid">
                {projects.map((p, i) => {
                  return (
                    <Link
                      key={`project-${i}`}
                      className="gallery-card"
                      to={`/projects/${p._id}`}
                      onClick={() => {
                        navigate(`/projects/${p._id}`);
                        window.location.reload();
                      }}
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
            </>
          )}
        </>
      )}

      {/* PAGINATION -------------- */}
      {totalPages <= 1 ? null : (
        <div className="pagination">
          <span>{`Page ${page} of ${totalPages}`}</span>
          <div className="buttons-wrapper pages">
            <button
              className="button pagination"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              className="button pagination"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
