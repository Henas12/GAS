
import React from 'react';
import { Form, Col, Row, Alert } from 'react-bootstrap';

const StudentInfoForm = ({ formData, formErrors, handleInputChange }) => (
    <>
    <Row>
            <Col>
            <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            />
            {formErrors.firstName && <Alert variant="danger">{formErrors.firstName}</Alert>}
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            />
            {formErrors.lastName && <Alert variant="danger">{formErrors.lastName}</Alert>}
            </Form.Group>
            </Col>
            </Row>

            <Form.Group controlId="formBirthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            />
            {formErrors.birthDate && <Alert variant="danger">{formErrors.birthDate}</Alert>}
            </Form.Group>
            <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            </Form.Control>
            {formErrors.gender && <Alert variant="danger">{formErrors.gender}</Alert>}
            </Form.Group>
            <Form.Group controlId="formGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Control as="select" name="grade" value={formData.grade} onChange={handleInputChange}>
            <option value="">Select Grade</option>
            <option value="Nursery">Nursery</option>
      <option value="KG">KG</option>
      <option value="LKG">LKG</option>
      <option value="1">1st Grade</option>
      <option value="2">2nd Grade</option>
      <option value="3">3rd Grade</option>
      <option value="4">4th Grade</option>
      <option value="5">5th Grade</option>
      <option value="6">6th Grade</option>
      <option value="7">7th Grade</option>

      <option value="8">8th Grade</option>

            </Form.Control>
            {formErrors.grade && <Alert variant="danger">{formErrors.grade}</Alert>}
            </Form.Group>
</>
);

export default StudentInfoForm;