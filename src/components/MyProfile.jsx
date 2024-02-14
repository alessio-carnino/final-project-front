import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { axiosHeaders } from "../../libraries/utilitites";
import NotFound from "./NotFound";

const { VITE_API_URL } = import.meta.env;

export default () => {
  const { userToken, userId } = useUser();

  const [currentUser, setCurrentUser] = useState();
  const [relatedProjects, setRelatedProjects] = useState();
  const [error, setError] = useState(false);

  // Modal to edit User Profile
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const blankFormProfile = {
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    repeat_password: "",
    profession_title: "",
    cover_img: "",
    description: "",
    description_preview: "",
  };
  const [formDataProfile, setFormDataProfile] = useState(blankFormProfile);

  // Modal to add new Project
  const [openModalProject, setOpenModalProject] = useState(false);
  const blankFormProject = {
    title: "",
    description: "",
    description2: "",
    cover_img: "",
    img1: "",
    img2: "",
    user: { userId },
  };
  const [formDataProject, setFormDataProject] = useState(blankFormProject);

  const [feedback, setFeedback] = useState();
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/users/${userId}`, axiosHeaders(userToken))
      .then((obj) => setCurrentUser(obj.data))
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/projects?userId=${userId}`, axiosHeaders(userToken))

      .then((obj) => setRelatedProjects(obj.data))
      .catch((e) => {
        setError(e);
        console.error(e);
      });
  }, [currentUser]);

  const addProject = (body) => {
    axios
      .post(`${VITE_API_URL}/projects`, body, axiosHeaders(userToken))
      .then(() => {
        setRefresh(!refresh);
        setFeedback("Project added successfully");
      })
      .catch((e) => {
        setFeedback("Please insert valid data");
        console.error(e);
      });
  };

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

                      <div className="padding-2"></div>
                      <div className="buttons-wrapper">
                        <button
                          className="button"
                          onClick={() => setOpenModalProfile(true)}
                        >
                          Edit Profile
                        </button>
                        <button
                          className="button secondary"
                          onClick={() => setOpenModalProject(true)}
                        >
                          Create New Project
                        </button>
                      </div>

                      <div
                        className={
                          openModalProfile === true
                            ? "modal-open"
                            : "modal-close"
                        }
                      >
                        <button
                          className="close-layer"
                          onClick={() => setOpenModalProfile(false)}
                        ></button>
                        <div className="modal-content">
                          <button onClick={() => setOpenModalProfile(false)}>
                            <img
                              className="close"
                              src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb808a2a6c988cbfde18da_close.svg"
                              alt="close icon"
                            />
                          </button>

                          <h3 className="H3">Edit your profile</h3>
                          <div className="padding-S"></div>

                          <p className="paragraph-S">
                            Fill any field you want to edit to change you info
                          </p>
                          <div className="padding-2"></div>

                          <form className="sign-form">
                            <label className="form-label">
                              First Name
                              <input
                                type="text"
                                value={formDataProfile.first_name}
                                onChange={(e) => {
                                  setFormDataProfile({
                                    ...formDataProfile,
                                    first_name: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Last Name
                              <input
                                type="text"
                                value={formDataProfile.last_name}
                                onChange={(e) => {
                                  setFormDataProfile({
                                    ...formDataProfile,
                                    last_name: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              User Name
                              <input
                                type="text"
                                value={formDataProfile.user_name}
                                onChange={(e) => {
                                  setFormDataProfile({
                                    ...formDataProfile,
                                    user_name: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Email
                              <input
                                type="email"
                                value={formDataProfile.email}
                                onChange={(e) => {
                                  setFormDataProfile({
                                    ...formDataProfile,
                                    email: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Password
                              <input
                                type="password"
                                value={formDataProfile.password}
                                onChange={(e) => {
                                  setFormDataProfile({
                                    ...formDataProfile,
                                    password: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Repeat Password
                              <input
                                type="password"
                                value={formDataProfile.repeat_password}
                                onChange={(e) => {
                                  setFormDataProfile({
                                    ...formDataProfile,
                                    repeat_password: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Profession Title
                              <input
                                type="text"
                                value={formDataProfile.profession_title}
                                onChange={(e) => {
                                  setFormDataProfile({
                                    ...formDataProfile,
                                    profession_title: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label">
                              Cover Image Url
                              <input
                                type="text"
                                value={formDataProfile.cover_img}
                                onChange={(e) => {
                                  setFormDataProfile({
                                    ...formDataProfile,
                                    cover_img: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label two-col">
                              Description
                              <input
                                type="text"
                                value={formDataProfile.description}
                                onChange={(e) => {
                                  setFormDataProfile({
                                    ...formDataProfile,
                                    description: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <label className="form-label two-col">
                              Description preview
                              <input
                                type="text"
                                value={formDataProfile.description_preview}
                                onChange={(e) => {
                                  setFormDataProfile({
                                    ...formDataProfile,
                                    description_preview: e.target.value,
                                  });
                                }}
                              />
                            </label>

                            <div className="submit-wrapper">
                              <button
                                className="button"
                                onClick={() => {
                                  editProfile(formDataProfile);
                                  setFormDataProfile(blankFormProfile);
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
                    </div>

                    <figure className="talents-image-wrapper">
                      <img
                        className="talent-cover"
                        src={currentUser.cover_img}
                        alt="Cover image"
                      />
                    </figure>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      <section className="section">
        <div className="container">
          {error ? (
            <p>{error.message}</p>
          ) : (
            <>
              {relatedProjects === undefined ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="align-center">
                    <h2 className="H2">Your Projects</h2>
                    <div className="padding-3"></div>
                  </div>
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
                </>
              )}
            </>
          )}

          {/* // CREATE NEW PROJECT FORM -------- */}
          <div className="align-center">
            <div className="padding-3"></div>
            <button
              className="button"
              onClick={() => setOpenModalProject(true)}
            >
              Create New Project
            </button>
          </div>
          <div
            className={openModalProject === true ? "modal-open" : "modal-close"}
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

              <h3 className="H3">Create a new project</h3>
              <div className="padding-2"></div>

              <form className="sign-form">
                <label className="form-label">
                  Project Title *
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
                  Description *
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
                  Cover Image *
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
                      addProject(formDataProject);
                      setFormDataProject(blankFormProject);
                    }}
                  >
                    Submit
                  </button>
                </div>
                {error && <p className="paragraph-L">{error.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
