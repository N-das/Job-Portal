import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthorised } from "../middlewares/auth.js";
const router = express.Router();

router.get("/getall", isAuthorised, getAllJobs);
router.post("/post", isAuthorised, postJob);
router.get("/getmyjobs", isAuthorised, getMyJobs);
router.put("/update/:id", isAuthorised, updateJob);
router.delete("/delete/:id", isAuthorised, deleteJob);
router.get("/getsinglejob/:id", isAuthorised, getSingleJob);
export default router;

// {
// "title":"React developer",
// "description":"developer............................",
// "category":"Web developer",
// "country":"India",
// "city":"Mumbai",
// "location":"dadar",
// "salaryFrom":"10000",
// "salaryTo":"20000"
// }
