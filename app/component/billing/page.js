'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, Form, InputGroup, Badge } from 'react-bootstrap';

const BillingAndPayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/component/billing',
          {},
          { withCredentials: true }
        );
        setPayments(response.data); // ✅ Save data to state
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
            console.log('Database Error');
          } else if (error.response.status === 404) {
            console.log('No Data Found');
          } else if (error.response.status === 401) {
            console.log('Not logged in', error);
          } else {
            console.log('Other error:', error);
          }
        } else {
          console.log('Network Error:', error);
        }
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.method?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4 text-center">Billing & Payments</h2>

      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name or method..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="mb-3 fw-semibold">Payments Overview</h5>
          <Table striped hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No payments found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.subject}</td>
                    <td>{p.method}</td>
                    <td>
                    <Badge bg={
                      p.status === 'approved'
                        ? 'success'
                        : !p.status || p.status === 'pending'
                        ? 'warning'
                        : 'danger'
                    }>
                      {p.status ? p.status : 'pending'}
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
  );
};

export default BillingAndPayments;
