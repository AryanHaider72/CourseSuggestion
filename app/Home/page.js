"use client";
import Image from "next/image";
import Link from 'next/link';
import { LibraryBig,  BookUser,  AlarmClockCheck, X } from 'lucide-react';
import { useState, useEffect,useRef } from "react";

const coursesList = [
    'Algorithms and Data Structures',
    'Artificial Intelligence',
    'Android App Development',
    'Agile Software Development',
    'AWS Cloud Fundamentals',
    'Blockchain Technology',
    'Big Data Analytics',
    'Business Intelligence',
    'C++ Programming',
    'C# Programming',
    'Cloud Computing',
    'Computer Architecture',
    'Compiler Design',
    'Cybersecurity Essentials',
    'Cryptography',
    'Creative Coding',
    'Data Science with Python',
    'Data Visualization',
    'Database Management Systems',
    'Deep Learning',
    'DevOps Foundations',
    'Digital Logic Design',
    'Docker & Kubernetes',
    'E-commerce Development',
    'Ethical Hacking',
    'Embedded Systems',
    'Edge Computing',
    'Excel for Data Analysis',
    'Full Stack Development',
    'Front-End Development',
    'Flutter App Development',
    'Functional Programming',
    'Game Development with Unity',
    'Git & GitHub',
    'GraphQL Fundamentals',
    'Go Programming Language',
    'Google Cloud Platform (GCP)',
    'Human-Computer Interaction',
    'HTML5 & CSS3',
    'Hadoop Ecosystem',
    'Hybrid Mobile Apps',
    'IoT (Internet of Things)',
    'Information Security',
    'iOS Development',
    'Intro to Programming',
    'Java Programming',
    'JavaScript Mastery',
    'Jenkins CI/CD',
    'JIRA for Project Management',
    'Kotlin for Android',
    'Kubernetes Basics',
    'Kafka Streaming',
    'Linux Fundamentals',
    'Lean Software Development',
    'Linear Algebra for CS',
    'Machine Learning',
    'MongoDB Essentials',
    'MySQL for Developers',
    'Mobile App Security',
    'Natural Language Processing',
    'Network Security',
    'Node.js API Development',
    'Neural Networks',
    'Object-Oriented Programming',
    'Operating Systems',
    'OpenCV with Python',
    'Python for Everybody',
    'PostgreSQL Basics',
    'Programming in Rust',
    'Penetration Testing',
    'Quantum Computing Basics',
    'QuickBooks for IT',
    'ReactJS Development',
    'Responsive Web Design',
    'RESTful API Design',
    'R Programming for Data Science',
    'Ruby on Rails',
    'Robotic Process Automation (RPA)',
    'Software Testing & QA',
    'Software Engineering',
    'SQL for Beginners',
    'Shell Scripting',
    'Spring Boot with Java',
    'System Design',
    'TensorFlow Deep Learning',
    'TypeScript Basics',
    'UI/UX Design',
    'Unity Game Development',
    'Unix Shell Scripting',
    'Version Control with Git',
    'Virtual Reality Development',
    'Vue.js Crash Course',
    'Visual Basic Programming',
    'Web Development Bootcamp',
    'Web Accessibility Standards',
    'Xamarin for Cross-Platform Apps',
    'XML & JSON Data Handling',
    'YouTube API Integration',
    'YouTube for Developers',
    'ZK Framework Basics',
    'Zero Trust Architecture',
    'Zig Programming Language'
  ];

export default function Landing() {
  const itemRefs = useRef([]);
    const[showoverly, setshowoverly] = useState(false);
    const [selectedForm, setSelectedForm] = useState('');
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const overlayRef = useRef(null);
      
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
      const handleParentClick = () => {
        handleclick(); // this will hide the overlay
    };

    const stopPropagation = (e) => {
        e.stopPropagation(); // prevent closing when clicking inside
    };

    const handleclick = (e) => {
        setshowoverly(false);
      };
    
      const handleCloseOverlay = () => {
        setshowoverly(true);
      };
      useEffect(() => {
        if (
          highlightedIndex !== null &&
          itemRefs.current[highlightedIndex]
        ) {
          itemRefs.current[highlightedIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }, [highlightedIndex]);
      useEffect(() => {
            if (query.trim() === '') {
              setSuggestions([]);
              return;
            }
        
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
            } else if (e.key === 'Enter') {
              if (highlightedIndex >= 0) {
                handleSelect(suggestions[highlightedIndex]);
              }
            } else if (e.key === 'Escape') {
              setShowSuggestions(false);
            }
          };
    return (
      <>
    <div className={`parent-div ${showoverly ? 'd-flex':'d-none'}`}onClick={handleParentClick}>
        <div className="overly-div" onClick={stopPropagation}>
            <div style={{}}>
                <X  onClick={handleclick} cursor={"pointer"} style={{position:'absolute', right:'2%', top:'2%'}}/>
            </div>
            <div className="mx-3" style={{width:'90%'}}>
                <h1 className="mt-3 ">Website Development </h1>
                <hr className="w-100"/>
                <h3 className="mt-3 " style={{textDecoration:'underline 3px #ffa835'}}>About Course:</h3>
                <p className="text-muted" style={{width:'95%'}}>This comprehensive course takes you from the basics of front-end web development to advanced back-end skills, enabling you to build fully functional, responsive, and scalable websites. Whether you're a complete beginner or 
                    looking to upgrade your skills, this course prepares you for real-world projects and job-ready outcomes.</p>
                <hr className="w-50 mt-5"></hr>
                <h3 className="mt-3 " style={{textDecoration:'underline 3px #ffa835'}}>Course Objectives:</h3>
                <li className="container text-muted" style={{width:'95%'}}>Build responsive websites using HTML5, CSS3, and JavaScript.</li>
                <li className="container text-muted" style={{width:'95%'}}>Use modern frameworks like Bootstrap, React, and Node.js.</li>
                <li className="container text-muted" style={{width:'95%'}}>Manage data with MongoDB and integrate back-end functionality.</li>
                <li className="container text-muted" style={{width:'95%'}}>Deploy websites to live servers (GitHub Pages, Netlify, or Heroku).</li>
                <li className="container text-muted" style={{width:'95%'}}>Understand version control with Git and GitHub.</li>
                <li className="container text-muted" style={{width:'95%'}}>Build portfolio-ready web projects.</li>
                <hr className="w-50 mt-5"></hr>
                <h3 className="mt-3 " style={{textDecoration:'underline 3px #ffa835'}}>Course Outline:</h3>

                <p className="mx-4 fs-5 mt-4 mb-0 fw-bold">Module 1: Web Development Fundamentals</p>
                <li className="mx-5 text-muted">Introduction to Web Development (Frontend, Backend, Full Stack)</li>
                <li className="mx-5 text-muted">Environment setup (VS Code, Git, Browsers)</li>
                <li className="mx-5 text-muted">HTML, CSS basics and responsive design</li>

                <p className="mx-4 fs-5 mt-4 mb-0 fw-bold">Module 2: JavaScript Essentials</p>
                <li className="mx-5 text-muted">Variables, functions, loops & conditionals</li>
                <li className="mx-5 text-muted">DOM Manipulation & Events</li>
                <li className="mx-5 text-muted">Intro to Bootstrap and UI styling</li>

                <p className="mx-4 fs-5 mt-4 mb-0 fw-bold">Module 3: React JS</p>
                <li className="mx-5 text-muted">Components, JSX, Props & State</li>
                <li className="mx-5 text-muted">Hooks and building SPAs</li>

                <p className="mx-4 fs-5 mt-4 mb-0 fw-bold">Module 4: Backend & Database</p>
                <li className="mx-5 text-muted">Node.js, Express & REST APIs</li>
                <li className="mx-5 text-muted">MongoDB fundamentals & CRUD operations</li>

                <p className="mx-4 fs-5 mt-4 mb-0 fw-bold">Module 5: Version Control & Final Project</p>
                <li className="mx-5 text-muted">Git, GitHub, Netlify/Vercel deployment</li>
                <li className="mx-5 text-muted">Capstone project: Full-stack app integration</li>
              {/*
                <h3 className="mt-3 " style={{textDecoration:'underline 3px #ffa835'}}>Payment Methods</h3>
                <div className="container d-flex ">
                    <div className="col-md-6 col-sm-12 d-flex flex-column" style={{marginLeft:'5px', marginBottom:'10px'}}>
                            <label htmlFor="Select" className="mt-3 fs-5 mb-2">Payment Methods:</label>
                            <select id="paymentMethod" name="paymentMethod" className="form-select" onChange={(e) => setSelectedForm(e.target.value)} defaultValue="">
                            <option value="">Select Method</option>
                            <option value="EasyPaisacash">EasyPaisa Transfer</option>
                            <option value="BankTransfer">Bank Transfer</option>
                            </select>
                            {selectedForm === 'EasyPaisacash' && <CashPaymentForm />}
                            {selectedForm === 'BankTransfer' && <CardPaymentForm />}
                    </div>
                </div>
                */}
                <a className="btn mt-3 mb-3 text-light mx-auto text-center" id="button1" target="_blank" href="https://wa.me/923335005535">Payments</a>
            </div>
        </div>
    </div>
    
        <section className="background" id="home-section">
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent" style={{backdropFilter: 'blur(10px)',WebkitBackdropFilter: 'blur(10px)',backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
    
            <div style={{marginLeft:'10px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <h4 style={{color:'#ffa835', fontWeight:'700', fontSize:'30px', marginTop:'10px', marginLeft:'10px'}}>EduCourse</h4>
                </div>
    
                {/* 🔸 Mobile Toggler */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
    
                {/* 🔸 Nav Links & Buttons */}
                <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0" style={{ gap: '20px', marginRight: '20px' }}>
                    <li className="nav-item">
                    <a className="nav-link" id="nav-link" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link"id="nav-link" href="#course-section">Courses</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link"id="nav-link" href="#about-section">About</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link"id="nav-link" href="#contact-section">Contact</a>
                    </li>
                </ul>
    
                {/* 🔸 Buttons */}
                <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                    <Link href="/signup" className="btn text-white" id="button1">Join Now</Link>
                    <Link href="/login" className="btn text-white"id="button2">Log in</Link>
                </div>
                </div>
    
            </div>
            </nav>

            <div className="container" id="heading-section">
                <div className="heading mb-0">
                    <h1>Online<span> Learning</span> Platform</h1>
                    <p>Join thousands of learners gaining real-world skills through expert-led, flexible online courses designed to help you grow and succeed. Become a part of our comunity.</p>
                </div>

                <div className="d-flex mt-0">
                    <div className="mb-3">
                        <select id="disabledSelect" className="form-select" style={{padding: "0.375rem 1.75rem 0.375rem 0.75rem"}}>
                            <option style={{}}>Level</option>
                            <option >Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    <div className="position-relative w-25">
        <input type="text"className="form-control"placeholder="Search for a course..."value={query}onChange={(e) => setQuery(e.target.value)}onFocus={() => setShowSuggestions(true)}onKeyDown={handleKeyDown} />
  
        {showSuggestions && suggestions.length > 0 && (
          <ul
          className="list-group position-absolute w-100"
          style={{ zIndex: 999, height: '130px', overflowY: 'scroll' }}
        >
          {suggestions.map((course, index) => (
            <li
              key={index}
              ref={el => (itemRefs.current[index] = el)}
              className={`list-group-item list-group-item-action ${
                index === highlightedIndex ? 'active' : ''
              }`}
              onMouseDown={() => handleSelect(course)}
              style={{ cursor: 'pointer' }}
            >
              {course}
            </li>
          ))}
        </ul>
        )}
                    </div>
                    <div>
                        <button className="btn text-light" style={{padding: "7px 17px"}} id="button1">Search</button>
                    </div>
                </div>
            </div>
            
        </section>

        <section  id="course-section">
                <div className="text-center mx-auto mt-5">
                    <h1 className="text-dark mb-5" style={{textDecoration:'underline 3px #ffa835'}}>Our Courses</h1>
                    <hr className="w-100"/>
                    <p className="w-75 mx-auto text-secondary">Master today’s most in-demand skills with our expert-led courses, thoughtfully designed to accelerate your career growth, boost your confidence, and help you achieve your professional goals. Whether you're starting fresh or
                         looking to level up, our hands-on learning approach ensures you stay ahead in a competitive world</p>
                </div>
                <div className="container mt-4">
                    <div className="row mx-auto justify-content-center">
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
                            <div className="card" style={{width: '20rem', marginRight:'20px', padding:'0'}}>
                                <img src="/card1.webp" className="card-img-top " style={{width: '100%', height: '200px', objectFit: 'cover'}} alt="..."/>
                                <div className="card-body">
                                    <p className="text-secondary mb-0">User Development</p>
                                    <h5 className="card-title"> Website Development Bootcamp</h5>
                                    <p className="card-text">Learn HTML, CSS, JavaScript including modern frameworks to build responsive, real-world websites from scratch.</p>
                                    <div className="d-flex justify-content-between">
                                        <p className="text-secondary"><span style={{color:'#ffa835'}}>(4.5)</span>Based Rating</p>
                                        <h3 className="mb-3">1250<span className="text-secondary fs-5">/-</span></h3>
                                    </div>
                                    <a href="#course-section" className="btn text-white" onClick={handleCloseOverlay} id="button5">Find Out More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
                            <div className="card" style={{width: '20rem', marginRight:'20px', padding:'0'}}>
                                <img src="/card2.webp" className="card-img-top " style={{width: '100%', height: '200px', objectFit: 'cover'}} alt="..."/>
                                <div className="card-body">
                                    <p className="text-secondary mb-0">User Experience</p>
                                    <h5 className="card-title"> Digital Marketing Fundamentals</h5>
                                    <p className="card-text">Master SEO, social media, email marketing, and paid ads to grow any business or personal brand online.</p>
                                    <div className="d-flex justify-content-between">
                                        <p className="text-secondary"><span style={{color:'#ffa835'}}>(4.5)</span>Based Rating</p>
                                        <h3 className="mb-3">1250<span className="text-secondary fs-5">/-</span></h3>
                                    </div>
                                    <a href="#course-section" className="btn text-white" onClick={handleCloseOverlay} id="button5">Find Out More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
                            <div className="card" style={{width: '20rem', marginRight:'20px', padding:'0'}}>
                                <img src="/card3.webp" className="card-img-top " style={{width: '100%', height: '200px', objectFit: 'cover'}} alt="..."/>
                                <div className="card-body">
                                    <p className="text-secondary mb-0">User Understanding</p>
                                    <h5 className="card-title"> Data Analytics with Excel & Python</h5>
                                    <p className="card-text">Analyze, visualize, and interpret data using powerful industry tools to make smarter, faster, data-driven decisions.</p>
                                    <div className="d-flex justify-content-between">
                                        <p className="text-secondary"><span style={{color:'#ffa835'}}>(4.5)</span>Based Rating</p>
                                        <h3 className="mb-3">1250<span className="text-secondary fs-5">/-</span></h3>
                                    </div>
                                    <a href="#course-section" className="btn text-white" onClick={handleCloseOverlay} id="button5">Find Out More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
        </section>

        <section className="About-section" id="about-section">
        <h1 className="text-light mt-5 text-center" style={{textDecoration:'underline 3px #ffa835'}}>About Us</h1>
        <hr className="w-100"/>
        <div className="container">
            <div className="about-section mx-auto mt-5">
                <div className="about-image">
                    <img src="/about1.webp"/>
                </div>
                <div className="about-content">
                    <h1 className="font-weight-bolder mt-5 text-white">Learn new skills onlin<span  style={{color:"#ffa835"}}>e with top</span> educators</h1>
                    <h6 className="text-muted">Empowering Learning, Everywhere.</h6>
                    <p>At Coursea, we believe that education should be accessible, practical, and inspiring. Our mission is to empower individuals with the skills they need to thrive in today’s ever-evolving world — no matter where they are.<br/><br/>We offer a wide range of expert-led online courses designed to fit around your life. Whether you're just starting your journey, pivoting to a new career, or upskilling for the future, Coursea is here to guide you every step of the way.</p>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="active-tab" data-bs-toggle="tab" href="#active" role="tab" aria-controls="active" aria-selected="true">Mission</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="link1-tab" data-bs-toggle="tab" href="#link1" role="tab" aria-controls="link1" aria-selected="false">Vision</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="link2-tab" data-bs-toggle="tab" href="#link2" role="tab" aria-controls="link2" aria-selected="false">Ambition</a>
                    </li>
                    </ul>

                    <div className="tab-content p-3 border border-top-0" id="myTabContent">
                    <div className="tab-pane fade show active" id="active" role="tabpanel" aria-labelledby="active-tab">
                        At Coursea, our mission is to empower learners through high-quality, flexible education that prepares them for real-world challenges and long-term success.
                        <br/>Coursea equips learners with the skills and confidence to thrive in real-world careers through flexible, high-quality education.
                        <li>Delivering job-relevant and practical skills</li>
                        <li>Building learner confidence through expert guidance</li>
                        <li>Equipping individuals with a competitive advantage in today’s digital economy</li>
                    </div>
                    <div className="tab-pane fade" id="link1" role="tabpanel" aria-labelledby="link1-tab">
                        We’re not just building a course platform — we’re shaping the future of learning. Our ambition is to become a trusted, global destination for anyone who wants to learn, grow, and thrive.
                        <br/>We’re not just building a course platform — we’re shaping the future of learning. Our ambition is to become a trusted, global destination for anyone who wants to learn, grow, and thrive.
                        <li>Constantly innovate with updated content and teaching methods</li>
                        <li>Offer a wide variety of high-demand courses across industries</li>
                        <li>Build a vibrant, inclusive learning community worldwide</li>
                    </div>
                    <div className="tab-pane fade" id="link2" role="tabpanel" aria-labelledby="link2-tab">
                    Education should be a right, not a privilege. At Coursea, we exist to eliminate the common barriers to quality learning, making it open, engaging, and accessible for all.
                        <br/>At Coursea, we believe learning should be accessible to everyone — breaking barriers and making quality education truly inclusive. 
                        <li>Make education affordable and flexible</li>
                        <li>Reach learners regardless of location or background</li>
                        <li>Deliver learning experiences that truly transform lives</li>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </section>

        <h1 className="text-dark mt-5 text-center" style={{textDecoration:'underline 3px #ffa835'}}>Contact Us</h1>
        <hr className="w-100"/>
        <section className="container-fluid callback pt-5" id="contact-section">
        <div className="container pt-5">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="bg-white border rounded p-4 p-sm-5 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
                            <p className="d-inline-block border rounded text-#ffa835 fw-semi-bold py-1 px-3">Get In Touch</p>
                            <h1 className="display-5 mb-5">Contact Us</h1>
                        </div>
                        
                        <form action="contact.php" method="POST">
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" required />
                                        <label htmlFor="name">Your Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" required/>
                                        <label htmlFor="mail">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="mobile" name="mobile" placeholder="Your Mobile"/>
                                        <label htmlFor="mobile">Your Mobile</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="subject" name="subject" placeholder="Subject"/>
                                        <label htmlFor="subject">Subject</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave a message here" id="message" name="message" style={{height: "100px"}}></textarea>
                                        <label htmlFor="message">Message</label>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button className="btn text-light  w-100 py-3" type="submit" id="button1" name="submit">Submit Now</button>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
        
        </section>

        <section className="container-fluid bg-dark text-light footer mt-5 py-1 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5" >
          <div className="row g-5"style={{display:'flex', justifyContent:'center'}}>


          <div className="col-lg-3 col-md-6 p-2 d-flex flex-column">
              <h4 className="text-white mb-4">Quick Links</h4>
              <a className="btn btn-link" style={{textDecoration:'none', color:'gray',textAlign:'left'}} href="#home-section">Home</a>
              <a className="btn btn-link" style={{textDecoration:'none', color:'gray',textAlign:'left'}} href="#about-section">About Us</a>
              <a className="btn btn-link" style={{textDecoration:'none', color:'gray',textAlign:'left'}} href="#course-section">Our Courses</a>
              <a className="btn btn-link" style={{textDecoration:'none', color:'gray',textAlign:'left'}} href="#contact-section">Contact Us</a>
            </div>

            
            <div className="col-lg-3 col-md-6 p-2 d-flex flex-column" style={{textAlign:'start'}}>
              <h4 className="text-white mb-4">Our Courses</h4>
              <a className="btn btn-link" style={{textDecoration:'none', color:'gray', textAlign:'left'}} href="#course-section">Website Development</a>
              <a className="btn btn-link" style={{textDecoration:'none', color:'gray',textAlign:'left'}} href="#course-section">Digital Marketing</a>
              <a className="btn btn-link" style={{textDecoration:'none', color:'gray',textAlign:'left'}} href="#course-section">Data Anaylist</a>
            </div>

            <div className="col-lg-3 col-md-6 p-2">
              <h4 className="text-white mb-4">Stay Connected</h4>
              <p>Explore our services, get updates, and find what you’re looking for with ease</p>
              <div className="position-relative w-100">
                <input
                  className="form-control bg-white border-0 w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                />
                <button
                  type="button"
                  className="btn custom-btn py-2 position-absolute top-0 end-0 mt-2 me-2 text-light" id="button1">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }
  