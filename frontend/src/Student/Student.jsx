import React, { useState } from "react";
import "./Student.css";
import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Student() {
  const [activeSubject, setActiveSubject] = useState("dbms");

  const studentData = {
    name: "John Doa",
    year: "3rd",
    branch: "AIML",
    subjectList: {
      dbms: {
        subject: "DBMS",
        teachername: "Sam Smith",
        toatalcredit: "4",
        attendance: "95%",
        marks: {
          unit1: "10/15",
          unit2: "8/15",
          endsemister: "Yet to be done",
        },
        attendancetable: [
          { date: "2022-05-20", status: "Present" },
          { date: "2022-05-25", status: "Absent" },
          { date: "2022-05-30", status: "Present" },
          { date: "2022-06-05", status: "Present" },
          { date: "2022-06-10", status: "Present" },
        ],
      },
      cd: {
        subject: "Compiler Design",
        teachername: "Alice Johnson",
        toatalcredit: "4",
        attendance: "90%",
        marks: {
          unit1: "12/15",
          unit2: "10/15",
          endsemister: "Yet to be done",
        },
        attendancetable: [
          { date: "2022-05-20", status: "Present" },
          { date: "2022-05-22", status: "Present" },
          { date: "2022-05-28", status: "Absent" },
          { date: "2022-06-01", status: "Present" },
          { date: "2022-06-07", status: "Present" },
        ],
      },
      md: {
        subject: "Microprocessor Design",
        teachername: "John Davis",
        toatalcredit: "3",
        attendance: "92%",
        marks: {
          unit1: "14/15",
          unit2: "13/15",
          endsemister: "Yet to be done",
        },
        attendancetable: [
          { date: "2022-05-18", status: "Present" },
          { date: "2022-05-22", status: "Present" },
          { date: "2022-05-28", status: "Present" },
          { date: "2022-06-01", status: "Absent" },
          { date: "2022-06-05", status: "Present" },
        ],
      },
      ml: {
        subject: "Machine Learning",
        teachername: "David Lee",
        toatalcredit: "4",
        attendance: "98%",
        marks: {
          unit1: "13/15",
          unit2: "12/15",
          endsemister: "Yet to be done",
        },
        attendancetable: [
          { date: "2022-05-19", status: "Present" },
          { date: "2022-05-24", status: "Present" },
          { date: "2022-05-30", status: "Present" },
          { date: "2022-06-02", status: "Present" },
          { date: "2022-06-08", status: "Present" },
        ],
      },
    },
  };

  // Data for the Histogram
  const marksData = {
    labels: ["Unit 1", "Unit 2", "End Semester"],
    datasets: [
      {
        label: "Marks Obtained",
        data: [
          parseInt(
            studentData.subjectList[activeSubject].marks.unit1.split("/")[0]
          ),
          parseInt(
            studentData.subjectList[activeSubject].marks.unit2.split("/")[0]
          ),
          studentData.subjectList[activeSubject].marks.endsemister ===
          "Yet to be done"
            ? 0
            : parseInt(
                studentData.subjectList[activeSubject].marks.endsemister.split(
                  "/"
                )[0]
              ),
        ],
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for the Pie Chart
  const attendanceData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [
          studentData.subjectList[activeSubject].attendancetable.filter(
            (entry) => entry.status === "Present"
          ).length,
          studentData.subjectList[activeSubject].attendancetable.filter(
            (entry) => entry.status === "Absent"
          ).length,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="Student">
      <aside>
        <CircleUserRound size={100} />
        <h3>{studentData.name}</h3>
        <p>
          {studentData.year} Year | {studentData.branch}
        </p>
        <Link
          to="#"
          className={activeSubject === "dbms" ? "active-Link" : ""}
          onClick={() => setActiveSubject("dbms")}
        >
          DBMS
        </Link>
        <Link
          to="#"
          className={activeSubject === "cd" ? "active-Link" : ""}
          onClick={() => setActiveSubject("cd")}
        >
          CD
        </Link>
        <Link
          to="#"
          className={activeSubject === "md" ? "active-Link" : ""}
          onClick={() => setActiveSubject("md")}
        >
          MD
        </Link>
        <Link
          to="#"
          className={activeSubject === "ml" ? "active-Link" : ""}
          onClick={() => setActiveSubject("ml")}
        >
          ML
        </Link>
      </aside>
      <div className="student-dashboard">
        <div className="facultydetail">
          <div>
            <h2>Faculty Details</h2>
            <p>
              Teacher Name: {studentData.subjectList[activeSubject].teachername}
            </p>
            <p>
              Total Credit:{" "}
              {studentData.subjectList[activeSubject].toatalcredit}
            </p>
            <p>
              Attendance: {studentData.subjectList[activeSubject].attendance}
            </p>
            <p>
              End Semester Marks:{" "}
              {studentData.subjectList[activeSubject].marks.endsemister}
            </p>
          </div>
        </div>
        <div className="markdetails">
          <div>
            <h2>Marks Details</h2>
            <p>Unit 1: {studentData.subjectList[activeSubject].marks.unit1}</p>
            <p>Unit 2: {studentData.subjectList[activeSubject].marks.unit2}</p>
            <p>
              End Semester:{" "}
              {studentData.subjectList[activeSubject].marks.endsemister}
            </p>
          </div>
          <div>
            {/* MAKE A HISTOGRAM FOR PROGRESS OF MARKS */}
            <Bar
              data={marksData}
              options={{ scales: { y: { beginAtZero: true } } }}
            />
          </div>
        </div>
        <div className="attendancetable">
          <div>
            <h2>Attendance Table</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentData.subjectList[activeSubject].attendancetable.map(
                  (attendance, index) => (
                    <tr key={index}>
                      <td>{attendance.date}</td>
                      <td
                        style={{
                          backgroundColor:
                            attendance.status === "Present" ? "green" : "red",
                        }}
                      >
                        {attendance.status}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div>
            {/* MAKE A PIE CHART OF TOTAL PRESENTY */}

            <Pie data={attendanceData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
