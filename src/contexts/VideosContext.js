import axios from "axios";
import React, { useReducer } from "react";

export const videosContext = React.createContext();

const API = "http://localhost:8000/videos";

const INIT_STATE = {
  videos: [],
  oneVideo: null,
};

// reducer - вспомогательная функция, с которой мы на прямую меняем INIT_STATE
// action - это объект с ключами type, payload
// type - действие, которое должно выполняться
// payload - данные, которые нужно сохранить

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_VIDEOS":
      return {
        ...state,
        videos: action.payload.data,
      };

    case "GET_ONE_VIDEOS":
      return {
        ...state,
        oneVideo: action.payload.data,
      };

    default:
      return state;
  }
};

const VideosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getAllVideos() {
    let result = await axios(API);
    let action = {
      type: "GET_VIDEOS",
      payload: result,
    };
    dispatch(action);
  }

  async function deleteVideo(id) {
    await axios.delete(`${API}/${id}`);
    getAllVideos();
  }

  async function addVideo(newProduct) {
    await axios.post(API, newProduct);
    getAllVideos();
  }

  async function getOneVideo(id) {
    let result = await axios.get(`${API}/${id}`);
    dispatch({
      type: "GET_ONE_VIDEOS",
      payload: result,
    });
  }

  async function updatedVideo(id, editedVideo) {
    await axios.patch(`${API}/${id}`, editedVideo);
    getAllVideos();
  }

  return (
    <videosContext.Provider
      value={{
        videos: state.videos,
        oneVideo: state.oneVideo,
        getAllVideos,
        deleteVideo,
        addVideo,
        getOneVideo,
        updatedVideo,
      }}
    >
      {children}
    </videosContext.Provider>
  );
};

export default VideosContextProvider;
