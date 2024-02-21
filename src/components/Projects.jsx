import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { axiosHeaders } from "../../libraries/utilitites";
import GridProjects from "./GridProjects";
const { VITE_API_URL } = import.meta.env;

export default () => {
  const { userToken } = useUser();

  const [projects, setProjects] = useState();
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState();
  const [selectCategory, setSelectedCategory] = useState(null);
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    let url = `${VITE_API_URL}/projects?page=${page}`;
    if (selectCategory) {
      url += `&categories=${selectCategory}`;
    }
    axios
      .get(url, axiosHeaders(userToken))
      .then((response) => {
        // Sort newest first
        const sortedProjects = response.data.projects.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setProjects(response.data.projects);
        setTotalPages(response.data.totalPages);
      })
      .catch((e) => {
        setError(e);
        console.error(e);
      });
  }, [selectCategory, page, userToken]);

  // CATEGORIES -------------------
  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/categories`, axiosHeaders(userToken))
      .then((obj) => setCategories(obj.data))
      .catch((e) => {
        setError(e);
        console.error(e);
      });
  }, [userToken]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const handleButtonCategoryClick = (categoryId) => {
    setActiveButton(categoryId); // Update active button
    setProjects([]);
    handleCategoryClick(categoryId);
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
                  {/* CATEGORIES ------------------- */}
                  <div className="categories-wrapper">
                    <menu className="categories-component">
                      <div className="fade-left"></div>
                      <div className="fade-right"></div>

                      <button
                        className={`button category ${
                          !activeButton ? "active" : ""
                        }`}
                        onClick={() => {
                          handleButtonCategoryClick(null);
                        }}
                      >
                        All categories
                      </button>

                      {categories.map((c) => {
                        return (
                          <button
                            key={c._id}
                            className={`button category ${
                              activeButton === c._id ? "active" : ""
                            }`}
                            onClick={() => handleButtonCategoryClick(c._id)}
                          >
                            {c.category_name}
                          </button>
                        );
                      })}
                    </menu>
                  </div>

                  <GridProjects
                    projects={projects}
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                    error={error}
                  />
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};
