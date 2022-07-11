import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <center>
        <h1>Sorry page not found </h1>
        <Link to="/">Back to Home</Link>
      </center>
    </div>
  );
};

export default NotFoundPage;
