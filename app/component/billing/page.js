"use client";
import React, { useState,useEffect,useRef } from "react";
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
import { Banknote, Smartphone } from "lucide-react";
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
export default function ManualPaymentPage() {
  const [method, setMethod] = useState("bank");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  const paymentInfo = {
    bank: {
      title: "Bank Transfer",
      name: "John Doe",
      accountNumber: "1234567890",
      accountTitle: "John Doe",
      iban: "PK00ABCD1234567890001234",
    },
    easypaisa: {
      title: "Easypaisa",
      name: "John Doe",
      phone: "0300-1234567",
      cnic: "12345-6789012-3",
    },
  };

  const courses = [
    { title: "Web Development", subtitle: "Learn HTML, CSS, JS", price: "Rs. 5,000" },
    { title: "Python Programming", subtitle: "Data & Automation", price: "Rs. 6,500" },
    { title: "UI/UX Design", subtitle: "Design thinking & tools", price: "Rs. 4,800" },
  ];

  const selected = paymentInfo[method];

  const whatsappMessage = encodeURIComponent(
    `Hello, I have completed the payment via ${selected.title}. Please find the transaction receipt attached.\n\nPayment Method: ${selected.title}\nName: ${selected.name}`
  );

  return (
    <div className="container" id="container" style={{ overflowY: "auto", maxHeight: "80vh", position: "relative" }}>
      
      <h1 className="text-center">Complete Enrollment</h1>
      <hr/>
      <div className="row g-4 mb-5" style={{position:'relative', zIndex:'1000'}}>
      <Row className="mb-3 mt-4">
      <Col>
      <Form.Label>Course Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Start typing a course name"
                        style={{zIndex:'100'}}
                      />
                      {showSuggestions && suggestions.length > 0 && (
                        <ul className="list-group position-absolute w-50 mt-1">
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
      </div>

      <div className="card shadow-lg rounded-4 p-4">
        <h2 className="text-center  text-warning mb-4">Manual Payment</h2>

        {/* Payment Method Buttons */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button
            className={`btn ${method === "bank" ? "btn-warning" : "btn-outline-warning"} d-flex align-items-center gap-2 px-4`}
            onClick={() => setMethod("bank")}
          >
            <Banknote size={18} />
            Bank Transfer
          </button>
          <button
            className={`btn ${method === "easypaisa" ? "btn-warning" : "btn-outline-warning"} d-flex align-items-center gap-2 px-4`}
            onClick={() => setMethod("easypaisa")}
          >
            <Smartphone size={18} />
            Easypaisa
          </button>
        </div>

        {/* Payment Info Card */}
        <div className="card bg-light border-0 p-4 mb-4" style={{zIndex:'10'}}>
          <h5 className="mb-3">{selected.title} Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Name:</strong> {selected.name}</li>
            {method === "bank" ? (
              <>
                <li className="list-group-item"><strong>Account Number:</strong> {selected.accountNumber}</li>
                <li className="list-group-item"><strong>Account Title:</strong> {selected.accountTitle}</li>
                <li className="list-group-item"><strong>IBAN:</strong> {selected.iban}</li>
              </>
            ) : (
              <>
                <li className="list-group-item"><strong>Phone:</strong> {selected.phone}</li>
                <li className="list-group-item"><strong>CNIC:</strong> {selected.cnic}</li>
              </>
            )}
          </ul>
        </div>

        {/* WhatsApp Button */}
        <div className="text-center">
          <a
            href={`https://wa.me/923001234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn text-white btn-lg d-inline-flex align-items-center gap-2 px-4"
            id="button1"
          >
            <Smartphone size={20} />
            Send Receipt via WhatsApp
          </a>
          <p className="text-muted mt-2 small">Make sure to attach your transaction screenshot.</p>
        </div>
      </div>
    </div>
  );
}
