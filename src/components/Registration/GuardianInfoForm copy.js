// GuardianInfoForm.js
import React from 'react';
import { Form, Col, Row, Alert,Button } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { useState } from 'react';
const GuardianInfoForm = ({ webcamRef, formData, formErrors, handleGuadianInputChange, newGuardian,handleRegisterGuardians, handleGuardianImage,handleNext }) => {
  
  const[openCamera, setOpenCamera]= useState(true)

  const reserhandle =() =>{
    handleNext()
    setOpenCamera(true)
  }
  return(

  
  
  <>
     {!newGuardian && (
      <>
    <Form.Group controlId="formStep3">
      <Form.Label>Search Guardians</Form.Label>
      <Form.Control
        type="text"
        name="searchGuardians"
        value={formData.searchGuardians}
        onChange={handleGuadianInputChange}
      />
    </Form.Group>

 
      <Button variant="primary" onClick={handleRegisterGuardians} >
        Register Guardians
      </Button>
      </>
    )}



    {newGuardian && (
  <>

{openCamera?
          ( 
            <>
          <Row>
   
            <Col>
            <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleGuadianInputChange}
            />
            {formErrors.first_name && <Alert variant="danger">{formErrors.first_name}</Alert>}
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleGuadianInputChange}
            />
            {formErrors.last_name && <Alert variant="danger">{formErrors.last_name}</Alert>}
            </Form.Group>
            </Col>
            </Row>
            <Form.Group controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleGuadianInputChange}
            />
            {formErrors.username && <Alert variant="danger">{formErrors.username}</Alert>}
            </Form.Group>
            <Form.Group controlId="relation">
            <Form.Label>Relation</Form.Label>
            <Form.Control as="select" name="relationship" value={formData.relationship} onChange={handleGuadianInputChange}>
            <option value="">Select Relation</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="sibiling">Sibiling</option>
            <option value="other">Other</option>
            </Form.Control>
            {formErrors.relationship && <Alert variant="danger">{formErrors.relationship}</Alert>}
            </Form.Group>
            <Form.Group controlId="phoneNumber">
            <Form.Label>phoneNumber</Form.Label>
            <Form.Control
            type="number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleGuadianInputChange}
            />
            {formErrors.phone_number && <Alert variant="danger">{formErrors.phone_number}</Alert>}
            </Form.Group>
            <Button variant="primary" onClick={() => { setOpenCamera(false) }}>
       Capture Image
     </Button>
    </>
          ):
     ( 
     
     <> 
     <Form.Group controlId="formStep2">
     
     <Form.Label>Take a Picture</Form.Label>
     <Webcam
       audio={false}
       ref={webcamRef}
       screenshotFormat="image/jpeg"
       className="mb-2"
       style={{ height: '400px', width: '400px' }}
     />
     <Button variant="primary" onClick={() => { handleGuardianImage() }}>
       Capture Image
     </Button>

     {formData.image && (
       <div className="mt-2">
         <strong>Preview:</strong>
         <img  src={formData.image} alt="Captured" className="img-fluid" />
       </div>
     )}
   </Form.Group>
      <Button variant="primary" type="submit" onClick={reserhandle}>
      Submit
    </Button>
    </>
   )
   

   
   }
        
   
   
                 
                
    </>
    
    )}
</>)
};

export default GuardianInfoForm;
