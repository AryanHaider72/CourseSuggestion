'use client';
import { useState, useEffect, useRef } from 'react';
import Dashboard from '../Dashboard/page';
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

  const links = [
    { href: '/user/progress', label: 'Progress Report', icon: <BarChart size={25} /> },
    { href: '/user/purchased', label: 'Purchased Courses', icon: <ShoppingCart size={25} /> },
    { href: '/user/recommended', label: 'Course Suggestion', icon: <BookOpenCheck size={25} /> },
    { href: '/user/results', label: 'Result / Certification', icon: <BadgeCheck size={25} /> },
    { href: '/user/billing', label: 'Billing & Payments', icon: <CreditCard size={25} /> },
    { href: '/user/setting', label: 'Setting', icon: <Settings size={25} /> },
  ];

  const handleToggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 425);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  return (
    <div className="d-flex" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Sidebar */}
      {isSidebarVisible && (
        <div
          ref={sidebarRef}
          className={`bg-warning text-white p-3 sidebar transition-all`}
          style={{
            width: isSidebarCollapsed ? '0' : '270px',
            minHeight: '100vh',
            transition: 'all 0.3s ease',
            position: isMobile ? 'absolute' : 'relative',
            zIndex: 999,
            left: 0,
            top: 0,
          }}
        >
          <h4
            className={`fs-2 fw-bold text-center mt-4 mb-4 ${isSidebarCollapsed ? 'text-center' : ''}`}
            style={{ display: isSidebarCollapsed ? 'none' : 'block' }}
          >
            EduCourse
          </h4>
          <ul className="list-unstyled">
            {links.map(({ href, label, icon }) => (
              <li key={href} className="mb-2">
                <a href={href} className="d-flex align-items-center text-white text-decoration-none mt-3 fs-5 p-2 nav-link-custom">
                  {icon}
                  {!isSidebarCollapsed && <span className="ms-2">{label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
          <div className="d-flex align-items-center gap-3">
            <Menu role="button" color="#ffa835" size={24} onClick={handleToggleSidebarVisibility} />
            <h5 className="mb-0">User Dashboard</h5>
          </div>

          <div className="d-flex align-items-center gap-3 position-relative">
            {/* User Button */}
            <div className="position-relative">
              <User role="button" color="#ffa835" onClick={() => {
                setShowUser(!showUser);
                setShowSettings(false);
              }} />
              {showUser && (
                <div className="dropdown-menu show end-0 mt-2" style={{ display: 'block' }}>
                  <button className="dropdown-item"><Pencil size={14} className="me-2" /> Edit Profile</button>
                  <button className="dropdown-item"><LogOut size={14} className="me-2" /> Logout</button>
                </div>
              )}
            </div>

            {/* Settings Button */}
            <div className="position-relative">
              <Settings role="button" color="#ffa835" onClick={() => {
                setShowSettings(!showSettings);
                setShowUser(false);
              }} />
              {showSettings && (
                <div className="dropdown-menu show end-0 mt-2" style={{ display: 'block' }}>
                  <button className="dropdown-item"><Key size={14} className="me-2" /> Change Password</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          {children || <Dashboard />}
        </div>
      </div>
    </div>
  );
}
