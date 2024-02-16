import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { axiosHeaders } from "../../libraries/utilitites";
import NotFound from "./NotFound";
import MyProfile from "./MyProfile";
import GridProjects from "./GridProjects";

const { VITE_API_URL } = import.meta.env;

export default () => {
  const { userToken, userId } = useUser();
  const { _id } = useParams();

  const [project, setProject] = useState();
  const [relatedProjects, setRelatedProjects] = useState();
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const talentId = project?.user?._id;

  // Modal to edit Project
  const [openModalProject, setOpenModalProject] = useState(false);
  const blankFormProject = {
    title: "",
    description: "",
    description2: "",
    cover_img: "",
    img1: "",
    img2: "",
  };
  const [formDataProject, setFormDataProject] = useState(blankFormProject);

  const [feedback, setFeedback] = useState();
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  // CALL TO CURRENT PROJECT ----------
  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/projects/${_id}`, axiosHeaders(userToken))
      .then((obj) => setProject(obj.data))
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, [_id, userToken]);

  // CALL TO PROJECTS FROM THE SAME USER ----------
  useEffect(() => {
    if (talentId)
      axios
        .get(
          `${VITE_API_URL}/projects?userId=${talentId}&page=${page}`,
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
  }, [page, talentId, userToken]);

  const editProject = (newProps) => {
    const validProps = {};
    Object.entries(newProps).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
        validProps[key] = value;
      }
    });
    if (Object.keys(validProps).length > 0) {
      axios
        .patch(
          `${VITE_API_URL}/projects/${project._id}`,
          validProps,
          axiosHeaders(userToken)
        )
        .then((obj) => {
          setFeedback("Project updated successfully");
          setRefresh(!refresh);
        })
        .catch((e) => {
          setFeedback("Please insert valid data");
          console.error(e.message);
        });
    }
  };

  const deleteProject = (id) => {
    axios
      .delete(
        `${VITE_API_URL}/projects/${project._id}`,
        axiosHeaders(userToken)
      )
      .then(() => {
        setFeedback("Project deleted successfully");
        setRefresh(!refresh);
        navigate("/myprofile");
      })
      .catch((e) => {
        setError(e);
        console.error(e.message);
      });
  };

  return (
    <>
      <section id="project-header" className="section header">
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
                  {/* MODAL FORM TO EDIT PROJECT -------------------- */}
                  {userId === talentId ? (
                    <>
                      <div className="align-center">
                        <div className="buttons-wrapper center">
                          <button
                            className="button"
                            onClick={() => setOpenModalProject(true)}
                          >
                            Edit Project
                          </button>

                          {/* DELETE BUTTON  */}
                          <button
                            className="button secondary"
                            onClick={() => {
                              deleteProject(project._id);
                              navigate("/projects");
                            }}
                          >
                            Delete Project
                          </button>
                        </div>

                        <div className="padding-3"></div>
                      </div>
                      <div
                        className={
                          openModalProject === true
                            ? "modal-open"
                            : "modal-close"
                        }
                      >
                        <button
                          className="close-layer"
                          onClick={() => setOpenModalProject(false)}
                        ></button>
                        <div className="modal-content">
                          <button onClick={() => setOpenModalProject(false)}>
                            <img
                              className="close"
                              src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb808a2a6c988cbfde18da_close.svg"
                              alt="close icon"
                            />
                          </button>

                          <h3 className="H3">Edit project</h3>
                          <div className="padding-2"></div>

                          <form className="sign-form">
                            <label className="form-label">
                              Project Title
                              <input
                                type="text"
                                value={formDataProject.title}
                                onChange={(e) => {
                                  setFormDataProject({
                                    ...formDataProject,
                                    title: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Description
                              <input
                                type="text"
                                value={formDataProject.description}
                                onChange={(e) => {
                                  setFormDataProject({
                                    ...formDataProject,
                                    description: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Description Part 2
                              <input
                                type="text"
                                value={formDataProject.description2}
                                onChange={(e) => {
                                  setFormDataProject({
                                    ...formDataProject,
                                    description2: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Cover Image
                              <input
                                type="text"
                                value={formDataProject.cover_img}
                                onChange={(e) => {
                                  setFormDataProject({
                                    ...formDataProject,
                                    cover_img: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Image 1
                              <input
                                type="text"
                                value={formDataProject.img1}
                                onChange={(e) => {
                                  setFormDataProject({
                                    ...formDataProject,
                                    img1: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Image 2
                              <input
                                type="text"
                                value={formDataProject.img2}
                                onChange={(e) => {
                                  setFormDataProject({
                                    ...formDataProject,
                                    img2: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <div className="submit-wrapper">
                              <button
                                className="button"
                                onClick={() => {
                                  editProject(formDataProject);
                                  setFormDataProject(blankFormProject);
                                }}
                              >
                                Submit
                              </button>
                            </div>
                            {error && (
                              <p className="paragraph-L">{error.message}</p>
                            )}
                          </form>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div className="align-center">
                    <h1 className="H1">{project.title}</h1>
                    <div className="padding-S "></div>
                    {project.categories.map((c, i) => {
                      return (
                        <p key={`cat-${i}`} className="tag">
                          {c.category_name}
                        </p>
                      );
                    })}

                    <div className="padding-2 "></div>
                  </div>
                  <div className="project-info">
                    <p>{project.user.user_name}</p>
                    <p>LIKES</p>
                  </div>
                  <div className="padding-1 "></div>
                  <figure className="project-img-wrapper">
                    <img src={project.cover_img} alt="cover image" />
                  </figure>
                  <p>{project.description}</p>
                  {project.img1 ? (
                    <>
                      <div className="padding-3 "></div>
                      <figure className="project-img-wrapper">
                        <img src={project.img1} alt="cover image" />
                      </figure>
                    </>
                  ) : null}
                  <p>{project.description2}</p>
                  {project.img2 ? (
                    <>
                      <div className="padding-3 "></div>
                      <figure className="project-img-wrapper">
                        <img src={project.img2} alt="cover image" />
                      </figure>
                    </>
                  ) : null}
                  {talentId === userId ? (
                    <>
                      <div className="align-center">
                        <div className="padding-3"></div>
                        <div className="buttons-wrapper center">
                          <button
                            className="button"
                            onClick={() => setOpenModalProject(true)}
                          >
                            Edit Project
                          </button>

                          {/* DELETE BUTTON  */}
                          <button
                            className="button secondary"
                            onClick={() => {
                              deleteProject(project._id);
                              navigate("/projects");
                            }}
                          >
                            Delete Project
                          </button>
                        </div>

                        <div className="padding-3"></div>
                      </div>
                    </>
                  ) : null}
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
                      <h2 className="H3">{project.user.user_name}</h2>
                      <p className="paragraph-L">
                        {project.user.profession_title}
                      </p>
                      <div className="padding-1"></div>
                      <p>{project.user.description_preview}</p>
                      <div className="padding-2"></div>
                      <Link
                        to={
                          talentId === userId
                            ? `/myprofile`
                            : `/talents/${project.user._id}`
                        }
                        element={<MyProfile />}
                      >
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

      {/* RELATED PROJECTS */}
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
                <GridProjects
                  projects={relatedProjects}
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};
