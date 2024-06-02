import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section className="page notfound">
      <div className="content">
        <img
          src="https://imgs.search.brave.com/QU0ZVwmcX8pwI9-AdSbnPpo3qWvLI75oQO8qglDEQzY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTAz/NjA3OTUyL3ZlY3Rv/ci9wYWdlLW5vdC1m/b3VuZC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9SEJ5QUo5/TWhKSUFNd2pQcWRs/ZTZGaVNfeU43OE9z/M0RoMmJqYUFIWlda/OD0"
          alt="Page Not Found"
        />
        <Link to={"/"}>Return to home page</Link>
      </div>
    </section>
  );
};
export default NotFound;
