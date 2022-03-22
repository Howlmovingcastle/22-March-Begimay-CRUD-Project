import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { videosContext } from "../../contexts/VideosContext";

const Edit = () => {
  const { getOneVideo, oneVideo, updatedVideo } = useContext(videosContext);
  const navigate = useNavigate();

  const [edit, setEdit] = useState(null);

  const params = useParams();

  useEffect(() => {
    getOneVideo(params.id);
  }, []);

  useEffect(() => {
    setEdit(oneVideo);
  }, [oneVideo]);

  function handleValues(e) {
    let edited = {
      ...edit,
      [e.target.name]: e.target.value,
    };
    setEdit(edited);
  }

  function save() {
    updatedVideo(params.id, edit);
    navigate("/");
  }

  return (
    <>
      {edit ? (
        <div>
          <input
            onChange={handleValues}
            type="text"
            value={edit.title}
            name="title"
          />
          <input
            onChange={handleValues}
            type="text"
            value={edit.imageTitle}
            name="imageTitle"
          />
          <input
            onChange={handleValues}
            type="text"
            value={edit.genre}
            name="genre"
          />
          <input
            onChange={handleValues}
            type="text"
            value={edit.description}
            name="description"
          />
          <button onClick={save}>Save</button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Edit;
