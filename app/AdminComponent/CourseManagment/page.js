'use client';
import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Form, InputGroup, Pagination, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const CourseManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [showsuggestion, setShowSuggestions] = useState([]);

  // Sample local courses (not used in suggestions table)
  const courses = [
    { id: 1, title: 'React for Beginners', description: 'Learn React basics.', price: '$50', status: 'active' },
    { id: 2, title: 'Advanced JavaScript', description: 'Deep JS concepts.', price: '$70', status: 'inactive' },
    { id: 3, title: 'Node.js Backend', description: 'Build backend with Node.js.', price: '$60', status: 'active' },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.post(
          'https://server-production-1573.up.railway.app/AdminComponent/CourseManagment',
          {},
          { withCredentials: true }
        );

        if (response.status === 200) {
          const cleanedSuggestions = response.data.map((item) => {
            let raw = item.courseSuggestions;
          
            // Convert stringified array to string
            try {
              const parsed = JSON.parse(raw); // turns '["Improve Full Stack"]' into ['Improve Full Stack']
              raw = Array.isArray(parsed) ? parsed[0] : parsed;
            } catch (e) {
              // fallback if not JSON parsable
              raw = raw.replace(/[\[\]"]+/g, '');
            }
          
            // Remove "Improve" from beginning
            return raw.replace(/^Improve\s+/i, '').trim();
          });
          setShowSuggestions(cleanedSuggestions);
        }
      } catch (error) {
        if (error.response?.status === 500) {
          console.error('Database Error');
        } else if (error.response?.status === 404) {
          console.error('No Record Found');
        } else if (error.response?.status === 401) {
          console.error('User not logged in');
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchCourses();
  }, []);

  // Pagination logic
  const filteredSuggestions = showsuggestion.filter((sugg) =>
    sugg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentSuggestions = filteredSuggestions.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="container my-4" style={{ overflowY: 'auto', maxHeight: '90vh' }}>
      <h2 className="mb-4 text-center fw-bold">Course Management</h2>

      {/* Search Input */}
      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search Suggestions"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {/* Suggestions Table */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSuggestions.map((suggestion, idx) => (
                <tr key={idx}>
                  <td>{indexOfFirst + idx + 1}</td>
                  <td>{suggestion}</td>
                  <td>
                  <p className="card-text text-muted small">Master all The basic and  Master level and became and professional in{suggestion.replace(/^Improve\s+/i, '')}</p>
                  </td>
                  <td>
                  <span class="badge bg-success">Active</span>
                  </td>
                </tr>
              ))}
              {currentSuggestions.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-muted">No suggestions found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CourseManagement;
