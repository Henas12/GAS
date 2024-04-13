import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom';
import {Alert, CardTitle,Col, Button, Row, Image,Container, Card, Form } from 'react-bootstrap';
import {  useGetSingleGuardianQuery, useUpdateGuardianMutation } from '../../slices/guardiansApiSlice';
import {toast} from 'react-toastify'
import Loader from '../../layouts/loader/Loader';
import StudentList from './StudentsList';
import { useNavigate } from 'react-router-dom';
function GuardianDetail() {
const { id: guardianId } = useParams();
const {data, isLoading, error, refetch} = useGetSingleGuardianQuery(guardianId)
const navigate = useNavigate()



    

      

  return (
    (isLoading? <Loader/>:
    ( 
    <Row>




    <Col xs="12" md="6">
         <Card>
   
        <CardTitle tag="h2" className="border-bottom p-3 mb-0">
          Guardian Info
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
          name="first_name"
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
          name="last_name"
          value={data.last_name}
          disabled
          required
          />
          </Form.Group>
          </Col>
          </Row>
    
          <Form.Group controlId="username">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
          type="text"
          name="username"
          disabled={true}
        value={data.username}
                  
          required
          />
          </Form.Group>
          <Form.Group controlId="relation">
            <Form.Label>Relation</Form.Label>
            <Form.Control disabled as="select" name="relationship" value={data.relationship} >
            <option value="">Select Relation</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="sibiling">Sibiling</option>
            
            <option value="other">Other</option>
            </Form.Control>
            </Form.Group>

            <Form.Group controlId="phoneNumber">
            <Form.Label>phoneNumber</Form.Label>
            <Form.Control
            type="number"
            name="phone_number"
            value={data.phone_number}
            disabled
            />
            </Form.Group>

            <Form.Group controlId="birthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
            type="date"
            name="birthDate"
            value={data.date_of_birth}
            disabled
            />
            </Form.Group>


            <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
            type="text"
            name="address"
            value={data.address}
            disabled
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
          <div className="d-grid mt-3">
                            <Button className='mt-3' onClick={()=> navigate(`/guardians/update/${guardianId}`)} variant="primary" >
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
      
      <Card>
        
           <StudentList/>
          
          </Card>
    
    
        </Col>
    
    
    
      </Row> )
      
           )
    
    

  )
}

export default GuardianDetail