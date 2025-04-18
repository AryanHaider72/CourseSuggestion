"use client";
import ManualPaymentPage from '../billing/page';
import React from "react";
import { useState } from 'react';

const courses = [
  {
    title: "Full-Stack Web Development",
    subtitle: "Master front-end and back-end development.",
    price: "$149",
  },
  {
    title: "Machine Learning with Python",
    subtitle: "Learn data processing and ML algorithms.",
    price: "$199",
  },
  {
    title: "UI/UX Design Bootcamp",
    subtitle: "Design intuitive and engaging interfaces.",
    price: "$99",
  },
  {
    title: "Cloud DevOps Essentials",
    subtitle: "Automate deployments using Docker and AWS.",
    price: "$129",
  },
  {
    title: "Full-Stack Web Development",
    subtitle: "Master front-end and back-end development.",
    price: "$149",
  },
  {
    title: "Machine Learning with Python",
    subtitle: "Learn data processing and ML algorithms.",
    price: "$199",
  },
  {
    title: "UI/UX Design Bootcamp",
    subtitle: "Design intuitive and engaging interfaces.",
    price: "$99",
  },
  {
    title: "Cloud DevOps Essentials",
    subtitle: "Automate deployments using Docker and AWS.",
    price: "$129",
  },
];

export default function CourseSuggestions() {
  const [active, setactive] = useState('')
  return (
    <div className="container" style={{ overflowY: "scroll", height:'80vh', position: "relative" }}>
      <h2 className="text-center mb-3 fw-bold">AI-Recommended Courses</h2>
      <p className="text-center text-muted mb-5">
        Handpicked just for you to level up your learning journey
      </p>

      <div className="row g-4">
        {courses.map((course, idx) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={idx}>
            <div className="card h-100 shadow-sm rounded-4">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-semibold">{course.title}</h5>
                  <p className="card-text text-muted small">{course.subtitle}</p>
                </div>
                <div className="mt-3">
                  <h6 className="text-warning fw-bold mb-2">{course.price}</h6>
                  <button className="btn text-white w-100 rounded-pill" id="button1" onClick={()=>{setactive('payment')}}>
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}
