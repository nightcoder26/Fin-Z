import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "../components/Spinner";
import { set } from "mongoose";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000").then((response) => {
      setLoading(false).catch((error) => {
        console.log(error);
        setLoading(false);
      });
    });
  });
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div>Home</div>
          <Link to={`/`}> </Link>
        </div>
      )}
    </div>
  );
};
