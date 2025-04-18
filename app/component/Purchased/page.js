"use client";
import React, { useState } from 'react';
import { Accordion, Card, button, Container, Row, Col } from 'react-bootstrap';

// Sample data for purchased courses
const courses = [
  {
    id: 1,
    title: "React Development Mastery",
    description: "Learn React from scratch and master modern front-end development.",
    outline: [
      { week: "Week 1", topics: ["Introduction to React", "JSX and Components", "State and Props"] },
      { week: "Week 2", topics: ["Event Handling", "Conditional Rendering", "Lists and Keys"] },
      { week: "Week 3", topics: ["useState Hook", "useEffect Hook", "React Router Basics"] },
      { week: "Week 4", topics: ["Context API", "Form Handling", "API calls with Axios"] },
      { week: "Week 5", topics: ["Performance Optimization", "React DevTools", "Testing with Jest"] },
      { week: "Week 6", topics: ["Advanced Hooks", "Custom Hooks", "React Patterns"] },
      { week: "Week 7", topics: ["React with TypeScript", "State Management with Redux", "Handling Asynchronous Data"] },
      { week: "Week 8", topics: ["Building a Real-world App", "Deployment", "Code Review and Best Practices"] }
    ],
    introduction: "This course is designed for beginners who want to learn React and become proficient in front-end development. By the end of the course, you'll be able to create fully functional, performant React applications.",
    studyPlan: "The course is structured to be completed over 2 months. You'll spend 1 week per topic, with a clear path that includes theory, hands-on coding, and project work.",
    videoLink: "https://www.example.com/video-course-link"
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Master Python programming and data science to anyalyize datasets.",
    outline: [
      { week: "Week 1", topics: ["Introduction to Python", "Variables and Data Types", "Control Flow"] },
      { week: "Week 2", topics: ["Functions in Python", "Modules and Packages", "Handling Files"] },
      { week: "Week 3", topics: ["NumPy Basics", "Data Analysis with Pandas", "Data Visualization"] },
      { week: "Week 4", topics: ["Statistical Analysis", "Probability", "Data Cleaning"] },
      { week: "Week 5", topics: ["Machine Learning with Scikit-learn", "Supervised Learning", "Unsupervised Learning"] },
      { week: "Week 6", topics: ["Deep Learning Fundamentals", "Neural Networks", "TensorFlow Basics"] },
      { week: "Week 7", topics: ["Natural Language Processing", "Text Analysis", "Sentiment Analysis"] },
      { week: "Week 8", topics: ["Capstone Project", "Data Science Case Study", "Presenting Data Insights"] }
    ],
    introduction: "This course will teach you Python programming and how to use it for data science applications. By the end, you'll have the skills to analyze large datasets and build machine learning models.",
    studyPlan: "The course is designed to be completed in 2 months. Each week you'll work through a new concept, with practical exercises and coding challenges to strengthen your understanding.",
    videoLink: "https://www.example.com/python-course-link"
  }
];

const PurchasedCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  return (
    <Container style={{ overflowY: 'auto', maxHeight: "80vh" }}>
      <h1 className="my-4 text-center">Your Purchased Courses</h1>
      <Row>
        {courses.map((course) => (
          <Col key={course.id} md={4} className="mb-4">
            <Card style={{width:'20rem'}}>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <button className='btn text-white' id="button1" variant="primary" onClick={() => handleCourseClick(course)}>
                  View Course
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <hr className='mt-4 mb-4'/> 

      {selectedCourse && (
        <div>
          <h2>{selectedCourse.title} - Course Details</h2>
          <p><strong>Introduction:</strong> {selectedCourse.introduction}</p>
          <p><strong>Study Plan:</strong> {selectedCourse.studyPlan}</p>
          <button className='btn text-white ' id="button1" variant="info" href={selectedCourse.videoLink} target="_blank">Watch Course Videos</button>
            
          <Accordion className="my-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Course Outline</Accordion.Header>
              <Accordion.Body>
                {selectedCourse.outline.map((week, index) => (
                  <div key={index} className="my-3">
                    <h5>{week.week}</h5>
                    <ul>
                      {week.topics.map((topic, idx) => (
                        <li key={idx}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )}
    </Container>
  );
};

export default PurchasedCourses;
