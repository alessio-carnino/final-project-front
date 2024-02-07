import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default () => {
  const { error, loading } = useUser();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    repeat_password: "",
    profession_title: "",
    cover_img: "",
  });

  const navigate = useNavigate();

  const signUser = (e) => {
    e.preventDefault();

    signUp(formData);

    navigate("/");
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="align-center">
            <h1 className="H1">Sing up</h1>
          </div>

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
              User Name
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

            <label className="form-label">
              Repeat Password
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

            <div className="submit-wrapper">
              <button
                className="button"
                disabled={loading}
                onClick={(e) => signUser(e)}
              >
                Submit
              </button>
            </div>
            {loading && <p className="paragraph-L">Loading...</p>}
            {error && <p className="paragraph-L">{error.message}</p>}
          </form>
        </div>
      </section>
    </>
  );
};
