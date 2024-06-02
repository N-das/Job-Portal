import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthorised } from "../middlewares/auth.js";
import { getAllJobs } from "../controllers/jobController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorised, logout);
router.get("/getuser", isAuthorised, getUser);
// router.get("getall", getAllJobs);

export default router;
