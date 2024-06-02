// const app = require("./app");
import app from "./app.js";
const port = process.env.PORT || 5000;
// const cloudinary = require("cloudinary");

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
