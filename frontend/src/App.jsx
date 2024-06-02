import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Context } from "./main";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Application from "./components/Application/Application";
import MyApplication from "./components/Application/MyApplication";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import axios from "axios";
import { Toaster } from "react-hot-toast";

function App() {
  const { isAuthorised, setIsAuthorised, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorised(true);
      } catch (error) {
        setIsAuthorised(false);
      }
    };
    fetchUser();
  }, [isAuthorised]);

  // if(isAuthorised){
  //   return
  // }
  // const [count, setCount] = useState(0)
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/jobdetails/:id" element={<JobDetails />}></Route>
          <Route path="/job/post" element={<PostJob />}></Route>
          <Route path="/myjobs" element={<MyJobs />}></Route>
          <Route path="/application/:id" element={<Application />}></Route>
          <Route path="/myapplication" element={<MyApplication />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
