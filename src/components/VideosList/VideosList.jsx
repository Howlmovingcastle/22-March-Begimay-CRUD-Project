import { useContext, useEffect, useState } from "react";
import { videosContext } from "../../contexts/VideosContext";
import Card from "../Card/Card";

const VideosList = () => {
  const { getAllVideos, videos } = useContext(videosContext);

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <div>
      {videos.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default VideosList;
