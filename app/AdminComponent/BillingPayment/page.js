"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, Form, InputGroup, Badge, Spinner } from 'react-bootstrap';
import { CheckCircle, XCircle } from 'lucide-react';
import {useRouter} from 'next/navigation';
const BillingAndPayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.post('http://localhost:8080/AdminComponent/BillingPayment', {}, { withCredentials: true });
        if (res.status === 200) setPayments(res.data);
      } catch (err) {
        console.error('Error fetching payments:', err.response?.data || err.message);
      }
    };
    fetchPayments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await axios.post('http://localhost:8080/AdminComponent/UpdatePaymentStatus', { id, status }, { withCredentials: true });
      if (res.status === 200) {
        setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
      }
    } catch (err) {
      console.error('Failed to update status:', err.response?.data || err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredPayments = payments.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="container my-4">
      <h2 className="fw-bold text-center mb-4">Billing & Payments</h2>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Card>
        <Card.Body>
          <h5 className="mb-3 fw-semibold">Payment Records</h5>
          <Table striped hover responsive>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Receipt</th>
                <th>Status</th>
                <th>Action</th>
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
                      {payment.image ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => {
                              const imageName = payment.image.replace(/^uploads\//, '');
                              window.open(`http://localhost:8080/${imageName}`, '_blank');
                            }}
                          >
                            View Image
                          </Button>
                        </>
                      ) : (
                        <span className="text-muted">No image</span>
                      )}
                    </td>
                    <td>
                      <Badge bg={payment.status === 'approved' ? 'success' : payment.status === 'rejected' ? 'danger' : 'warning'}>
                        {payment.status || 'pending'}
                      </Badge>
                    </td>
                    <td>
                      {payment.status === 'pending' ? (
                        <>
                          <Button
                            size="sm"
                            variant="success"
                            className="me-2"
                            onClick={() => handleStatusUpdate(payment.id, 'approved')}
                            disabled={updatingId === payment.id}
                          >
                            {updatingId === payment.id ? <Spinner animation="border" size="sm" /> : <CheckCircle size={16} className="me-1" />}
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleStatusUpdate(payment.id, 'rejected')}
                            disabled={updatingId === payment.id}
                          >
                            {updatingId === payment.id ? <Spinner animation="border" size="sm" /> : <XCircle size={16} className="me-1" />}
                            Reject
                          </Button>
                        </>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
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
