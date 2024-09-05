import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <Link to={"admin"}>
        <img src="/admin.jpg" alt="" />
        <h2>Admin</h2>
      </Link>
      <Link to={"teacher"}>
        <img src="/teacher.jpg" alt="" />
        <h2>Teacher</h2>
      </Link>
      <Link to={"student"}>
        <img src="/student.jpg" alt="" />
        <h2>Student</h2>
      </Link>
    </div>
  );
}

export default Home;
