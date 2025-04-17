'use client';
import React, { useState } from 'react';
import { Card, Table, Button, Form, InputGroup, Pagination } from 'react-bootstrap';
import { Pencil, UserCheck, UserX, Trash2 } from 'lucide-react';

const UserManagement = () => {
  // Sample data for users
  const users = [
    { id: 1, name: 'Ali Ahmed', email: 'ali.ahmed@example.com', status: 'active',},
    { id: 2, name: 'Sara Khan', email: 'sara.khan@example.com', status: 'inactive',  },
    { id: 3, name: 'Usman Tariq', email: 'usman.tariq@example.com', status: 'active',  },
    { id: 4, name: 'Hina Sheikh', email: 'hina.sheikh@example.com', status: 'inactive',  },
    // Add more sample users as needed
  ];

  // State for managing search query
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);  // Number of users per page

  // Filtering users based on the search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-4" style={{ overflowY: 'auto', height: '450px', scrollbarWidth: 'none' }}>
      <h2 className="mb-4 text-center fw-bold">User Management</h2>

      {/* Search Input */}
      <div className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search by Name or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* User List Table */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <Button variant={user.status === 'active' ? 'warning' : 'success'} size="md" className="me-2">
                      {user.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="danger" size="md">
                      <Trash2 size={16} /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserManagement;
