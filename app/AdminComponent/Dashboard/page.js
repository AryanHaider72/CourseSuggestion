'use client';
import React from 'react';
import { Card, Table } from 'react-bootstrap';

const AdminDashboard = () => {
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
    <div className="container-fluid py-4 px-3" style={{ overflowY:'scroll'  ,height: '80vh'}}>
      <h2 className="mb-4 text-center fw-bold">Admin Dashboard</h2>
      <hr />

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {stats.map((stat, idx) => (
          <div className="col-12 col-sm-6 col-md-4" key={idx}>
            <Card bg={stat.color} text="white" className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>{stat.title}</Card.Title>
                <Card.Text className="fs-3 fw-semibold">{stat.value}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="fw-bold mb-3">Recent Activity</Card.Title>
          <ul className="list-group list-group-flush">
            {recentActivities.map((act, idx) => (
              <li key={idx} className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                <div>
                  <strong>{act.user}</strong>: {act.activity}
                </div>
                <span className="text-muted small mt-2 mt-sm-0">{act.time}</span>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>

      {/* Pending Payments */}
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="fw-bold mb-3">Pending Payments</Card.Title>
          <div className="table-responsive">
            <Table bordered hover className="align-middle">
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
                    <td className="d-flex flex-wrap gap-2">
                      <button className="btn btn-success btn-sm">Approve</button>
                      <button className="btn btn-danger btn-sm">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;
