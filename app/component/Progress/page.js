"use client";

import { ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ProgressReport() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [mcqs, setMcqs] = useState([]);
  const [showScroll, setShowScroll] = useState(false);
  const scrollContainerRef = useRef(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/component/Progress', {}, {
          withCredentials: true, // Send session cookie along
        });

        if (response.status === 200) {
          const { progress, questions } = response.data.data;
          setUsers(progress);  // Set users' progress data
          setMcqs(questions); 
          console.log(questions);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          console.log("User not logged in", error);
        } else {
          alert("Database Error");
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  // Handle scrolling to show the button
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

  // Handle user click to show detailed report
  const handleClick = (user) => {
    const topicsMastered = JSON.parse(user.good || '[]');
    const areasToImprove = JSON.parse(user.improvement || '[]');
    const courseSuggestions = JSON.parse(user.courseSuggestions || '[]');
    setUserData({
      name: user.name,
      course: user.subject,
      level: user.level,
      progress: parseInt(user.percent),
      TotalMCqs: user.TotalMCqs || 5,
      accuracy: user.percent || 82,
      topicsMastered: topicsMastered,
      areasToImprove: areasToImprove,
      courseSuggestions: courseSuggestions,
      start: user.start,
      end: user.end,
    });
  };

  return (
    <div ref={scrollContainerRef} className="progress-page-container" style={{ overflowY: 'scroll' }}>
      <h1 className="text-center">Progress Report</h1>
      <hr className="mt-3 mb-4" />

      {/* User Table */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead style={{ backgroundColor: "#ffa835" }}>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Level</th>
              <th>Percentage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
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
              <p><strong>Name: </strong>{userData.name}</p>
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
                  <tr><th>Total MCQs Attempted</th><td>{userData.TotalMCqs}</td></tr>
                  <tr><th>Accuracy</th><td>{userData.accuracy}%</td></tr>
                  <tr><th>Topics Mastered</th><td>{userData.topicsMastered.join(", ")}</td></tr>
                  <tr><th>Areas to Improve</th><td>{Array.isArray(userData.areasToImprove) ? userData.areasToImprove.join(", ") : "No data"}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* MCQs Analysis */}
          <div className="card mb-4 shadow-sm p-3" style={{overflowX:'scroll',maxWidth:'80vw'}}>
            <div className="card-body">
              <h5 className="text-center text-md-start">MCQ/Test Analysis</h5>
              <table className="table table-bordered mt-3">
                <tbody>
                  <tr>
                    <td className="fs-5 fw-bold">ID</td>
                    <td className="fs-5 fw-bold">Question</td>
                    <td className="fs-5 fw-bold">Option 1</td>
                    <td className="fs-5 fw-bold">Option 2</td>
                    <td className="fs-5 fw-bold">Option 3</td>
                    <td className="fs-5 fw-bold">Option 4</td>
                    <td className="fs-5 fw-bold">Selected Option</td>
                    <td className="fs-5 fw-bold">Correct Option</td>
                  </tr>
                  {mcqs.map((mcq, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{mcq.question}</td>
                      <td>{mcq.option1}</td>
                      <td>{mcq.option2}</td>
                      <td>{mcq.option3}</td>
                      <td>{mcq.option4}</td>
                      <td>{mcq.selectedoption}</td>
                      <td>{mcq.correctoption}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Last Activity */}
          <div className="card shadow-sm p-3 mb-4">
            <div className="card-body">
              <h5 className="text-center text-md-start">Last Activity</h5>
              <p><strong>Test Started: </strong>{new Date(userData.start).toLocaleString()}</p>
              <p><strong>Test Ended: </strong>{new Date(userData.end).toLocaleString()}</p>
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
