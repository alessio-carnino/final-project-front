export default ({}) => {
  return (
    <>
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

            <div className="submit-wrapper">
              <button
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  let categories = [formDataProject.category1];
                  if (formDataProject.category2) {
                    categories.push(formDataProject.category2);
                  }
                  if (formDataProject.category3) {
                    categories.push(formDataProject.category3);
                  }
                  const project = {
                    ...formDataProject,
                    categories: categories,
                  };
                  addProject(project);
                  setFormDataProject(blankFormProject);
                  setOpenModalProject(false);
                  navigate(`/myprofile`);
                }}
              >
                Submit
              </button>
            </div>
            {error && <p className="paragraph-L">{error.message}</p>}
          </form>
        </div>
      </div>
    </>
  );
};
