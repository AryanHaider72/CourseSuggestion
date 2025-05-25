"use client";
import React, { useEffect, useState } from 'react';
import { Accordion, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]); // To hold the courses fetched from backend
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [outline, setOutline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/component/Purchased', {}, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setCourses(response.data); // Set the fetched courses
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
            setError('Database Error');
          } else if (error.response.status === 404) {
            setError('No Data Found');
          } else if (error.response.status === 401) {
            setError('Not logged in');
          } else {
            setError('Other error');
          }
        } else {
          setError('Network Error');
        }
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = async (course) => {
    setSelectedCourse(course);
    setLoading(true);
    setOutline([]);
    setError("");

    try {
      const prompt = `Create a complete 8-week course outline on "${course.subject}".
For each week, include the following details in a structured JSON format:
- "week": (e.g. "Week 1")
- "title": A brief title for the week's focus
-"introduction": A small Introduction to the course
-"studyplan": write down a Study plan for it as well regrading all the modules added in the courses
- "topics": A list of 2 to 4 topics covered that week
- "description": A short paragraph (1-2 sentences) explaining what this week is about
- "videos": A list of helpful available YouTube links that works fine when visite that link (or online video resources), one video that includes all topics, that explains it well.

The output should be a valid JSON array of 8 objects.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      );

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const jsonMatch = rawText.match(/\[\s*{[\s\S]*?}\s*\]/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setOutline(parsed);
        console.log(outline);
      } else {
        throw new Error("No valid course outline found.");
      }

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load course outline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ overflowY: "scroll", height: '80vh' }}>
      <h1 className="my-4 text-center">Your Purchased Courses</h1>
      <Row className="g-4">
        {courses.map((course) => (
          <Col key={course.id} sm={12} md={6} lg={4}>
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>{course.subject}</Card.Title> {/* Display subject from API response */}
                <Card.Text>Understand and Master a core Concept of {course.subject}. A Fully customized Course Build for you to Learn and Grow more.</Card.Text>
                <button
                  className='btn btn-warning text-white p-2 fs-5'
                  onClick={() => handleCourseClick(course)} // Use course.subject to get details
                >
                  View Course
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <hr className="mt-4 mb-4" />

      {loading && <Spinner animation="border" variant="warning" className="d-block mx-auto" />}

      {error && <div className="alert alert-danger">{error}</div>}

      {selectedCourse && !loading && (
        <>
          <h2>{selectedCourse.subject} - Course Details</h2> {/* Use selected course's subject */}
          <a
            href={selectedCourse.videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mb-3 text-white"
            id='button1'
          >
            Watch Course Overview
          </a>

          <Accordion className="my-4">
            {outline.map((week, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header className='fw-bold fs-5'>{week.week}: {week.title}</Accordion.Header>
                <Accordion.Body>
                  <p><strong>Description:</strong> {week.description}</p>
                  <h6>Topics:</h6>
                  <ul>
                    {week.topics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>
                  <h6>Video:</h6>
                  <ul>
                    {week.videos.map((videoUrl, idx) => (
                      <li key={idx}>
                        <a href={videoUrl} target="_blank" rel="noopener noreferrer">{videoUrl}</a>
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      )}
    </Container>
  );
};

export default PurchasedCourses;
