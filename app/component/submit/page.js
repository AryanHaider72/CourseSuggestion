import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CourseSuggestions from "../suggestion/page";

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

export default function SubmitPayment() {
    const [active, setactive]= useState('');
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedForm, setSelectedForm] = useState('');
  const [receipt, setReceipt] = useState(null);
  const itemRefs = useRef([]);



  const CashPaymentForm = () => (
    <fieldset>
      <h4 className="mt-4 mx-2">Cash Payment</h4>
      <div className="container d-flex">
      <div className="card" style={{width: "20rem"}}>
            <div className="card-body">
                <h5 className="card-title">EasyPaisa Transfer</h5>
                <hr></hr>
                <h6 className="card-subtitle mb-2 text-muted">Account Details</h6>
                <div className="card-text d-flex justify-content-between align-items-center"><span className="fs-5 fw-bold">Account Title:</span><span> Hello World</span> </div>
                <div className="card-text d-flex justify-content-between align-items-center"><span className="fs-5 fw-bold">Account Number:</span><span> +92-12345678</span> </div>
            </div>
            </div>
        </div>  
    </fieldset>
  );
  const CardPaymentForm = () =>(
    <fieldset>
    <h4 className="mt-4 mx-2">Cash Payment</h4>
    <div className="container d-flex">
    <div className="card" style={{width: "25rem"}}>
          <div className="card-body">
              <h5 className="card-title">Bank Transfer</h5>
              <hr></hr>
              <h6 className="card-subtitle mb-2 text-muted">Account Details</h6>
              <div className="card-text d-flex justify-content-between align-items-center"><span className="fs-5 fw-bold">Account Title:</span><span> Hello World</span> </div>
              <div className="card-text d-flex justify-content-between align-items-center"><span className="fs-5 fw-bold">Account Number:</span><span> PAK00012344678808</span> </div>
          </div>
          </div>
      </div>  
    </fieldset>
  );
  // Handle payment form submission
  const handlePayment = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('subject', subject);
    formData.append('paymentMethod', selectedForm);
    formData.append('receipt', receipt);

    try {
      const res = await axios.post('http://localhost:3001/component/submitPayment', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if(res.status===200){
        alert("Successfully Upload");
        console.log(res.data.message);
        }
    } catch (error) {
        if(error.status==500){
            console.log("Databse Error");
        }
        if(error.status == 401){
            console.log("user log in please");
        }
      console.error(error);
      alert('Error submitting payment');
    }
  };

  // Fetch courses for search suggestions
  useEffect(() => {
    if (query.trim() === '') return setSuggestions([]);
    const filtered = coursesList.filter((course) =>
      course.toLowerCase().startsWith(query.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(true);
  }, [query]);

  const handleSelect = (value) => {
    setQuery(value);
    setSubject(value);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      handleSelect(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };
  const handleclick=()=>{
    setactive('suggestion');
}

  return (
    <div>
        {active == '' ?
            (<>
        <div style={{display:'flex', justifyContent:'end'}}><button onClick={handleclick} className="btn btn-sm btn-outline-danger"style={{ fontSize: "1.5rem", lineHeight: "1" }}>&times;</button></div>
      <h1 className="mb-4 text-center">Course Payment</h1>
      <div className="container mt-5">
        <form onSubmit={handlePayment}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-5">Full Name:</label>
            <input type="text" className="form-control fs-5" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" id="name" name="name" required />
          </div>

          <div className="mb-3">
            <label htmlFor="course" className="form-label fs-5">Course Name:</label>
            <input type="text" className="form-control fs-5" value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setShowSuggestions(true)} onKeyDown={handleKeyDown} placeholder="Start typing a course name" />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="list-group position-absolute w-25 mt-1">
                {suggestions.map((course, index) => (
                  <li key={index} onMouseDown={() => handleSelect(course)} className="list-group-item list-group-item-action" style={{ cursor: 'pointer' }}>
                    {course}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="Select" className="fs-5">Payment Methods:</label>
            <select id="paymentMethod" name="paymentMethod" className="form-select fs-5" onChange={(e) => setSelectedForm(e.target.value)} defaultValue="">
              <option value="">Select Method</option>
              <option value="EasyPaisacash">EasyPaisa Transfer</option>
              <option value="BankTransfer">Bank Transfer</option>
            </select>
            {selectedForm === 'EasyPaisacash' && <CashPaymentForm />}
            {selectedForm === 'BankTransfer' && <CardPaymentForm />}
          </div>

          <div className="mb-3">
            <label htmlFor="receipt" className="form-label fs-5">Attach Receipt:</label>
            <input type="file" className="form-control fs-5" id="receipt" name="receipt" onChange={(e) => setReceipt(e.target.files[0])} required />
          </div>

          <button type="submit" className="btn fs-5" id='button1'>Pay Now</button>
        </form>
      </div>
      </>):
      (<div>
        {active === 'suggestion' && <CourseSuggestions />}
        </div>)}
    </div>
  );
}
