'use client';
import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Form, InputGroup, Pagination } from 'react-bootstrap';
import { Trash2 } from 'lucide-react';
import axios from 'axios';

const UserManagement = () => {
  // State for managing users data fetched from the API
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);  // Number of users per page

  // Fetch users from the API
  useEffect(() => {
    const showUser = async () => {
      try {
        const response = await axios.post('http://localhost:8080/AdminComponent/UserManagment', {}, { withCredentials: true });
        if (response.status === 200) {
          console.log(response.data);
          setUsers(response.data); 
        }
      } catch (error) {
        if (error.response) {
          // Handle error responses from the server
          if (error.response.status === 500) {
            console.log("Database Error", error.response);
          } else if (error.response.status === 401) {
            console.log("User not Logged in", error.response);
          } else if (error.response.status === 404) {
            console.log("No Data Found", error.response);
          } else {
            console.log(error.response);
          }
        }
      }
    };
    showUser();
  }, []);

  // Filtering users based on the search query
  const filteredUsers = users.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td><span class="badge bg-success">Active</span></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Pagination */}
      <Pagination>
        {/* Dynamically generate pagination items based on filtered data */}
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default UserManagement;
