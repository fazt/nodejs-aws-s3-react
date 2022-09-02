import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const URI = "http://localhost:3000";

function App() {
  const [post, setPost] = useState({
    title: "",
    photo: null,
  });
  const [photos, setPhotos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", post.photo);

    const response = await axios.post(`${URI}/photos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response)
  };

  useEffect(() => {
    async function loadPhotos() {
      try {
        const response = await axios.get(`${URI}/photos`);
        setPhotos(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadPhotos();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <input
          type="file"
          name="photo"
          onChange={(e) => setPost({ ...post, photo: e.target.files[0] })}
        />
        <button>Subir</button>
      </form>

      <ul>
        {photos.map((photo) => (
          <li key={photo.Key}>
            <a href={`/photos/${photo.Key}`}>{photo.Key}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
