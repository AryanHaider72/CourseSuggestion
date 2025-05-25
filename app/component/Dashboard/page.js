"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const coursesList = [
  "Algorithms and Data Structures",
  "Artificial Intelligence",
  "Android App Development",
  "Agile Software Development",
  "AWS Cloud Fundamentals",
  "Blockchain Technology",
  "Big Data Analytics",
  "Business Intelligence",
  "C++ Programming",
  "C# Programming",
  "Cloud Computing",
  "Computer Architecture",
  "Compiler Design",
  "Cybersecurity Essentials",
  "Cryptography",
  "Creative Coding",
  "Data Science with Python",
  "Data Visualization",
  "Database Management Systems",
  "Deep Learning",
  "DevOps Foundations",
  "Digital Logic Design",
  "Docker & Kubernetes",
  "E-commerce Development",
  "Ethical Hacking",
  "Embedded Systems",
  "Edge Computing",
  "Excel for Data Analysis",
  "Full Stack Development",
  "Front-End Development",
  "Flutter App Development",
  "Functional Programming",
  "Game Development with Unity",
  "Git & GitHub",
  "GraphQL Fundamentals",
  "Go Programming Language",
  "Google Cloud Platform (GCP)",
  "Human-Computer Interaction",
  "HTML5 & CSS3",
  "Hadoop Ecosystem",
  "Hybrid Mobile Apps",
  "IoT (Internet of Things)",
  "Information Security",
  "iOS Development",
  "Intro to Programming",
  "Java Programming",
  "JavaScript Mastery",
  "Jenkins CI/CD",
  "JIRA for Project Management",
  "Kotlin for Android",
  "Kubernetes Basics",
  "Kafka Streaming",
  "Linux Fundamentals",
  "Lean Software Development",
  "Linear Algebra for CS",
  "Machine Learning",
  "MongoDB Essentials",
  "MySQL for Developers",
  "Mobile App Security",
  "Natural Language Processing",
  "Network Security",
  "Node.js API Development",
  "Neural Networks",
  "Object-Oriented Programming",
  "Operating Systems",
  "OpenCV with Python",
  "Python for Everybody",
  "PostgreSQL Basics",
  "Programming in Rust",
  "Penetration Testing",
  "Quantum Computing Basics",
  "QuickBooks for IT",
  "ReactJS Development",
  "Responsive Web Design",
  "RESTful API Design",
  "R Programming for Data Science",
  "Ruby on Rails",
  "Robotic Process Automation (RPA)",
  "Software Testing & QA",
  "Software Engineering",
  "SQL for Beginners",
  "Shell Scripting",
  "Spring Boot with Java",
  "System Design",
  "TensorFlow Deep Learning",
  "TypeScript Basics",
  "UI/UX Design",
  "Unity Game Development",
  "Unix Shell Scripting",
  "Version Control with Git",
  "Virtual Reality Development",
  "Vue.js Crash Course",
  "Visual Basic Programming",
  "Web Development Bootcamp",
  "Web Accessibility Standards",
  "Xamarin for Cross-Platform Apps",
  "XML & JSON Data Handling",
  "YouTube API Integration",
  "YouTube for Developers",
  "ZK Framework Basics",
  "Zero Trust Architecture",
  "Zig Programming Language",
];

const MCQQuizWithSearch = () => {
  const [Name, setName] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [subject, setSubject] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mcqs, setMcqs] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [score, setScore] = useState();
  const [goodAt, setGoodAt] = useState([]);
  const [needsImprovement, setNeedsImprovement] = useState([]);
  const router = useRouter();
  const [submittedData,setsubmitedData]= useState([])

  

  const formatDateTime = (date) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      " " +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds())
    );
  };

  const handleNameChange = (e) => setName(e.target.value);
  useEffect(()=>{
    const checkauth =async () =>{
    try{
    const res = await axios.post(
      "https://server-production-1573.up.railway.app/component/sidebar",{},{
        withCredentials: true,
      })
      if(res.status==200){
        quizdata();
      }
    }
    catch(error){
      if(error.response?.status == 401){
        alert('Login Please');
        router.push('/login');
      }
    }
  }
  },[])

  const quizdata = async () => {
    if (score == null || endDateTime == null) return;

    try {
      const res = await axios.post(
        " /component/Dashboard",
        {
          name: Name,
          subject: subject,
          level: level,
          percent: score,
          start_time: formatDateTime(startDateTime),
          end_time: formatDateTime(endDateTime),
          goodAt,
          improvement: needsImprovement,
          courseSuggestions: summary?.courseSuggestions || [],
          submittedData: submittedData,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert("Result Uploaded Successfully");
        console.log(submittedData);
      }
      
    } catch (err) {
      if(err.response?.status == 401){
        alert("User Not Logged in");
        router.push('/login');
      } else {
        alert("Database Error");
      }
    }
  };

  useEffect(() => {
    if (submitted && score !== undefined && endDateTime !== null) {
      quizdata();
    }
  }, [submitted, score, endDateTime]);

  useEffect(() => {
    if (highlightedIndex !== null && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    if (query.trim() === "") return setSuggestions([]);
    const filtered = coursesList.filter((course) =>
      course.toLowerCase().startsWith(query.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
  }, [query]);

  const handleSelect = (value) => {
    setQuery(value);
    setSubject(value);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelect(suggestions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const fetchMCQs = async () => {
    setLoading(true);
    setSubmitted(false);
    setResult(null);
    setSummary(null);
    setUserAnswers({});
    setMcqs([]);
    setStartDateTime(new Date());
    setEndDateTime(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate 5 ${level.toLowerCase()}-level MCQs on the topic strictly related to ${subject}. Each question should have: question, options array, and answer. Return only JSON.`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const jsonMatch = rawText.match(/\[\s*{[\s\S]*?}\s*\]/);
      if (jsonMatch) {
        const cleanJson = JSON.parse(jsonMatch[0]);
        setMcqs(cleanJson);
        setShowQuiz(true);
      } else {
        console.error("No valid MCQ JSON found.");
      }
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (questionIndex, selectedOption) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const evaluateAnswers = () => {
    const now = new Date();
    setEndDateTime(now);
  
    let correct = 0;
    let incorrect = 0;
  
    const topicStats = {
      [subject]: { correct: 0, incorrect: 0 }
    };
    const courseSuggestions = new Set();
  
    // Store final data to set once after evaluating all answers
    const finalData = [];
  
    mcqs.forEach((mcq, idx) => {
      const questionLower = mcq.question.toLowerCase();
      const isCorrect = userAnswers[idx] === mcq.answer;
  
      if (isCorrect) {
        correct++;
        topicStats[subject].correct++;
      } else {
        incorrect++;
        topicStats[subject].incorrect++;
  
        if (questionLower.includes("data")) {
          courseSuggestions.add("Mastering Data Structures");
        } else if (questionLower.includes("algorithm")) {
          courseSuggestions.add("Algorithm Design");
        } else {
          courseSuggestions.add(`Improve ${subject} Fundamentals`);
        }
      }
  
      finalData.push({
        question: mcq.question,
        options: mcq.options,
        correctAnswer: mcq.answer,
        selectedOption: userAnswers[idx] || null,
        isCorrect: isCorrect,
      });
    });
  
    setsubmitedData(finalData);  // Set state after the loop (Only once)
  
    // Final topic evaluation
    const goodTopics = [];
    const improveTopics = [];
  
    for (const topic in topicStats) {
      const { correct, incorrect } = topicStats[topic];
      if (correct >= incorrect) {
        goodTopics.push(topic);
      } else {
        improveTopics.push(topic);
      }
    }
  
    setGoodAt(goodTopics);
    setNeedsImprovement(improveTopics);
  
    // Final result and score
    setResult({ correct, total: mcqs.length });
    setScore((correct / mcqs.length) * 100);
    setSummary({
      subject,
      level,
      total: mcqs.length,
      correct,
      incorrect,
      goodAt: goodTopics,
      needsImprovement: improveTopics,
      courseSuggestions: [...courseSuggestions],
    });
  };
  
  

  return (
    <Container className="py-5" style={{ overflowY: "scroll", height: "650px" }}>
      <h2 className="text-center mb-4 fw-bold text-warning">
        🎓 Welcome, {Name || "Learner"}!
      </h2>
      <h3>Start Your Personalization</h3>
      <p className="text-secondary">
        Fill in your information to get started with the test of your own choice.
      </p>

      {!showQuiz && (
        <Card className="p-4 shadow-sm">
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={Name}
                  onChange={handleNameChange}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Start typing a course name"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="list-group position-absolute w-25 mt-1">
                    {suggestions.map((course, index) => (
                      <li
                        key={index}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={`list-group-item list-group-item-action ${
                          index === highlightedIndex ? "active" : ""
                        }`}
                        onMouseDown={() => handleSelect(course)}
                        style={{ cursor: "pointer" }}
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Proficiency Level</Form.Label>
              <Form.Select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </Form.Select>
            </Form.Group>

            <Button
              className="btn text-white"
              variant="warning"
              type="submit"
              onClick={fetchMCQs}
              disabled={!subject || loading}
              size="lg"
            >
              {loading ? "Generating Quiz..." : "Start Quiz"}
            </Button>
          </Form>
        </Card>
      )}

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="warning" />
        </div>
      )}

      {showQuiz && !loading && (
        <>
          <h4 className="text-center text-secondary mt-5 mb-3">
            Subject: <span className="text-dark fw-bold">{subject}</span> | Level: <span className="fw-semibold">{level}</span>
          </h4>

          <Row xs={1} className="g-4">
            {mcqs.map((mcq, index) => (
              <Col key={index}>
                <Card className="p-3 border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title className="mb-4 fw-semibold text-dark fs-5">
                      Q{index + 1}: {mcq.question}
                    </Card.Title>
                    {mcq.options.map((opt, i) => {
                      const isCorrect = submitted && opt === mcq.answer;
                      const isWrong = submitted && userAnswers[index] === opt && opt !== mcq.answer;

                      return (
                        <div
                          key={i}
                          className={`p-3 mb-2 rounded border ${
                            isCorrect
                              ? "border-success bg-success bg-opacity-10"
                              : isWrong
                              ? "border-danger bg-danger bg-opacity-10"
                              : "border-warning"
                          }`}
                        >
                          <Form.Check
                            type="radio"
                            label={opt}
                            name={`q-${index}`}
                            value={opt}
                            onChange={() => handleChange(index, opt)}
                            checked={userAnswers[index] === opt}
                          />
                        </div>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {!submitted && (
            <div className="text-center mt-5">
              <Button
                className="btn text-white"
                variant="warning"
                size="lg"
                onClick={() => {
                  evaluateAnswers();
                  setSubmitted(true);
                }}
              >
                Submit Answers
              </Button>
            </div>
          )}

          {score !== undefined && (
            <Alert variant="warning" className="mt-4 text-center">
              <h4 className="fw-bold">
                You scored: {result.correct} / {result.total} ({score.toFixed(2)}%)
              </h4>
            </Alert>
          )}

          {startDateTime && endDateTime && (
            <Alert variant="light" className="text-center">
              <div><strong>Quiz Started:</strong> {startDateTime.toLocaleString()}</div>
              <div><strong>Quiz Submitted:</strong> {endDateTime.toLocaleString()}</div>
            </Alert>
          )}

        </>
      )}
    </Container>
  );
};

export default MCQQuizWithSearch;
