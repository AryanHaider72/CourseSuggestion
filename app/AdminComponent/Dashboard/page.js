'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import { Table, Card, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CourseManagement from '../CourseManagment/page';
import BillingAndPayments from '../BillingPayment/page';
import UserManagement from '../UserManagment/page';

export default function AdminDashboard() {
  const [active, setActive] = useState('');  // State to track the active component
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]);
  const [user, setUser] = useState([]);
  const [course, setCourse] = useState([]);
  const [payment, setPayment] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const totalUsers = async () => {
      try {
        const res = await axios.get('https://coursesuggestion-production.up.railway.app/AdminComponent/totalUsers', {}, { withCredentials: true });
        if (res.status === 200) setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          alert('User Not Logged in');
          router.push('/login');
        }
        console.error('Error fetching users:', err.response?.data || err.message);
      }
    };
    totalUsers();
  }, []);

  useEffect(() => {
    const totalAmount = async () => {
      try {
        const res = await axios.get('https://coursesuggestion-production.up.railway.app/AdminComponent/totalamount', {}, { withCredentials: true });
        if (res.status === 200) setPayment(res.data);
      } catch (err) {
        console.error('Error fetching payments:', err.response?.data || err.message);
      }
    };
    totalAmount();
  }, []);

  useEffect(() => {
    const totalCourses = async () => {
      try {
        const res = await axios.get('https://coursesuggestion-production.up.railway.app/AdminComponent/totalcourses', {}, { withCredentials: true });
        if (res.status === 200) setCourse(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err.response?.data || err.message);
      }
    };
    totalCourses();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('https://coursesuggestion-production.up.railway.app/AdminComponent/BillingPayment', {}, { withCredentials: true });
        if (res.status === 200) setPayments(res.data);
      } catch (err) {
        console.error('Error fetching payments:', err.response?.data || err.message);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Conditional Rendering: Render either the full dashboard or a specific component */}
      {active === '' ? (
        // Dashboard Content
        <div className="container-fluid py-4 px-3" style={{ overflowY: 'scroll', height: '80vh' }}>
          <h2 className="mb-4 text-center fw-bold">Admin Dashboard</h2>
          <hr />

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            <div className="w-100 col-12 col-sm-6 col-md-4 d-flex justify-content-around">
              <Card bg="warning" text="white" className="shadow-sm w-25 h-100" onClick={() => setActive('user')}>
                <Card.Body>
                  <Card.Title>Total User</Card.Title>
                  <Card.Text className="fs-3 fw-semibold">{user}</Card.Text>
                </Card.Body>
              </Card>
              <Card bg="success" text="white" className="shadow-sm w-25 h-100" onClick={() => setActive('bill')}>
                <Card.Body>
                  <Card.Title>Total Revenue</Card.Title>
                  <Card.Text className="fs-3 fw-semibold">{payment}</Card.Text>
                </Card.Body>
              </Card>
              <Card bg="primary" text="white" className="shadow-sm w-25 h-100" onClick={() => setActive('course')}>
                <Card.Body>
                  <Card.Title>Total Course</Card.Title>
                  <Card.Text className="fs-3 fw-semibold">{course}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Payment Records */}
          <Card>
            <Card.Body>
              <h5 className="mb-3 fw-semibold">Payment Records</h5>
              <Table striped hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length === 0 ? (
                    <tr><td colSpan="6" className="text-center">No payments found.</td></tr>
                  ) : (
                    filteredPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.name || '—'}</td>
                        <td>{payment.subject || '—'}</td>
                        <td>
                          <Badge bg={payment.status === 'approved' ? 'success' : payment.status === 'rejected' ? 'danger' : 'warning'}>
                            {payment.status || 'pending'}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      ) : (
        // Active Component Rendered (only one at a time)
        <div className="p-4">
          {active === 'user' && <UserManagement />}
          {active === 'course' && <CourseManagement />}
          {active === 'bill' && <BillingAndPayments />}
        </div>
      )}
    </>
  );
}
