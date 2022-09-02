import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

// Routes
import photosRoutes from "./routes/photos.routes.js";
import indexRoutes from './routes/index.routes.js'

const app = express();

app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

app.use(indexRoutes);
app.use(photosRoutes);

app.use(express.static("images"));

export default app;