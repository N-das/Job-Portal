import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorised } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/job/getall", { withCredentials: true })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorised) {
    navigate("/login");
  }
  return (
    <>
      <section className="jobs page">
        <div className="container">
          <h1>ALL AVAILABLE JOBS</h1>
          <div className="banner">
            {jobs.jobs &&
              jobs.jobs.map((e) => {
                return (
                  <div className="card" key={e._id}>
                    <p>{e.title}</p>
                    <p>{e.category}</p>
                    <p>{e.country}</p>
                    <Link to={`/jobdetails/${e._id}`}>Job Details</Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};
export default Jobs;
