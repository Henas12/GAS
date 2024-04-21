import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom';
import {Alert, CardTitle,Col, Button, Row, Image,Container, Card, Form } from 'react-bootstrap';
import { useGetSingleStudentQuery, useUpdateStudentMutation } from '../../slices/studentApiSlice';
import {toast} from 'react-toastify'
import Loader from '../../layouts/loader/Loader';
import { useNavigate } from 'react-router-dom';

function StudentDetail() {
const { id: studentId } = useParams();

const {data, isLoading, error, refetch} = useGetSingleStudentQuery(studentId)
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    grade: '',
    image: null,
  });
  const navigate = useNavigate()

    

        
  return (
    (isLoading? <Loader/> :
    ( 
    <Row>
    <Col xs="12" md="6">
         <Card>
   
        <CardTitle tag="h2" className="border-bottom p-3 mb-0">
          Student Info
        </CardTitle>

       
    
            <Card.Body>
              <div className="mb-3 mt-md-4">
                
                <div className="mb-3">
                  <Form>
    
                  <Row>
          <Col>
          <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
          type="text"
          name="firstName"
          value={data.first_name}
          required
          disabled
          />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
          type="text"
          name="lastName"
          disabled
          value={data.last_name}
          
          required
          />
          </Form.Group>
          </Col>
          </Row>
    
          <Form.Group controlId="formBirthDate">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
          type="date"
          name="birthDate"
          value={data.date_of_birth}
          disabled
          required
          />
          
          </Form.Group>
          <Form.Group controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control disabled as="select" name="gender" value={data.gender}  >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          </Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId="formGrade">
          <Form.Label>Grade</Form.Label>
          <Form.Control disabled as="select" name="grade" value={data.grade}  >
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
          </Form.Group>
    
          <div className="d-grid mt-3">
                            <Button className='mt-3' onClick={()=>navigate(`/students/update/${studentId}`)} variant="primary">
                             Update Information
                            </Button>
                          </div>
                  </Form>
               
                </div>
              </div>
            </Card.Body>
          </Card>
    
    
        </Col>
    
    

        <Col xs="12" md="6">
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Card>
        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
          Image
        </CardTitle>

            <Card.Body>
              
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase ">
                  Image
                </h2>
                <div className="mb-3">
                <Image src={data.image} alt="Image description" fluid />
                 
                </div>
              </div>
            </Card.Body>
          
          </Card>
    
    
        </Col>
    
    
    
      </Row> )
      
          )
    
    

  )
}

export default StudentDetail