import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom';
import {Alert, CardTitle,Col, Button, Row, Image,Container, Card, Form } from 'react-bootstrap';
import {  useGetSingleGuardianQuery, useUpdateGuardianMutation } from '../../slices/guardiansApiSlice';
import {toast} from 'react-toastify'
import Loader from '../../layouts/loader/Loader';
import StudentList from './StudentsList';
function GuardianDetail() {
const { id: guardianId } = useParams();
const {data, isLoading, error, refetch} = useGetSingleGuardianQuery(guardianId)
const [guardianUpdate, {isLoading: updateLoaing}] = useUpdateGuardianMutation()
const [formData, setFormData] = useState({
  username : '',
  image : null,
  first_name : '',
  last_name : '',
  phone_number : '',
  relationship : '',
  address : '',
  gender : '',
  birthDate : '',

  });
useEffect(()=>{
if (data && !isLoading){
  console.log(data)
    formData.first_name = data.first_name
    formData.last_name = data.last_name
    formData.phone_number = data.phone_number
    formData.relationship = data.relationship
    formData.image = data.image 
    formData.username = data.username
    formData.birthDate = data.date_of_birth
    formData.address = data.address
    formData.gender = data.gender 
}
}, [isLoading,data ])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
      const  updateHandler = async()=>{
        const dataToSend = {
       "first_name": formData.first_name,
       "image":data.image,
        "last_name": formData.last_name,
        "relationship": formData.relationship,
        "phone_number": formData.phone_number,
         "date_of_birth": formData.birthDate,
         "address": formData.address,
    "gender" : formData.gender

 
      
      }

        try{
          
            const res =  await guardianUpdate({guardianId,dataToSend})
            toast.success('Infomation Updated')
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
          value={formData.first_name||data.first_name}
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
          name="last_name"
          value={formData.last_name||data.last_name}
          onChange={handleInputChange}
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
        value={formData.username||data.username}
                  onChange={handleInputChange}
          required
          />
          </Form.Group>
          <Form.Group controlId="relation">
            <Form.Label>Relation</Form.Label>
            <Form.Control as="select" name="relationship" value={formData.relationship||data.relationship} onChange={handleInputChange}>
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
            value={formData.phone_number||data.phone_number}
            onChange={handleInputChange}
            />
            </Form.Group>

            <Form.Group controlId="birthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
            type="date"
            name="birthDate"
            value={formData.birthDate||data.date_of_birth}
            onChange={handleInputChange}
            />
            </Form.Group>


            <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
            type="text"
            name="address"
            value={formData.address||data.address}
            onChange={handleInputChange}
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
          <div className="d-grid mt-3">
                            <Button className='mt-3' onClick={updateHandler} variant="primary" type="submit">
                             Update Guardian
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
    
    
    
      </Row> ):
      
      (<Loader/>)      )
    
    

  )
}

export default GuardianDetail