import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default () => {
  const { signUp, error, loading, userToken } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
  });

  // State to check if passwords match
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const signUser = (e) => {
    e.preventDefault();
    if (formData.password !== formData.repeat_password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      signUp(formData);
    }
  };

  useEffect(() => {
    if (userToken !== null) {
      navigate("/");
    }
  }, [userToken]);

  return (
    <>
      <section className="section header">
        <div className="container">
          <div className="align-center">
            <h1 className="H1 slide-up">Sign up</h1>
            <div className="padding-3"></div>
          </div>

          <form className="sign-form">
            <label className="form-label">
              First Name *
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
              Last Name *
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
                  setPasswordsMatch(formData.password === e.target.value);
                }}
              />
              {!passwordsMatch && (
                <p className="paragraph-S red">Passwords do not match</p>
              )}
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
              <textarea
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
              <textarea
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
                disabled={loading}
                onClick={(e) => {
                  return signUser(e);
                }}
              >
                Submit
              </button>
            </div>
            {loading && <p className="paragraph-L">Loading...</p>}
            {error && (
              <p className="paragraph-L red">
                All required fields must be filled
              </p>
            )}
          </form>
          <figure className="sign-figure">
            <img
              src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65c4c653c37bc8bad2d4fc88_signup%20img.svg"
              alt="graphic of a person walking the stairs"
            />
          </figure>
        </div>

        <img
          className="bg-img-1"
          src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65c4c797b3ff44000855af1d_keyboard.svg"
          alt="decorative keyboard"
        />
        <img
          className="bg-img-2"
          src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65c4c797d21f1fd78adf232e_mail.svg"
          alt="decorative letter"
        />
      </section>
    </>
  );
};
