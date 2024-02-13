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
  const [openModal, setOpenModal] = useState(false);
  const blankFormData = {
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

  const [formData, setFormData] = useState(blankFormData);
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

  const editProfile = (newProps) => {
    const validProps = {};
    Object.entries(newProps).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
        validProps[key] = value;
      }
    });
    if (Object.keys(validProps).length > 0) {
      axios
        .patch(
          `${VITE_API_URL}/users/${userId}`,
          validProps,
          axiosHeaders(userToken)
        )
        .then((obj) => {
          setFeedback("Profile updated successfully");
          setCurrentUser(obj.data);
          navigate(`/users/${userId}`);
          setRefresh(!refresh);
        })
        .catch((e) => {
          setFeedback("Please insert valid data");
          console.error(e.message);
        });
    }
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
                    </div>

                    <figure className="talents-image-wrapper">
                      <img
                        className="talent-cover"
                        src={currentUser.cover_img}
                        alt="Cover image"
                      />
                    </figure>
                  </div>

                  <div className="align-center">
                    <div className="padding-3"></div>
                    <button
                      className="button"
                      onClick={() => setOpenModal(true)}
                    >
                      Edit Profile
                    </button>

                    <div
                      className={
                        openModal === true ? "modal-open" : "modal-close"
                      }
                    >
                      <button
                        className="close-layer"
                        onClick={() => setOpenModal(false)}
                      ></button>
                      <div className="modal-content">
                        <button onClick={() => setOpenModal(false)}>
                          <img
                            className="close"
                            src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb808a2a6c988cbfde18da_close.svg"
                            alt="close icon"
                          />
                        </button>

                        <h3 className="H3">Edit your profile</h3>

                        <form className="sign-form">
                          <label className="form-label">
                            First Name
                            <input
                              type="text"
                              value={formData.first_name}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  first_name: e.target.value,
                                });
                              }}
                            />
                          </label>

                          <label className="form-label">
                            Last Name
                            <input
                              type="text"
                              value={formData.last_name}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  last_name: e.target.value,
                                });
                              }}
                            />
                          </label>

                          <label className="form-label">
                            User Name *
                            <input
                              type="text"
                              value={formData.user_name}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  user_name: e.target.value,
                                });
                              }}
                            />
                          </label>

                          <label className="form-label">
                            Email *
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                });
                              }}
                            />
                          </label>

                          <label className="form-label">
                            Password *
                            <input
                              type="password"
                              value={formData.password}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  password: e.target.value,
                                });
                              }}
                            />
                          </label>

                          <label className="form-label">
                            Repeat Password *
                            <input
                              type="password"
                              value={formData.repeat_password}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  repeat_password: e.target.value,
                                });
                              }}
                            />
                          </label>

                          <label className="form-label">
                            Profession Title
                            <input
                              type="text"
                              value={formData.profession_title}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  profession_title: e.target.value,
                                });
                              }}
                            />
                          </label>

                          <label className="form-label">
                            Cover Image Url
                            <input
                              type="text"
                              value={formData.cover_img}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  cover_img: e.target.value,
                                });
                              }}
                            />
                          </label>

                          <label className="form-label two-col">
                            Description
                            <input
                              type="text"
                              value={formData.description}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                });
                              }}
                            />
                          </label>

                          <label className="form-label two-col">
                            Description preview
                            <input
                              type="text"
                              value={formData.description_preview}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  description_preview: e.target.value,
                                });
                              }}
                            />
                          </label>

                          <div className="submit-wrapper">
                            <button
                              className="button"
                              onClick={() => {
                                editProfile(formData);
                                setFormData(blankFormData);
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      <section className="section">
        <div className="container">
          <div className="align-center">
            <h1 className="H1">Projects</h1>
            <div className="padding-3"></div>
          </div>

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
