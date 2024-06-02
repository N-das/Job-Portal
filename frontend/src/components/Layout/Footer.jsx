import React, { useContext } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Context } from "../../main";
import { Link } from "react-router-dom";
const Footer = () => {
  const { isAuthorised } = useContext(Context);
  return (
    <>
      <footer className={isAuthorised ? "footerShow" : "footerHide"}>
        <div>&copy; All Right Reserved By KNVM-Group</div>
        <div>
          <Link to={"/"} target="_blank">
            <FaFacebookF />
          </Link>
          <Link to={"/"} target="_blank">
            <FaLinkedin />
          </Link>
          <Link to={"/"} target="_blank">
            <FaYoutube />
          </Link>
          <Link to={"/"} target="_blank">
            <FaInstagram />
          </Link>
        </div>
        {/* <FaFacebookF />
        <FaLinkedin />
        <FaYoutube />
        <FaInstagram /> */}
      </footer>
    </>
  );
};
export default Footer;
