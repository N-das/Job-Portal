// import React from "react";
// const PopularCompany = () => {
//   return <></>;
// };
// export default PopularCompany;

import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { SiWipro } from "react-icons/si";
import { SiTata } from "react-icons/si";
import { SiMahindra } from "react-icons/si";

const PopularCompany = () => {
  const companies = [
    {
      id: 1,
      title: "Wipro",
      location: "Banglore",
      openPositions: 10,
      icon: <SiWipro />,
    },
    {
      id: 2,
      title: "Tata Consultancy Services",
      location: "Mumbai",
      openPositions: 5,
      icon: <SiTata />,
    },
    {
      id: 3,
      title: "Tech Mahindra",
      location: "Banglore",
      openPositions: 20,
      icon: <SiMahindra />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompany;
