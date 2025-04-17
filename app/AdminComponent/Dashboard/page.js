'use client';
import React from 'react';
import { Card, Table } from 'react-bootstrap';

const AdminDashboard = () => {
  // Dummy data
  const stats = [
    { title: 'Total Users', value: 1200, color: 'primary' },
    { title: 'Total Revenue', value: 'PKR 240,000', color: 'success' },
    { title: 'Active Courses', value: 18, color: 'warning' },
  ];

  const recentActivities = [
    { user: 'Ali Raza', activity: 'Completed Python Quiz', time: '10 mins ago' },
    { user: 'Sara Khan', activity: 'Purchased Web Dev Course', time: '30 mins ago' },
    { user: 'Ahmed Butt', activity: 'Updated Profile', time: '1 hour ago' },
  ];

  const pendingPayments = [
    { name: 'Usman Tariq', amount: 'PKR 4,500', method: 'Easypaisa', date: 'April 14, 2025' },
    { name: 'Hina Sheikh', amount: 'PKR 3,000', method: 'Bank Transfer', date: 'April 15, 2025' },
  ];

  return (
    <div className="container my-4" style={{ overflowY: 'auto', height: '450px', scrollbarWidth: 'none' }}>
      <h2 className="mb-4 text-center ">Admin Dashboard</h2>
      <hr />

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, idx) => (
          <div className="col-md-4" key={idx}>
            <Card bg={stat.color} text="white" className="shadow">
              <Card.Body>
                <Card.Title>{stat.title}</Card.Title>
                <Card.Text className="fs-3 fw-semibold">{stat.value}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">Recent Activity</h5>
          <ul className="list-group list-group-flush">
            {recentActivities.map((act, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{act.user}</strong>: {act.activity}
                </div>
                <span className="text-muted small">{act.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pending Payments */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">Pending Payments</h5>
          <Table responsive bordered hover>
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingPayments.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.name}</td>
                  <td>{p.amount}</td>
                  <td>{p.method}</td>
                  <td>{p.date}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2">Approve</button>
                    <button className="btn btn-danger btn-sm">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
