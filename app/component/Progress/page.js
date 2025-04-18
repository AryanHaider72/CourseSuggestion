"use client";

import { ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const users = [
  { id: "1", name: "Alice", subject: "C++ Programming", level: "Intermediate", percent: "73%" },
  { id: "2", name: "Bob", subject: "Web Development", level: "Beginner", percent: "36%" },
  { id: "3", name: "Charlie", subject: "Python Data Analyst", level: "Master", percent: "55%" },
];

export default function ProgressReport() {
  const [userData, setUserData] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setShowScroll(scrollContainerRef.current.scrollTop > 300);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleClick = (user) => {
    setUserData({
      name: user.name,
      email: "john@example.com",
      course: user.subject,
      level: user.level,
      progress: parseInt(user.percent),
      mcqsAttempted: 120,
      accuracy: 82,
      avgScore: 76,
      topicsMastered: ["HTML", "CSS", "JavaScript"],
      areasToImprove: ["React", "Testing"],
      lastLogin: "2025-04-12",
      lastTest: "React Basics Quiz",
      lastModule: "API Integration",
    });
  };

  const COLORS = ["#00C49F", "#FF8042"];

  const pieData = userData
    ? [
        { name: "Correct", value: userData.accuracy },
        { name: "Incorrect", value: 100 - userData.accuracy },
      ]
    : [];

  const barData = [
    { topic: "HTML", score: 90 },
    { topic: "CSS", score: 85 },
    { topic: "JavaScript", score: 88 },
    { topic: "React", score: 60 },
    { topic: "Testing", score: 55 },
  ];

  return (
    <div
      ref={scrollContainerRef}
      className="progress-page-container"
      style={{overflowY:'scroll'}}
    >
      {/* Title */}
      <h1 className="text-center">Progress Report</h1>
      <hr className="mt-3 mb-4" />

      {/* User Table */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead style={{ backgroundColor: "#ffa835" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Level</th>
              <th>Percentage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.subject}</td>
                <td>{user.level}</td>
                <td>{user.percent}</td>
                <td>
                  <button
                    className="btn text-white"
                    id="button1"
                    onClick={() => handleClick(user)}
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Section */}
      {userData && (
        <>
          <h2 className="mb-4 text-center">Report Analysis</h2>

          {/* User Summary */}
          <div className="card mb-4 shadow-sm p-3">
            <div className="card-body">
              <h5 className="text-center text-md-start">User Summary</h5>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Course:</strong> {userData.course}</p>
              <p><strong>Level:</strong> {userData.level}</p>
            </div>
          </div>

          {/* MCQ Performance */}
          <div className="card mb-4 shadow-sm p-3">
            <div className="card-body">
              <h5 className="text-center text-md-start">MCQ/Test Performance</h5>
              <table className="table table-bordered mt-3">
                <tbody>
                  <tr><th>Total MCQs Attempted</th><td>{userData.mcqsAttempted}</td></tr>
                  <tr><th>Accuracy</th><td>{userData.accuracy}%</td></tr>
                  <tr><th>Average Score</th><td>{userData.avgScore}%</td></tr>
                  <tr><th>Topics Mastered</th><td>{userData.topicsMastered.join(", ")}</td></tr>
                  <tr><th>Areas to Improve</th><td>{userData.areasToImprove.join(", ")}</td></tr>
                </tbody>
              </table>

              {/* Charts */}
              <div className="row mt-4">
                <div className="col-12 col-md-6 mb-4">
                  <h6 className="text-center">Accuracy Breakdown</h6>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={80} label>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <h6 className="text-center">Scores by Topic</h6>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                      <XAxis dataKey="topic" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#ffa835" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Last Activity */}
          <div className="card shadow-sm p-3 mb-4">
            <div className="card-body">
              <h5 className="text-center text-md-start">Last Activity</h5>
              <p><strong>Last Login:</strong> {userData.lastLogin}</p>
              <p><strong>Last Test Taken:</strong> {userData.lastTest}</p>
              <p><strong>Last Completed Module:</strong> {userData.lastModule}</p>
            </div>
          </div>
        </>
      )}

      {/* Scroll To Top Button */}
      {showScroll && (
        <button
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          id="button1"
          className="btn position-fixed bg-dark"
          style={{
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          <ChevronUp color="white" />
        </button>
      )}
    </div>
  );
}
