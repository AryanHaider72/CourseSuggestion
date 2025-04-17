"use client";
import React, { useEffect, useState } from "react";
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

const MCQQuiz = () => {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [mcqs, setMcqs] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const fetchMCQs = async () => {
    setLoading(true);
    setSubmitted(false);
    setResult(null);
    setSummary(null);
    setUserAnswers({});
    setMcqs([]);

    const prompt = `Generate 5 ${level.toLowerCase()}-level MCQs on the topic ${subject}. Each question should have: question, options array, and answer. Return only JSON.`;

    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

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
    let correct = 0;
    let incorrect = 0;
    const goodAt = [];
    const needsImprovement = [];
    const courseSuggestions = [];

    mcqs.forEach((mcq, idx) => {
      if (userAnswers[idx] === mcq.answer) {
        correct++;
        goodAt.push(mcq.question);
      } else {
        incorrect++;
        needsImprovement.push(mcq.question);

        // Smart course suggestion logic
        if (mcq.question.toLowerCase().includes("data")) {
          courseSuggestions.push("Mastering Data Structures");
        } else if (mcq.question.toLowerCase().includes("algorithm")) {
          courseSuggestions.push("Algorithm Design");
        } else {
          courseSuggestions.push(`Improve ${subject} Fundamentals`);
        }
      }
    });

    setResult({ correct, total: mcqs.length });
    setSummary({
      subject,
      level,
      total: mcqs.length,
      correct,
      incorrect,
      goodAt,
      needsImprovement,
      courseSuggestions: [...new Set(courseSuggestions)],
    });
    setSubmitted(true);
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold text-warning">📝 Personalized MCQ Quiz</h2>

      {!showQuiz && (
        <Card className="p-4 shadow-sm">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter Subject or Course</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. JavaScript, Data Science"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Select Difficulty Level</Form.Label>
              <Form.Select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </Form.Select>
            </Form.Group>

            <div className="text-center">
              <Button
                variant="warning"
                onClick={fetchMCQs}
                disabled={!subject || loading}
                size="lg"
              >
                {loading ? "Generating Quiz..." : "Start Quiz"}
              </Button>
            </div>
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
            Topic: <span className="text-dark fw-bold">{subject}</span> | Level:{" "}
            <span className="fw-semibold">{level}</span>
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
                      const isWrong =
                        submitted && userAnswers[index] === opt && opt !== mcq.answer;

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
              <Button variant="warning" size="lg" onClick={evaluateAnswers}>
                Submit Answers
              </Button>
            </div>
          )}

          {result && (
            <Alert variant="warning" className="mt-4 text-center">
              <h4 className="fw-bold">
                You scored: {result.correct} / {result.total}
              </h4>
            </Alert>
          )}

          {summary && (
            <div className="mt-4">
              <h5 className="text-center fw-bold mb-3">📊 Smart AI Feedback</h5>
              <Row className="text-center mb-4">
                <Col>
                  <h6 style={{ color: "green" }}>You&apos;re Good At:</h6>
                  {summary.goodAt.map((q, idx) => (
                    <p key={idx} className="text-success small">
                      ✅ {q}
                    </p>
                  ))}
                </Col>
                <Col>
                  <h6 style={{ color: "red" }}>Needs Improvement:</h6>
                  {summary.needsImprovement.map((q, idx) => (
                    <p key={idx} className="text-danger small">
                      ❌ {q}
                    </p>
                  ))}
                </Col>
              </Row>

              <div className="text-center">
                <h6 className="fw-semibold mb-2">🎯 Suggested Courses:</h6>
                {summary.courseSuggestions.map((course, idx) => (
                  <Badge key={idx} bg="warning" className="mx-1 p-2 text-dark fs-6">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default MCQQuiz;
