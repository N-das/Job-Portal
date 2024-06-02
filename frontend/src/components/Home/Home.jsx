import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HerroSection from "./HerroSection";
import HowItWorks from "./HowItWorks";
import PopularCompany from "./PopularCompany";
import PopularCategories from "./PopularCategories";

const Home = () => {
  const { isAuthorised } = useContext(Context);
  if (!isAuthorised) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      {/* <h1>Helloo</h1> */}
      <HerroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompany />
    </>
  );
};
export default Home;

// import React, { useContext } from "react";
// import { Context } from "../../main";
// import { Navigate } from "react-router-dom";
// import HeroSection from "./HerroSection";
// import HowItWorks from "./HowItWorks";
// import PopularCompany from "./PopularCompany";
// import PopularCategories from "./PopulatCategories";

// const Home = () => {
//   const { isAuthorised } = useContext(Context);
//   if (isAuthorised) {
//     return <Navigate to={"/login"} />;
//   }
//   return (
//     <section className="homePage page">
//       <HeroSection />
//       {/* <HowItWorks />
//       <PopularCompany />
//       <PopularCategories /> */}
//     </section>
//   );
// };
// export default Home;
