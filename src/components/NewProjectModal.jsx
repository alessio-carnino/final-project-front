import { useState } from "react";

export default ({
  openModalProject,
  formDataProject,
  categories,
  addProject,
  setFormDataProject,
  setOpenModalProject,
  error,
  blankFormProject,
}) => {
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // VALIDATE FORM DATA
    if (
      !formDataProject.title ||
      !formDataProject.cover_img ||
      !formDataProject.description
    ) {
      setFormError("Please fill in all required fields");
      return;
    }
    // ADD PROJECT
    let categoriesArray = [];
    if (formDataProject.category1)
      categoriesArray.push(formDataProject.category1);
    if (formDataProject.category2)
      categoriesArray.push(formDataProject.category2);
    if (formDataProject.category3)
      categoriesArray.push(formDataProject.category3);

    const project = {
      ...formDataProject,
      categories: categoriesArray,
    };

    addProject(project);
    setFormDataProject(blankFormProject);
    setOpenModalProject(false);
  };

  return (
    <div className={openModalProject === true ? "modal-open" : "modal-close"}>
      <button
        className="close-layer"
        onClick={() => setOpenModalProject(false)}
      ></button>
      <div className="modal-content">
        <button className="close" onClick={() => setOpenModalProject(false)}>
          <img
            src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb808a2a6c988cbfde18da_close.svg"
            alt="close icon"
          />
        </button>

        <h3 className="H3">Create a new project</h3>
        <div className="padding-2"></div>

        <form className="sign-form" onSubmit={handleSubmit}>
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

          <label className="form-label two-col">
            Description *
            <textarea
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

          <label className="form-label two-col">
            Description Part 2
            <textarea
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

          <label className="form-label ">
            Category 1 *
            <select
              value={formDataProject.category1}
              onChange={(e) => {
                setFormDataProject({
                  ...formDataProject,
                  category1: e.target.value,
                });
              }}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-label">
            Category 2
            <select
              value={formDataProject.category2}
              onChange={(e) => {
                setFormDataProject({
                  ...formDataProject,
                  category2: e.target.value,
                });
              }}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-label ">
            Category 3
            <select
              value={formDataProject.category3}
              onChange={(e) => {
                setFormDataProject({
                  ...formDataProject,
                  category3: e.target.value,
                });
              }}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </label>

          {formError && <p className="error-message">{formError}</p>}
          {error && <p className="error-message">{error.message}</p>}
          <div className="submit-wrapper">
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
