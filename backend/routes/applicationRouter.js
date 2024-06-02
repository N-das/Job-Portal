import express from "express";
import { isAuthorised } from "../middlewares/auth.js";
import {
  employerGetAllApplications,
  jobSeekerDeleteApplication,
  jobSeekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
const router = express.Router();

router.get("/jobseeker/getall", isAuthorised, jobSeekerGetAllApplications);
router.get("/employer/getall", isAuthorised, employerGetAllApplications);
router.delete("/delete/:id", isAuthorised, jobSeekerDeleteApplication);
router.post("/post", isAuthorised, postApplication);
export default router;
