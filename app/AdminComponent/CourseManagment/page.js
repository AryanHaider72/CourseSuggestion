'use client';
import React, { useState } from 'react';
import { Card, Table, Button, Form, InputGroup, Pagination, Modal } from 'react-bootstrap';
import { Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';

const CourseManagement = () => {
  // Sample data for courses
  const courses = [
    { id: 1, title: 'React for Beginners', description: 'Learn the basics of React.', price: '$50', status: 'active' },
    { id: 2, title: 'Advanced JavaScript', description: 'Master the art of JavaScript.', price: '$70', status: 'inactive' },
    { id: 3, title: 'Node.js Backend', description: 'Build backend with Node.js.', price: '$60', status: 'active' },
    { id: 4, title: 'CSS Flexbox', description: 'Learn how to use Flexbox in CSS.', price: '$40', status: 'inactive' },
    { id: 5, title: 'React for Beginners', description: 'Learn the basics of React.', price: '$50', status: 'active' },
    { id: 6, title: 'Advanced JavaScript', description: 'Master the art of JavaScript.', price: '$70', status: 'inactive' },
    { id: 7, title: 'Node.js Backend', description: 'Build backend with Node.js.', price: '$60', status: 'active' },
    { id: 8, title: 'CSS Flexbox', description: 'Learn how to use Flexbox in CSS.', price: '$40', status: 'inactive' },
    // Add more courses as needed
  ];

  // State for managing search query, course list and modal visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [modalCourse, setModalCourse] = useState(null);

  // Filtering courses based on the search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle course activation/deactivation
  const toggleCourseStatus = (courseId) => {
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? { ...course, status: course.status === 'active' ? 'inactive' : 'active' } : course
    );
    setSearchQuery(updatedCourses);
  };

  // Handle course deletion
  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    setSearchQuery(updatedCourses);
  };

  // Handle adding new course
  const handleAddCourse = (newCourse) => {
    courses.push(newCourse);
    setSearchQuery([...courses]);
  };

  return (
    <div className="container my-4" style={{ overflowY: 'auto', height: '450px', scrollbarWidth: 'none' }}>
      <h2 className="mb-4 text-center fw-bold">Course Management</h2>

      {/* Search Input */}
      <div className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search by Title or Description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Course List Table */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.price}</td>
                  <td>
                    <span className={`badge ${course.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => setShowModal(true)}>
                      <Pencil size={16} /> Edit
                    </Button>
                    <Button
                      variant={course.status === 'active' ? 'danger' : 'success'}
                      size="sm"
                      className="me-2"
                      onClick={() => toggleCourseStatus(course.id)}
                    >
                      {course.status === 'active' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      {course.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => deleteCourse(course.id)}>
                      <Trash2 size={16} /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Pagination */}
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(filteredCourses.length / coursesPerPage))].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Add Course Button */}
      <div className="text-center mt-4">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Course
        </Button>
      </div>

      {/* Modal for Adding or Editing Course */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalCourse ? 'Edit Course' : 'Add New Course'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCourseTitle">
              <Form.Label>Course Title</Form.Label>
              <Form.Control type="text" placeholder="Enter course title" />
            </Form.Group>

            <Form.Group controlId="formCourseDescription" className="mt-3">
              <Form.Label>Course Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter course description" />
            </Form.Group>

            <Form.Group controlId="formCoursePrice" className="mt-3">
              <Form.Label>Course Price</Form.Label>
              <Form.Control type="text" placeholder="Enter course price" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddCourse({ title: 'New Course', description: 'Description', price: '$100' })}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CourseManagement;
