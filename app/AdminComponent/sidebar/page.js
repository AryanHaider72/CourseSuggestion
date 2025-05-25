'use client';
import { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart, BookOpenCheck, CreditCard,
  User, Settings, LogOut, Pencil, Key, Menu
} from 'lucide-react';
import Dashboard from '../Dashboard/page';
import UserManagement from '../UserManagment/page';
import CourseManagement from '../CourseManagment/page';
import BillingAndPayments from '../BillingPayment/page';
import ChangePass from '../password/page';
import SettingsPage from '../setting/page';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function UserLayout({ children }) {
  const [showUser, setShowUser] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState(null); 
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setactive] = useState('dashboard');
   const router = useRouter();

  const sidebarRef = useRef(null);
  const settingsRef = useRef(null);
  const userRef = useRef(null);

  const links = [
    { key: 'UserManagement', label: 'User Management', icon: <ShoppingCart size={25} /> },
    { key: 'CourseManagement', label: 'Course Management', icon: <BookOpenCheck size={25} /> },
    { key: 'BillingAndPayment', label: 'Billing & Payments', icon: <CreditCard size={25} /> },
  ];

  const handleToggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
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
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on outside click (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  // Close settings dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSettings && settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUser && userRef.current && !userRef.current.contains(event.target)) {
        setShowUser(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUser]);

  return (
    <div className="d-flex" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Sidebar */}
      {isSidebarVisible && (
        <div
          ref={sidebarRef}
          className="text-white p-3 sidebar transition-all"
          style={{
            width: isSidebarCollapsed ? '0' : '270px',
            minHeight: '100vh',
            transition: 'all 0.3s ease',
            position: isMobile ? 'absolute' : 'relative',
            zIndex: 10000,
            left: 0,
            top: 0,
            backgroundColor: '#ffa835',
          }}
        >
          <a onClick={() => setactive('dashboard')} style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>
            <h4 className={`fs-2 fw-bold text-center mt-4 mb-4 ${isSidebarCollapsed ? 'text-center' : ''}`}
              style={{ display: isSidebarCollapsed ? 'none' : 'block' }}>
              WidsomNest
            </h4>
          </a>
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
      )}

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
          <div className="d-flex align-items-center gap-3">
            <Menu role="button" color="#ffa835" size={24} onClick={handleToggleSidebarVisibility} />
            <h5 className="mb-0">Admin Dashboard</h5>
          </div>

          <div className="d-flex align-items-center gap-3 position-relative">
            {/* User Dropdown */}
            <div className="position-relative" ref={userRef}>
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
            <div className="position-relative" ref={settingsRef}>
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
                  <button className="dropdown-item" onClick={() => setactive('changepass')}>
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
          {active === 'UserManagement' && <UserManagement />}
          {active === 'CourseManagement' && <CourseManagement />}
          {active === 'BillingAndPayment' && <BillingAndPayments />}
          {active === 'changepass' && <ChangePass />}
          {active === 'edit' && <SettingsPage />}
        </div>
      </div>
    </div>
  );
}
