import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom';
import {Alert, CardTitle,Col, Button, Row, Image,Container, Card, Form } from 'react-bootstrap';
import {  useGetSingleParentQuery } from '../../slices/ParentApiSlice';
import {toast} from 'react-toastify'
import Loader from '../../layouts/loader/Loader';
import StudentList from './StudentsList';
import { useNavigate } from 'react-router-dom';
import './UserInfoDisplay.css';
function GuardianDetail() {
const { id: guardianId } = useParams();
const {data, isLoading, error, refetch} = useGetSingleParentQuery(guardianId)
const navigate = useNavigate()

const [formData, setFormData] = useState({


  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe123",
  "email": "john.doe@example.com",
  "phone_number": "+1234567890",
  "gender": "Male",
  "birthDate": "1990-05-15",
  "password": "password123"
})

      

  return (


   

    (isLoading? <Loader/>:
    ( 
    <Row>




    <Col xs="12" md="6">
         <Card>
   
        <CardTitle tag="h2" className="border-bottom p-3 mb-0">
          Parent  Info
        </CardTitle>

       
    
            <Card.Body>
              <div className="mb-3 mt-md-4">
                
                <div className="mb-3">
                  <Form>



      <div className="user-info-item">
        <span className="info-label">First Name:</span>
        <span className="info-value">{data.user.first_name}</span>
      </div>
      <div className="user-info-item">
        <span className="info-label">Last Name:</span>
        <span className="info-value">{data.user.last_name}</span>
      </div>
      <div className="user-info-item">
        <span className="info-label">Username:</span>
        <span className="info-value">{data.user.username}</span>
      </div>
      <div className="user-info-item">
        <span className="info-label">Email:</span>
        <span className="info-value">{data.user.email}</span>
      </div>
      <div className="user-info-item">
        <span className="info-label">Phone Number:</span>
        <span className="info-value">{data.user.phone_number}</span>
      </div>
      <div className="user-info-item">
        <span className="info-label">Gender:</span>
        <span className="info-value">{data.user.gender}</span>
      </div>
      <div className="user-info-item">
        <span className="info-label">Date of Birth:</span>
        <span className="info-value">{data.user.birthDate}</span>
      </div>
     
    
                 
       
          <div className="d-grid mt-3">
                            <Button className='mt-3' onClick={()=> navigate(`/parents`)} variant="primary" >
                             Go Back
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
        
           {/* <StudentList/> */}
          
          </Card>
    
    
        </Col>
    
    
    
      </Row> )
      
           )
    
    

  )
}

export default GuardianDetail