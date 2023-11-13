import React from "react";
import Navbar from "../components/Navbar.jsx";
const Home = () => {
  return (
    <div>
      {/* <Sidebar/> sidebar goes here 
          each page with 3 components a sidebar, navbar and main content, main content has other components
      */}
      <Navbar pageName="Overview" />
    </div>
  );
};
export default Home;
