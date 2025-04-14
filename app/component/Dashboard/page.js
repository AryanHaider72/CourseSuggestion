import { useState, useEffect, useRef } from "react";
const coursesList = [
    'Algorithms and Data Structures', 'Artificial Intelligence', 'Android App Development', 'Agile Software Development', 'AWS Cloud Fundamentals',
  'Blockchain Technology', 'Big Data Analytics', 'Business Intelligence', 'C++ Programming', 'C# Programming',
  'Cloud Computing', 'Computer Architecture', 'Compiler Design', 'Cybersecurity Essentials', 'Cryptography',
  'Creative Coding', 'Data Science with Python', 'Data Visualization', 'Database Management Systems', 'Deep Learning',
  'DevOps Foundations', 'Digital Logic Design', 'Docker & Kubernetes', 'E-commerce Development', 'Ethical Hacking',
  'Embedded Systems', 'Edge Computing', 'Excel for Data Analysis', 'Full Stack Development', 'Front-End Development',
  'Flutter App Development', 'Functional Programming', 'Game Development with Unity', 'Git & GitHub', 'GraphQL Fundamentals', 'Go Programming Language', 'Google Cloud Platform (GCP)',
  'Human-Computer Interaction', 'HTML5 & CSS3', 'Hadoop Ecosystem', 'Hybrid Mobile Apps', 'IoT (Internet of Things)',
  'Information Security', 'iOS Development', 'Intro to Programming', 'Java Programming', 'JavaScript Mastery',
  'Jenkins CI/CD', 'JIRA for Project Management', 'Kotlin for Android', 'Kubernetes Basics', 'Kafka Streaming',
  'Linux Fundamentals', 'Lean Software Development', 'Linear Algebra for CS', 'Machine Learning', 'MongoDB Essentials',
  'MySQL for Developers', 'Mobile App Security', 'Natural Language Processing', 'Network Security', 'Node.js API Development',
  'Neural Networks', 'Object-Oriented Programming','Operating Systems', 'OpenCV with Python', 'Python for Everybody', 'PostgreSQL Basics', 'Programming in Rust',
  'Penetration Testing', 'Quantum Computing Basics', 'QuickBooks for IT', 'ReactJS Development', 'Responsive Web Design',
  'RESTful API Design', 'R Programming for Data Science', 'Ruby on Rails', 'Robotic Process Automation (RPA)', 'Software Testing & QA',
  'Software Engineering', 'SQL for Beginners', 'Shell Scripting', 'Spring Boot with Java', 'System Design',
  'TensorFlow Deep Learning', 'TypeScript Basics', 'UI/UX Design', 'Unity Game Development', 'Unix Shell Scripting',
  'Version Control with Git', 'Virtual Reality Development', 'Vue.js Crash Course', 'Visual Basic Programming', 'Web Development Bootcamp',
  'Web Accessibility Standards', 'Xamarin for Cross-Platform Apps', 'XML & JSON Data Handling', 'YouTube API Integration',
  'YouTube for Developers', 'ZK Framework Basics', 'Zero Trust Architecture', 'Zig Programming Language' ];

export default function Dashboard() {
  const itemRefs = useRef([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [Name, setName] = useState('');

  const setContentView = (view) => console.log(`Switching to view: ${view}`);
  const toggleVisibility = (e) => { e.preventDefault(); setIsVisible(!isVisible);
    const name = Name;
   };

  useEffect(() => {
    if (highlightedIndex !== null && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    if (query.trim() === '') return setSuggestions([]);
    const filtered = coursesList.filter(course => course.toLowerCase().startsWith(query.toLowerCase()));
    setSuggestions(filtered);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
  }, [query]);

  const handleSelect = (value) => { setQuery(value); setShowSuggestions(false); };
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') e.preventDefault(), setHighlightedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
    else if (e.key === 'ArrowUp') e.preventDefault(), setHighlightedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
    else if (e.key === 'Enter' && highlightedIndex >= 0) handleSelect(suggestions[highlightedIndex]);
    else if (e.key === 'Escape') setShowSuggestions(false);
  };

  return (
    <main className="container" style={{ overflowY: 'auto', height: '500px', scrollbarWidth: 'none' }}>
      <h1 className="text-center">Create Your Course Test</h1><hr />
      <div className="w-100">
        <form onSubmit={(e) => e.preventDefault()}>
          <h4 className="mb-2">Start Your Personalized Test</h4>
          <p className="text-muted mb-4">Fill in your name and your subject of interest. Based on your input, we’ll generate a custom MCQ test using AI.</p>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="userName"  className="form-label">Your Name</label>
              <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)}id="userName" placeholder="Enter your name" />
            </div>
            <div className="col-md-6">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input type="text" className="form-control" id="subject" placeholder="Enter subject of interest" value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setShowSuggestions(true)} onKeyDown={handleKeyDown} />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="list-group position-absolute w-25" style={{ zIndex: 999, height: '130px', overflowY: 'auto' }}>
                  {suggestions.map((course, index) => (
                    <li key={index} ref={(el) => (itemRefs.current[index] = el)} className={`list-group-item list-group-item-action ${index === highlightedIndex ? 'active' : ''}`} onMouseDown={() => handleSelect(course)} style={{ cursor: 'pointer' }}>{course}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="level" className="form-label">Your Proficiency Level</label>
            <select className="form-select" id="level">
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {isVisible && (
            <div className="bg-light p-4 rounded shadow-sm mb-4">
              <h2 className="mb-3">Welcome, <span style={{ color: '#ffa835' }}>{Name}</span></h2>
              <p className="lead">Please read the instructions carefully before continuing to your course or generating MCQs.</p>
              <ul className="mb-4">
                <li>Make sure your internet connection is stable.</li>
                <li>Complete all previous modules before starting new ones.</li>
                <li>MCQs are generated based on your selected topics.</li>
                <li>Click "I’m Ready" to proceed with the course experience.</li>
              </ul>
              <div className="d-flex gap-3">
                <button className="btn text-white" type="button" id="button1" onClick={() => setContentView('mcqs')}>I’m Ready</button>
              </div>
            </div>
          )}

          <button type="button" className="btn text-white" id="button1" onClick={toggleVisibility}>{isVisible ? 'Hide Instructions' : 'Generate Query'}</button>
        </form>
      </div>
    </main>
  );
}
