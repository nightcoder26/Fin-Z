import React from "react";
import { useState, useEffect } from "react";
function Home() {
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/finz")
      .then((response) => response.json())
      .then((data) => {
        setTotalIncome(data.totalIncome);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Total Income: ${totalIncome}</h1>
    </div>
  );
}

export default Home;
