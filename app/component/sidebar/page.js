'use client';
import Link from 'next/link';
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

import {
  ShoppingCart, BookOpenCheck, BarChart, BadgeCheck, CreditCard,
  User, Settings, LogOut, Pencil, Key, Menu
} from 'lucide-react';

export default function UserLayout({ children }) {
  const [showUser, setShowUser] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  const userDropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);
  const [active, setactive] = useState('dashboard');

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

  // Check screen size
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) &&
        (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target))
      ) {
        setShowUser(false);
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: '100vh', position: 'relative' }}>
      
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`text-white p-3 sidebar transition-all`}
        style={{
          width: isSidebarVisible ? '270px' : '0',
          minHeight: '100vh',
          height: '100%',
          transition: 'all 0.3s ease',
          position: isMobile ? 'absolute' : 'relative',
          zIndex: 10000,
          left: isSidebarVisible ? '0px' : '-270px',
          top: 0,
          backgroundColor: '#ffa835',
          overflowX: 'hidden',
        }}
      >
        <h4
          className="fs-2 fw-bold text-center mt-4 mb-4"
          style={{ display: isSidebarVisible ? 'block' : 'none' }}
        >
          EduCourse
        </h4>
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
                  <button className="dropdown-item">
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
    </div>
  );
}
