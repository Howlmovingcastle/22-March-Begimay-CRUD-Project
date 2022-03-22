import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { videosContext } from "../../contexts/VideosContext";

const Details = () => {
  const { getOneVideo, oneVideo } = useContext(videosContext);

  const params = useParams();

  useEffect(() => {
    getOneVideo(params.id);
  }, []);

  return oneVideo ? (
    <div>
      <h3>{oneVideo.title}</h3>
      <h4>{oneVideo.genre}</h4>
      <h5>Description</h5>
      <div>{oneVideo.description}</div>
      <img src={oneVideo.imageTitle} alt="Image Title" />
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default Details;
