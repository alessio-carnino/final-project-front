import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default () => {
  const { logIn, error, loading, userData } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signUser = (e) => {
    e.preventDefault();
    logIn(formData);
  };

  useEffect(() => {
    if (userData !== null) {
      navigate("/");
    }
  }, [userData]);
  return (
    <>
      <section className="section header">
        <div className="container">
          <div className="align-center">
            <h1 className="H1">Log in</h1>
            <div className="padding-3"></div>
          </div>

          <form className="sign-form">
            <label className="form-label">
              Email
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
              Password
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
            {error && <p className="paragraph-L">{error.message}</p>}
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
