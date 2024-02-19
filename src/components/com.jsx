<div className={openModalDelete === true ? "modal-open" : "modal-close"}>
  <button
    className="close-layer"
    onClick={() => setOpenModalDelete(false)}
  ></button>

  <div className="modal-content">
    <button onClick={() => setOpenModalDelete(false)}>
      <img
        className="close"
        src="https://uploads-ssl.webflow.com/6389024564c0eaae543c5b10/65cb808a2a6c988cbfde18da_close.svg"
        alt="close icon"
      />
    </button>

    <h3 className="H3">{`Are you sure you want to delete project ${ProjectPage.title}`}</h3>
    <div className="padding-2"></div>
  </div>
</div>;
