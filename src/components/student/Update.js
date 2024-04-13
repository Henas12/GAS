import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import {Alert, CardTitle,Col, Button, Row, Image,Container, Card, Form } from 'react-bootstrap';
import { useGetSingleStudentQuery, useUpdateStudentMutation } from '../../slices/studentApiSlice';
import {toast} from 'react-toastify'
import Loader from '../../layouts/loader/Loader';
function StudentUpdate() {
const { id: studentId } = useParams();
const {data, isLoading, error, refetch} = useGetSingleStudentQuery(studentId)
const [updateStudent, {isLoading: updateLoaing}] = useUpdateStudentMutation()
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    grade: '',
    image: null,
  });
  const navigate = useNavigate()
useEffect(()=>{
if (data && !isLoading){
    formData.firstName = data.first_name
    formData.lastName = data.last_name
    formData.birthDate = data.date_of_birth
    formData.grade = data.grade
    formData.image = data.image 
    formData.gender = data.gender
 
}
}, [isLoading,data ])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
      const  updateHandler = async()=>{
        const dataToSend = {
       "first_name": formData.firstName,
        "last_name": formData.lastName,
        "date_of_birth": formData.birthDate,
        "grade": formData.grade,
        "gender": formData.gender,
      }

        try{
          
            const res =  await updateStudent({studentId,dataToSend})
    
            toast.success('Information Updated')
            navigate(`/students/${studentId}`)
            refetch()
        }
        catch(error){
            toast.error(error?.data)
        }
      }

  return (
    (isLoading? <Loader/> : formData?
    (   updateLoaing? <Loader/>:
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
          value={formData.firstName||data.first_name}
          required
          onChange={handleInputChange}
          />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName||data.last_name}
          onChange={handleInputChange}
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
          value={formData.birthDate||data.date_of_birth}
          onChange={handleInputChange}
          required
          />
          
          </Form.Group>
          <Form.Group controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" name="gender" value={formData.gender || data.gender}  onChange={handleInputChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          </Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId="formGrade">
          <Form.Label>Grade</Form.Label>
          <Form.Control as="select" name="grade" value={formData.grade || data.grade} onChange={handleInputChange} >
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
                            <Button className='mt-3' onClick={updateHandler} variant="primary" type="submit">
                             Update Student
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
    
    
    
      </Row> ):
      
      (<Loader/>)      )
    
    

  )
}

export default StudentUpdate