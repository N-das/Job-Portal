// http://localhost:5000/api/application/delete${id}
// http://localhost:5000/api/application/jobseeker/getall
// http://localhost:5000/api/application/employer/getall

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorised } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:5000/api/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:5000/api/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorised]);

  if (!isAuthorised) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:5000/api/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverletter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};

// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../../main";
// import ResumeModal from "./ResumeModal";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// const MyApplication = () => {
//   const [application, setApplication] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const { user, isAuthorised } = useContext(Context);

//   const navigate = useNavigate();
//   useEffect(() => {
//     try {
//       if (user && user.role === "Employer") {
//         axios
//           .get("http://localhost:5000/api/application/employer/getall", {
//             withCredentials: true,
//           })
//           .then((res) => {
//             setApplication(res.data.application);
//           });
//       } else {
//         axios
//           .get("http://localhost:5000/api/application/jobseeker/getall", {
//             withCredentials: true,
//           })
//           .then((res) => {
//             setApplication(res.data.application);
//           });
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }, [isAuthorised]);

//   if (!isAuthorised) {
//     navigate("/login");
//   }

//   const deleteApplication = (id) => {
//     try {
//       axios
//         .delete(`http://localhost:5000/api/application/delete${id}`, {
//           withCredentials: true,
//         })
//         .then((res) => {
//           toast.success(res.data.message);
//           setApplication(application.filter((app) => app._id !== id));
//         });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const openModal = (imageUrl) => {
//     setShowModal(imageUrl);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };
//   return (
//     <>
//       <section className="my_applications page">
//         {user && user.role === "Job Seeker" ? (
//           <div className="container">
//             <h3>My Application</h3>
//             {application.map((element) => {
//               return (
//                 <JobSeekerCard
//                   element={element}
//                   key={element._id}
//                   deleteApplication={deleteApplication}
//                   showModal={showModal}
//                 />
//               );
//             })}
//           </div>
//         ) : (
//           <div className="container">
//             <h3>Applications From Job Seekers</h3>
//             {application.map((element) => {
//               return (
//                 <JobSeekerCard
//                   element={element}
//                   key={element._id}
//                   showModal={showModal}
//                 />
//               );
//             })}
//           </div>
//         )}
//         {showModal && <ResumeModal imageUrl={imageUrl} onClose={closeModal} />}
//       </section>
//     </>
//   );
// };
// export default MyApplication;

// const JobSeekerCard = ({ element, deleteApplication, showModal }) => {
//   return (
//     <>
//       <div className="job_seeker_card">
//         <div className="detail">
//           <p>
//             <span>Name:</span>
//             {element.name}
//           </p>
//           <p>
//             <span>Email:</span>
//             {element.email}
//           </p>
//           <p>
//             <span>Phone:</span>
//             {element.phone}
//           </p>
//           <p>
//             <span>Address:</span>
//             {element.address}
//           </p>
//           <p>
//             <span>CoverLetter:</span>
//             {element.coverletter}
//           </p>
//         </div>
//         <div className="resume">
//           <img
//             src={element.resume.url}
//             alt="resume"
//             onClick={() => showModal(element.resume.url)}
//           />
//         </div>
//         <div className="btn_area">
//           <button onClick={() => deleteApplication(element._id)}>
//             Delete Application
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// const EmployerCard = () => {
//   return <></>;
// };
