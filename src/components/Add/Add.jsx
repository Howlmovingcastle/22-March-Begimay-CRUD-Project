import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { videosContext } from "../../contexts/VideosContext";

const Add = () => {
  const navigate = useNavigate();
  const { addVideo } = useContext(videosContext);

  const [newProduct, setNewProduct] = useState({
    title: "",
    imageTitle: "",
    genre: "",
    description: "",
  });

  function handleValues(e) {
    let product = {
      ...newProduct,
      [e.target.name]: e.target.value,
    };

    setNewProduct(product);
  }

  function saveProduct() {
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.imageTitle ||
      !newProduct.genre
    ) {
      alert("Заполните поля");
      return;
    }
    addVideo(newProduct);
    navigate("/");
  }

  return (
    <div>
      <input
        onChange={handleValues}
        value={newProduct.title}
        placeholder="Title"
        type="text"
        name="title"
      />
      <input
        onChange={handleValues}
        value={newProduct.imageTitle}
        placeholder="Image for title"
        type="text"
        name="imageTitle"
      />
      <input
        onChange={handleValues}
        value={newProduct.genre}
        placeholder="Genre"
        type="text"
        name="genre"
      />
      <input
        onChange={handleValues}
        value={newProduct.description}
        placeholder="Description"
        type="text"
        name="description"
      />

      <button onClick={saveProduct}>Save</button>
    </div>
  );
};

export default Add;
