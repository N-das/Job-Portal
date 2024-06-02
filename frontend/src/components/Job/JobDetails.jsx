import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();

  const { isAuthorised, user } = useContext(Context);
  // useState
  if (!isAuthorised) {
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/job/getsinglejob/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      <div className="jobDetail page">
        <div className="container">
          <h3>Job Details</h3>
          <div className="banner">
            <p>
              Title: <span>{job.title}</span>
            </p>
            <p>
              Category: <span>{job.category}</span>
            </p>
            <p>
              Country: <span>{job.country}</span>
            </p>
            <p>
              City: <span>{job.city}</span>
            </p>
            <p>
              Location: <span>{job.location}</span>
            </p>
            <p>
              Description: <span>{job.decription}</span>
            </p>
            <p>
              Posted on: <span>{job.jobPostedOn}</span>
            </p>
            <p>
              Salary:{" "}
              {job.fixedSalary ? (
                <span>{job.fixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom}-{job.salaryTo}
                </span>
              )}
            </p>
            <p>
              {user && user.role === "Employer" ? (
                <></>
              ) : (
                <Link to={`/application/${job._id}`}>Apply now</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobDetails;
