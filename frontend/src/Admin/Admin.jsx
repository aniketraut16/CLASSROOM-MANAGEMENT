import React, { useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Admin() {
  const [activeClass, setActiveClass] = useState("AIML");

  const teacherData = {
    name: "Sam Smith",
    department: "Computer Science",
    subject: "DBMS",
    classList: {
      AIML: {
        className: "AIML",
        totalStudents: 35,
        avgAttendance: "93%",
        avgMarks: {
          unit1: "12/15",
          unit2: "11/15",
          endsemister: "78/100",
        },
        students: Array.from({ length: 15 }, (_, i) => ({
          name: `Student ${i + 1}`,
          marks: {
            unit1: `${Math.floor(Math.random() * 6) + 10}/15`,
            unit2: `${Math.floor(Math.random() * 6) + 9}/15`,
            endsemister: `${Math.floor(Math.random() * 25) + 75}/100`,
          },
          attendance: `${Math.floor(Math.random() * 6) + 90}%`,
          attendanceRecords: [
            { date: "2022-05-20", status: i % 3 === 0 ? "Absent" : "Present" },
            { date: "2022-05-22", status: i % 4 === 0 ? "Absent" : "Present" },
            { date: "2022-05-24", status: "Present" },
            { date: "2022-05-26", status: "Present" },
            { date: "2022-05-28", status: "Present" },
          ],
        })),
      },
      IT: {
        className: "IT",
        totalStudents: 30,
        avgAttendance: "89%",
        avgMarks: {
          unit1: "11/15",
          unit2: "10/15",
          endsemister: "82/100",
        },
        students: Array.from({ length: 15 }, (_, i) => ({
          name: `Student ${i + 16}`,
          marks: {
            unit1: `${Math.floor(Math.random() * 6) + 10}/15`,
            unit2: `${Math.floor(Math.random() * 6) + 9}/15`,
            endsemister: `${Math.floor(Math.random() * 25) + 75}/100`,
          },
          attendance: `${Math.floor(Math.random() * 6) + 85}%`,
          attendanceRecords: [
            { date: "2022-05-20", status: i % 3 === 0 ? "Absent" : "Present" },
            { date: "2022-05-22", status: i % 4 === 0 ? "Absent" : "Present" },
            { date: "2022-05-24", status: "Present" },
            { date: "2022-05-26", status: "Present" },
            { date: "2022-05-28", status: "Present" },
          ],
        })),
      },
    },
  };

  const calculateAverageAttendance = (student) => {
    const presentCount = student.attendanceRecords.filter(
      (record) => record.status === "Present"
    ).length;
    const totalRecords = student.attendanceRecords.length;
    return ((presentCount / totalRecords) * 100).toFixed(2) + "%";
  };

  const marksData = {
    labels: ["Unit 1", "Unit 2", "End Semester"],
    datasets: [
      {
        label: "Average Marks",
        data: [
          parseInt(
            teacherData.classList[activeClass].avgMarks.unit1.split("/")[0]
          ),
          parseInt(
            teacherData.classList[activeClass].avgMarks.unit2.split("/")[0]
          ),
          teacherData.classList[activeClass].avgMarks.endsemister ===
          "Yet to be done"
            ? 0
            : parseInt(
                teacherData.classList[activeClass].avgMarks.endsemister.split(
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

  const attendanceData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [
          (teacherData.classList[activeClass].avgAttendance.replace("%", "") /
            100) *
            teacherData.classList[activeClass].totalStudents,
          teacherData.classList[activeClass].totalStudents -
            (teacherData.classList[activeClass].avgAttendance.replace("%", "") /
              100) *
              teacherData.classList[activeClass].totalStudents,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const studentAttendanceData = {
    labels: teacherData.classList[activeClass].students.map(
      (student) => student.name
    ),
    datasets: [
      {
        label: "Average Attendance",
        data: teacherData.classList[activeClass].students.map((student) =>
          parseFloat(calculateAverageAttendance(student))
        ),
        backgroundColor: "rgba(54,162,235,0.6)",
        borderColor: "rgba(54,162,235,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="Student">
      <aside>
        <CircleUserRound size={100} />
        <h3>Admin</h3>
        <Link
          to="#"
          className={activeClass === "AIML" ? "active-Link" : ""}
          onClick={() => setActiveClass("AIML")}
        >
          Teachers Management
        </Link>
        <Link
          to="#"
          className={activeClass === "IT" ? "active-Link" : ""}
          onClick={() => setActiveClass("IT")}
        >
          Student Management
        </Link>
        <Link
          to="#"
          className={activeClass === "AIML" ? "active-Link" : ""}
          onClick={() => setActiveClass("AIML")}
        >
          Resource Management
        </Link>
        <Link
          to="#"
          className={activeClass === "IT" ? "active-Link" : ""}
          onClick={() => setActiveClass("IT")}
        >
          Interactive Learning
        </Link>
      </aside>
      <div className="student-dashboard">
        <div className="facultydetail">
          <div>
            <h2>
              Class Overview - {teacherData.classList[activeClass].className}
            </h2>
            <p>
              Total Students: {teacherData.classList[activeClass].totalStudents}
            </p>
            <p>
              Average Attendance:{" "}
              {teacherData.classList[activeClass].avgAttendance}
            </p>
            <p>Average Marks:</p>
            <p>Unit 1: {teacherData.classList[activeClass].avgMarks.unit1}</p>
            <p>Unit 2: {teacherData.classList[activeClass].avgMarks.unit2}</p>
            <p>
              End Semester:{" "}
              {teacherData.classList[activeClass].avgMarks.endsemister}
            </p>
          </div>
        </div>
        <div className="markdetails">
          <div>
            <h2>Average Marks per Unit</h2>
            <Bar
              data={marksData}
              options={{ scales: { y: { beginAtZero: true } } }}
            />
          </div>
        </div>

        <div className="student-table">
          <h2>Student Performance Details</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit 1 Marks</th>
                <th>Unit 2 Marks</th>
                <th>End Semester Marks</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {teacherData.classList[activeClass].students.map(
                (student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.marks.unit1}</td>
                    <td>{student.marks.unit2}</td>
                    <td>{student.marks.endsemister}</td>
                    <td>{student.attendance}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div
          className="attendancetable"
          style={{
            width: "30%",
          }}
        >
          <div>
            <h2>Average Attendance</h2>
            <Pie data={attendanceData} />
          </div>
        </div>

        <div
          className="student-attendance-chart"
          style={{
            width: "55%",
          }}
        >
          <div>
            <h2>Student-wise Average Attendance</h2>
            <Bar
              data={studentAttendanceData}
              options={{ scales: { y: { beginAtZero: true } } }}
            />
          </div>
        </div>

        <div className="datewise-attendance">
          <h2>Date-wise Attendance</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                {teacherData.classList[
                  activeClass
                ].students[0].attendanceRecords.map((record, index) => (
                  <th key={index}>{record.date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teacherData.classList[activeClass].students.map(
                (student, studentIndex) => (
                  <tr key={studentIndex}>
                    <td>{student.name}</td>
                    {student.attendanceRecords.map((record, index) => (
                      <td
                        key={index}
                        style={{
                          backgroundColor:
                            record.status === "Present" ? "green" : "red",
                          color: "white",
                        }}
                      >
                        {record.status}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
