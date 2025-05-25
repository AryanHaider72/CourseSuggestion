'use client';
import Link from 'next/link';
import { CircleHelp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Dashboard from '../Dashboard/page';
import PurchasedCourses from '../Purchased/page';
import SettingsPage from '../setting/page';
import MCQQuiz from '../Mcqs/page';
import ProgressReport from '../Progress/page';
import CourseSuggestions from '../suggestion/page';
import ResultPage from '../result/page';
import ManualPaymentPage from '../billing/page';
import ChangePassword from '../password/page';
import axios from "axios";
import { useRouter } from 'next/navigation';
import {
  ShoppingCart, BookOpenCheck, BarChart, BadgeCheck, CreditCard,
  User, Settings, LogOut, Pencil, Key, Menu
} from 'lucide-react';

export default function UserLayout({ children }) {
  const [showUser, setShowUser] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [userData, setUserData] = useState(null); 
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  const userDropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);
  const [active, setactive] = useState('dashboard');
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);
const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');

const handleSendMessage = async (e) => {
  e.preventDefault();

  const newMessage = { role: 'user', content: input };
  setMessages((prev) => [...prev, newMessage]);
  setInput('');

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: input }]
          }
        ]
      })
    });

    const data = await res.json();

    if (data.candidates && data.candidates.length > 0) {
      const botReply = data.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { role: 'bot', content: botReply }]);
    } else {
      setMessages((prev) => [...prev, { role: 'bot', content: "No response from AI." }]);
    }
  } catch (err) {
    console.error(err);
    setMessages((prev) => [...prev, { role: 'bot', content: "Error contacting Gemini." }]);
  }
};

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://coursesuggestion-production.up.railway.app/component/logout",
        {}, // Empty body
        {
          withCredentials: true, // ✅ This is the correct place
        }
      );
  
      console.log("Logout success:", response.data.message);
  
      setUserData(null); // Clear user state
  
      router.push("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      alert("Failed to logout. Please try again.");
    }
  };
  
  


  const links = [
    { key: 'progress', label: 'Progress Report', icon: <BarChart size={25} /> },
    { key: 'purchased', label: 'Purchased Courses', icon: <ShoppingCart size={25} /> },
    { key: 'suggestion', label: 'Course Suggestion', icon: <BookOpenCheck size={25} /> },
    { key: 'result', label: 'Result / Certification', icon: <BadgeCheck size={25} /> },
    { key: 'billing', label: 'Billing & Payments', icon: <CreditCard size={25} /> },
  ];

  const handleToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Detect screen size and toggle mobile mode
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarVisible(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle outside clicks for dropdowns and sidebar (on mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideUser = userDropdownRef.current && !userDropdownRef.current.contains(event.target);
      const clickedOutsideSettings = settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target);
      const clickedOutsideSidebar = sidebarRef.current && !sidebarRef.current.contains(event.target);

      if (clickedOutsideUser && clickedOutsideSettings) {
        setShowUser(false);
        setShowSettings(false);
      }

      if (isMobile && clickedOutsideSidebar) {
        setIsSidebarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  return (
    <div className="d-flex" style={{ minHeight: '100vh', position: 'relative' }}>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`text-white p-3 sidebar transition-all`}
        style={{width: isSidebarVisible ? '270px' : '0',minHeight: '100vh',height: '100%',transition: 'all 0.3s ease',position: isMobile ? 'absolute' : 'relative',zIndex: 10000,left: isSidebarVisible ? '0px' : '-270px',top: 0,backgroundColor: '#ffa835',overflowX: 'hidden',}}>
        <h4 className="fs-2 fw-bold text-center mt-4 mb-4" onClick={() => window.location.reload()} style={{cursor:"pointer", display: isSidebarVisible ? 'block' : 'none' }}>WidsomNest</h4>
        <ul className="list-unstyled">
          {links.map(({ key, label, icon }) => (
            <li key={key} className="mb-2" style={{ cursor: 'pointer' }}>
              <a
                onClick={() => {
                  setactive(key);
                  if (isMobile) setIsSidebarVisible(false);
                }}
                className="d-flex align-items-center text-white text-decoration-none mt-3 fs-5 p-2 nav-link-custom"
              >
                {icon}
                {!isSidebarCollapsed && <span className="ms-2">{label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
          <div className="d-flex align-items-center gap-3">
            <Menu role="button" color="#ffa835" size={24} onClick={handleToggleSidebar} />
            <h5 className="mb-0">User Dashboard</h5>
          </div>

          <div className="d-flex align-items-center gap-3 position-relative">
            {/* User Dropdown */}
            <div className="position-relative" ref={userDropdownRef}>
              <User
                role="button"
                color="#ffa835"
                onClick={() => {
                  setShowUser(!showUser);
                  setShowSettings(false);
                }}
              />
              {showUser && (
                <div className="dropdown-menu show end-0 mt-2" style={{ display: 'block' }}>
                  <button className="dropdown-item" onClick={() => setactive('edit')}>
                    <Pencil size={14} className="me-2" /> Edit Profile
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <LogOut size={14} className="me-2" /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Settings Dropdown */}
            <div className="position-relative" ref={settingsDropdownRef}>
              <Settings
                role="button"
                color="#ffa835"
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowUser(false);
                }}
              />
              {showSettings && (
                <div className="dropdown-menu show end-0 mt-2" style={{ display: 'block' }}>
                  <button className="dropdown-item" onClick={() => setactive('change')}>
                    <Key size={14} className="me-2" /> Change Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4">
          {active === 'dashboard' && <Dashboard />}
          {active === 'progress' && <ProgressReport />}
          {active === 'purchased' && <PurchasedCourses />}
          {active === 'suggestion' && <CourseSuggestions />}
          {active === 'result' && <ResultPage />}
          {active === 'billing' && <ManualPaymentPage />}
          {active === 'edit' && <SettingsPage />}
          {active === 'change' && <ChangePassword />}
        </div>
      </div>
      {/* Chatbot Button and Modal */}
        <div>
          {/* Floating Chatbot Button */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            style={{position: 'fixed',bottom: '20px',right: '20px',backgroundColor: '#ffa835',border: 'none',borderRadius: '50%',width: '60px',height: '60px',boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',zIndex: 1000,
            }}><CircleHelp color='white'/></button>

          {/* Chat Modal */}
          {chatOpen && (
            <div
              style={{position: 'fixed',bottom: '90px',right: '20px',width: '400px',height: '450px',backgroundColor: 'white',borderRadius: '10px',boxShadow: '0 4px 12px rgba(0,0,0,0.3)',zIndex: 1000,display: 'flex',flexDirection: 'column',}}>
              <div style={{ padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#ffa835', color: 'white' }}>
                <strong>AI Assistant</strong>
              </div>

              <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ marginBottom: '10px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                    <div style={{ background: msg.role === 'user' ? '#e1f5fe' : '#fce4ec', padding: '8px', borderRadius: '10px' }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ flex: 1, border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}
                  placeholder="Type your message..."
                />
                <button type="submit" style={{ marginLeft: '5px', backgroundColor: '#ffa835', border: 'none', padding: '6px 10px', color: 'white', borderRadius: '4px' }}>
                  Send
                </button>
              </form>
            </div>
          )}
        </div>

    </div>
  );
}
