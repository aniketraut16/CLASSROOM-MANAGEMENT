import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Student from "./Student/Student";
import Teacher from "./Teacher/Teacher";
function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="" element={<Home />} />
          <Route path="student" element={<Student />} />
          <Route path="teacher" element={<Teacher />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
