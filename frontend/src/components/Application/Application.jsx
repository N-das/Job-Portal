import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverletter, setCoverletter] = useState("");
  const [resume, setResume] = useState(null);
  // const [jobId, setJobId] = useState("");
  const [address, setAddress] = useState("");

  const { isAuthorised, user } = useContext(Context);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("coverletter", coverletter);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCoverletter("");
      setResume("");
      toast.success(data.message);
      navigate("/jobs");
    } catch (err) {
      // toast.error.message;
      toast.error(err.response.data.message);
    }
  };

  if (!isAuthorised || (user && user.role === "Employer")) {
    return <Navigate to="/" />;
    // Navigate={}
  }
  return (
    <>
      <section className="application">
        <div className="container">
          <h3>Application Form</h3>
          <form onSubmit={handleApplication}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Your number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <textarea
              rows="10"
              value={coverletter}
              onChange={(e) => setCoverletter(e.target.value)}
              placeholder="Cover Letter"
            />
            <div>
              <label
                style={{
                  textAlign: "start",
                  display: "block",
                  fontSize: "20px",
                }}
              >
                Select Resume
              </label>
              <input
                type="file"
                accept=".jpg,.png,.webp,.pdf"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </div>
            <button type="submit">Send Application</button>
          </form>
        </div>
      </section>
    </>
  );
};
export default Application;
