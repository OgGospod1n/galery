import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
// import multer from "multer";
// import {GridFsStorage} from "multer-gridfs-storage";
// import * as path from "path";

import userRouter from "./modules/routes/userRoutes.js";
import categoryRouter from "./modules/routes/categoryRoutes.js";
import photoRouter from "./modules/routes/photoRoutes.js";
import commentRouter from "./modules/routes/commentRoutes.js";
import albumRouter from "./modules/routes/albumRoutes.js";
// import {GridFile} from "./modules/models.js";

const PORT = 4000;


/**
 * Запускает приложение
 * @returns {Promise<void>}
 */
const main = async () => {
  await mongoose.connect("mongodb://0.0.0.0:27017/dream-gallery");

  const app = express();
  // const upload = multer({dest: path.join(__dirname, ".")});

  app.use(fileUpload({
    defCharset: "utf8",
    defParamCharset: "utf8",
  }));

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api/v1/users/", userRouter);
  app.use("/api/v1/categories/", categoryRouter);
  app.use("/api/v1/photos/", photoRouter);
  app.use("/api/v1/comments/", commentRouter);
  app.use("/api/v1/albums/", albumRouter);

  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}/`);
  });
}


main()
    .catch(console.error);
