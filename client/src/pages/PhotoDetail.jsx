import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function PhotoDetail() {
  const params = useParams();
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    async function loadPhoto() {
      const response = await axios.get(
        `http://localhost:3000/photos/${params.id}`
      );
      setPhotoURL(response.data.url);
    }
    loadPhoto();
  }, []);

  return (
    <div>
      <header>
        <h1>Your photo</h1>
        <Link to="/">Go back</Link>
      </header>

      <img src={photoURL} alt="" style={{ width: "50%" }} />
    </div>
  );
}

export default PhotoDetail;
