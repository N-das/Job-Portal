import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { FaCheck, FaPencilAlt } from "react-icons/fa";

const MyJobs = () => {
  const [jobs, setJobs] = React.useState([]);
  const [editing, setEditing] = useState(null);
  const { isAuthorised, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/job/getmyjobs",
          { withCredentials: true }
        );
        setJobs(data.jobs);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorised || (user && user.role !== "Employer")) {
    navigate("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditing(jobId);
  };

  const handleDisableEdit = (jobId) => {
    setEditing(jobId);
  };

  const handleUpdateJob = async (jobId) => {
    const updateJob = jobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:5000/api/job/update/${jobId}`, updateJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleJobDelete = async (jobId) => {
    await axios
      .delete(`http://localhost:5000/api/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setJobs(jobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };
  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Your posted Jobs</h1>
          {jobs && jobs.length > 0 ? (
            <>
              <div className="banner">
                {jobs.map((element) => {
                  return (
                    <div className="card" key={element._id}>
                      <div className="content">
                        <div className="short_fields">
                          <div>
                            <span>Title</span>
                            <input
                              type="text"
                              disabled={editing !== element._id ? true : false}
                              value={element.title}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Country</span>
                            <input
                              type="text"
                              disabled={editing !== element._id ? true : false}
                              value={element.country}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "country",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>City</span>
                            <input
                              type="text"
                              disabled={editing !== element._id ? true : false}
                              value={element.city}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "city",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Category</span>
                            <select
                              value={element.category}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "category",
                                  e.target.value
                                )
                              }
                              disabled={editing !== element._id ? true : false}
                            >
                              <option value="">Select Category</option>
                              <option value="Graphics & Design">
                                Graphics & Design
                              </option>
                              <option value="Mobile App Development">
                                Mobile App Development
                              </option>
                              <option value="Frontend Web Development">
                                Frontend Web Development
                              </option>
                              <option value="MERN Stack Development">
                                MERN STACK Development
                              </option>
                              <option value="Account & Finance">
                                Account & Finance
                              </option>
                              <option value="Artificial Intelligence">
                                Artificial Intelligence
                              </option>
                              <option value="Video Animation">
                                Video Animation
                              </option>
                              <option value="MEAN Stack Development">
                                MEAN STACK Development
                              </option>
                              <option value="MEVN Stack Development">
                                MEVN STACK Development
                              </option>
                              <option value="Data Entry Operator">
                                Data Entry Operator
                              </option>
                            </select>
                          </div>
                          <div>
                            <span>
                              Salary:{" "}
                              {element.fixedSalary ? (
                                <input
                                  type="number"
                                  value={element.fixedSalary}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "fixedSalary",
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    editing !== element._id ? true : false
                                  }
                                />
                              ) : (
                                <div>
                                  <input
                                    type="number"
                                    value={element.salaryFrom}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "salaryFrom",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editing !== element._id ? true : false
                                    }
                                  />
                                  <input
                                    type="number"
                                    value={element.salaryTo}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "salaryTo",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editing !== element._id ? true : false
                                    }
                                  />
                                </div>
                              )}
                            </span>
                          </div>
                          <div>
                            <span>Expired</span>
                            <select
                              value={element.expired}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "expired",
                                  e.target.value
                                )
                              }
                              disabled={editing !== element._id ? true : false}
                            >
                              <option value={true}>True</option>
                              <option value={false}>False</option>
                            </select>
                          </div>
                        </div>
                        <div className="long_field">
                          <div>
                            <span>Description:</span>
                            <textarea
                              rows="5"
                              value={element.decription}
                              onChange={(e) => {
                                handleInputChange(
                                  element._id,
                                  "decription",
                                  e.target.value
                                );
                              }}
                              disabled={editing !== element._id ? true : false}
                            />
                          </div>
                          <div>
                            <span>Location:</span>
                            <textarea
                              rows="5"
                              value={element.location}
                              onChange={(e) => {
                                handleInputChange(
                                  element._id,
                                  "location",
                                  e.target.value
                                );
                              }}
                              disabled={editing !== element._id ? true : false}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="button_wrapper">
                        <div className="edit_btn_wrapper">
                          {editing === element._id ? (
                            <>
                              <button
                                onClick={() => handleUpdateJob(element._id)}
                                className="check_btn"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => handleDisableEdit()}
                                className="cross_btn"
                              >
                                <RxCross2 />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="edit_btn"
                                onClick={() => handleEnableEdit(element._id)}
                              >
                                <FaPencilAlt />
                              </button>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => handleJobDelete(element._id)}
                          className="delete_btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>You have not posted any job or may be you deleted job</p>
          )}
        </div>
      </div>
    </>
  );
};
export default MyJobs;
