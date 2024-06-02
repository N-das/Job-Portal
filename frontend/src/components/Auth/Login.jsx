// import React from "react";
import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorised, setIsAuthorised, user, setUser } = useContext(Context);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: { "Content-Type": "Application/json" },
        }
      );
      toast.success(data.message);
      setEmail("");
      setRole("");
      setPassword("");
      setIsAuthorised(true);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  if (isAuthorised) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            {/* <img
              src="https://dspncdn.com/a1/media/692x/3b/fe/d5/3bfed505d621d74886bb7d94c95219ed.jpg"
              alt="Logo"
            /> */}
            <h3>Login</h3>
          </div>
          <form action="">
            <div className="inputTag">
              <label htmlFor="">Login As</label>
              <div>
                <select
                  name=""
                  id=""
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>

            <div className="inputTag">
              <label htmlFor="">Email</label>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdMail />
              </div>
            </div>

            <div className="inputTag">
              <label htmlFor="">Password</label>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLockPasswordFill />
              </div>
            </div>

            <button onClick={handleLogin} type="submit">
              Login
            </button>
            <Link to={"/register"}>register now</Link>
          </form>
        </div>
        <div className="banner">
          <img
            src="https://imgs.search.brave.com/5C0Txc2_SmSJJ5jDsWLiz3PiTW7jlW-1l_81CHxDB9U/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzUzLzMyLzc2/LzM2MF9GXzQ1MzMy/NzYyMF9mbExTaFJD/VU50cW9WTUszTnlm/SmRLSTFVblEzRHhC/eS5qcGc"
            alt="Login"
          />
        </div>
      </div>
    </>
  );
};
export default Login;
