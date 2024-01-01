import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

import { useState } from "react";
import $ from "jquery";
import "../styles/Month.css";
//import "jquery-ui/ui/widgets/datepicker";

// const Month = () => {
//   return <div>Month</div>;
// };
// export default Month;

function Month() {
  const [selectedDate, setSelectedDate] = useState("");

  // $(function () {
  //   $("#datepicker").datepicker({
  //     onSelect: function (dateText) {
  //       setSelectedDate(dateText);
  //     },
  //   });

  //   $(".date-picker").on("click", function () {
  //     $("#datepicker").datepicker("show");
  //   });
  // });

  return (
    // <div className="container">
    //   <div className="sidebar child">
    //     <Sidebar />
    //   </div>
    //   <div className="content child">
    //     <Navbar pageName="Month" className="nav-1" />
    //     <div className="main-container">
    //       <div className="horizontal-container">
    //         <div className="horizontal-box"></div>
    //         <div className="horizontal-box"></div>
    //         <div className="horizontal-box third-box"></div>
    //         <input type="text" className="date-picker" id="datepicker" />
    //       </div>

    //       <div className="vertical-container">
    //         {[...Array(10)].map((_, index) => (
    //           <div className="vertical-box" key={index}></div>
    //         ))}
    //       </div>

    //       <p id="selectedDate">{selectedDate}</p>
    //     </div>
    //   </div>
    // </div>
    <div>hi</div>
  );
}

export default Month;
