"use client";
import React, { useState, useEffect, useRef } from "react";
import { ProgressBar } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { ChevronUp } from "lucide-react";

const users = [
  { id: "1", subject: "C++ Programming", level: "Intermediate", progress: "73%" },
  { id: "2", subject: "Web Development", level: "Beginner", progress: "100%" },
  { id: "3", subject: "Python Data Analyst", level: "Master", progress: "55%" },
];

export default function ResultPage() {
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
      name: "John Doe", // Hardcoded as original user object lacks name
      email: "john@example.com",
      course: user.subject,
      level: user.level,
      progress: parseInt(user.progress), // Fix: change from user.percent
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
    <div ref={scrollContainerRef} style={{ padding: "1rem",overflowY: "auto", height: "480px", position: "relative" }}>
      <h1 className="text-center">Result & Certification</h1>
      <hr className="mt-3 mb-4" />
      <table className="user-table table table-bordered mb-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Level</th>
            <th>Progress</th>
            <th>Action</th>
            <th>Completion</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.subject}</td>
              <td>{user.level}</td>
              <td>{user.progress}</td>
              <td>
                <button id="button1" className="btn text-white " onClick={() => handleClick(user)}>
                  View More
                </button>
              </td>
              <td>
                <button className="btn btn-warning ms-2 text-white" id="button1"
                disabled={parseInt(user.progress) !== 100}>
                Certificate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {userData && (
        <div>
          <h2 className="mb-4 text-center">Report Analysis</h2>

          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5>User Summary</h5>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Course:</strong> {userData.course}</p>
              <p><strong>Level:</strong> {userData.level}</p>
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5>Course Progress</h5>
              <ProgressBar now={userData.progress} label={`${userData.progress}%`} />
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5>MCQ/Test Performance</h5>
              <table className="table table-bordered mt-3">
                <tbody>
                  <tr><th>Total MCQs Attempted</th><td>{userData.mcqsAttempted}</td></tr>
                  <tr><th>Accuracy</th><td>{userData.accuracy}%</td></tr>
                  <tr><th>Average Score</th><td>{userData.avgScore}%</td></tr>
                  <tr><th>Topics Mastered</th><td>{userData.topicsMastered.join(", ")}</td></tr>
                  <tr><th>Areas to Improve</th><td>{userData.areasToImprove.join(", ")}</td></tr>
                </tbody>
              </table>

              <div className="row mt-4">
                <div className="col-md-6">
                  <h6>Accuracy Breakdown</h6>
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
                <div className="col-md-6">
                  <h6>Scores by Topic</h6>
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

          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Last Activity</h5>
              <p><strong>Last Login:</strong> {userData.lastLogin}</p>
              <p><strong>Last Test Taken:</strong> {userData.lastTest}</p>
              <p><strong>Last Completed Module:</strong> {userData.lastModule}</p>
            </div>
            
          </div>
        </div>
      )}

      {showScroll && (
        <button 
        id="button1"
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="btn text-white position-fixed"
          style={{ bottom: "20px", right: "20px", zIndex: 1000 }}
        >
          <ChevronUp color="white" />
        </button>
      )}
    </div>
  );
}
