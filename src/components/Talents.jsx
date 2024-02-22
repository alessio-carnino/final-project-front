import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { axiosHeaders } from "../../libraries/utilitites";
import MyProfile from "./MyProfile";
const { VITE_API_URL } = import.meta.env;

export default () => {
  const { userToken, userId } = useUser();

  const [users, setUsers] = useState();
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/users?page=${page}`, axiosHeaders(userToken))
      .then((response) => {
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      })
      .catch((e) => {
        setError(e.message);
        console.error(e);
      });
  }, [page, userToken]);

  // NEXT PAGE
  const handleNextPage = () => {
    setPage(page + 1);
  };

  // PREV PAGE
  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      <section className="section header">
        <div className="container">
          <div className="talents-header-component">
            <div className="talents-component-content">
              <h1 className="H1">
                Our <span className="accent-color">talents</span>
              </h1>
              <div className="padding-1"></div>
              <p className="paragraph-L">
                Step into the spotlight at <b>iNSPiREd</b> with our 'Our
                Talents' page—a curated showcase of diverse and remarkable
                skills within our community. From artistry to innovation,
                explore the unique talents that define us. Join us in
                celebrating the rich tapestry of skills that makes our community
                thrive.
              </p>
              <div className="padding-1"></div>
            </div>
            <figure className="talents-image-wrapper">
              <img
                src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65ca1da9f78ae0759503a066_talents%20img.webp"
                alt="image of talents"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {error ? (
            <p>{error.message}</p>
          ) : (
            <>
              {users === undefined ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="talents-grid">
                    {users.map((u, i) => {
                      return (
                        <Link
                          key={`talent-${i}`}
                          className="talent-card"
                          to={
                            u._id === userId
                              ? `/myprofile`
                              : `/talents/${u._id}`
                          }
                          element={<MyProfile />}
                        >
                          <img
                            className="talent-card-img"
                            src={u.cover_img}
                            alt="talent cover"
                          />
                          <div className="talent-card-info">
                            <h3 className="paragraph-L">{u.user_name}</h3>
                            <p>{u.profession_title}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* PAGINATION -------------- */}
                  {totalPages <= 1 ? null : (
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
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};
