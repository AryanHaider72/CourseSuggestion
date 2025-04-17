'use client';
import React, { useState } from 'react';
import { Table, Button, Card, Form, InputGroup, Modal, Badge } from 'react-bootstrap';
import { CheckCircle, FileText } from 'lucide-react';

const BillingAndPayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [receiptImage, setReceiptImage] = useState(null);

  const payments = [
    {
      id: 1,
      user: 'Ali Raza',
      method: 'Bank Transfer',
      amount: 5000,
      status: 'pending',
      date: '2024-04-10',
    },
    {
      id: 2,
      user: 'Fatima Khan',
      method: 'Easypaisa',
      amount: 3500,
      status: 'completed',
      date: '2024-04-09',
    },
    {
      id: 3,
      user: 'Usman Tariq',
      method: 'Bank Transfer',
      amount: 7000,
      status: 'pending',
      date: '2024-04-11',
    },
  ];

  const filteredPayments = payments.filter(
    (p) =>
      p.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.method.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const markAsPaid = (id) => {
    alert(`Marked payment ID ${id} as paid.`);
    // In real app, make API call here.
  };

  const openReceipt = (imgUrl) => {
    setReceiptImage(imgUrl);
    setShowModal(true);
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4 text-center">Billing & Payments</h2>

      {/* Search */}
      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by user or payment method..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Payments Table */}
      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="mb-3 fw-semibold">Payments Overview</h5>
          <Table striped hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Method</th>
                <th>Amount (PKR)</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p, idx) => (
                <tr key={p.id}>
                  <td>{idx + 1}</td>
                  <td>{p.user}</td>
                  <td>{p.method}</td>
                  <td>{p.amount}</td>
                  <td>
                    <Badge bg={p.status === 'completed' ? 'success' : 'warning'}>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </Badge>
                  </td>
                  <td>{p.date}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => openReceipt(p.receipt)}
                    >
                      <FileText size={16} className="me-1" /> View
                    </Button>
                  </td>
                  <td>
                    {p.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => markAsPaid(p.id)}
                      >
                        <CheckCircle size={16} className="me-1" /> Mark Paid
                      </Button>
                    )}
                    {p.status === 'completed' && <span className="text-muted">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Receipt Modal */}
    </div>
  );
};

export default BillingAndPayments;
