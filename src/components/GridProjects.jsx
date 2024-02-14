import { useState } from "react";
import { Link } from "react-router-dom";

export default ({ projects, page, totalPages }) => {
  return (
    <>
      <div className="gallery-grid">
        {projects.map((p, i) => {
          return (
            <Link
              key={`project-${i}`}
              className="gallery-card"
              to={`/projects/${p._id}`}
            >
              <img className="card-img" src={p.cover_img} alt="project cover" />
              <div className="gallery-card-top">
                <p className="card-title">{p.title}</p>
                <p className="card-user">{p.user}</p>
              </div>
            </Link>
          );
        })}
      </div>
      NON FUNZIONA LA PAGINAZIONE!!
      {/* PAGINATION -------------- */}
      {/* <div className="pagination">
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
      </div> */}
    </>
  );
};
