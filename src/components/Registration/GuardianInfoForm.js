// GuardianInfoForm.js
import React from 'react';
import { Form, Col, Row, Alert,Button } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Apps from '../../views/ui/Apps'
import { resetStudent } from "../../slices/studentSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const GuardianInfoForm = ({ webcamRef, formData, formErrors, handleGuadianInputChange, newGuardian,handleRegisterGuardians, handleGuardianImage,handleNext,validateStep, setRefetchs,refetchs,setFormData }) => {
  
  const[openCamera, setOpenCamera]= useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const clearEveryting=()=>{
    dispatch(resetStudent());
    navigate('/student_registration')
  }


  const reserhandle =() =>{
    handleNext()
    handleGuardianImage()
    setOpenCamera(true)

  }


  const checkInput = ()=>{
    setRefetchs(true)
    console.log(refetchs)
    if (validateStep()) {
      setOpenCamera(false)
    } else {
      toast.error('Please fill all the required fields correctly before submitting.');
    }

  
  }



  const handleCaptureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
   

    if (formData.user_photo_1 === null) {
      setFormData(prevState => ({ ...prevState, user_photo_1: imageSrc }));
      console.log('hena1')
      // setPrompt('Take Picture 2');
    } else if (formData.user_photo_2 === null) {
      setFormData(prevState => ({ ...prevState, user_photo_2: imageSrc }));
      console.log('hena2')

      // setPrompt('Take Picture 3');
    } else if (formData.user_photo_3 === null) {
      setFormData(prevState => ({ ...prevState, user_photo_3: imageSrc }));
      console.log('hena3')

      // setSubmit(true)
    } else {
      console.log('All images captured.');
    }
  };

  const handleRetakeImages = () => {
    // setSubmit(false)

    setFormData({
      user_photo_1: null,
      user_photo_2: null,
      user_photo_3: null
    });
  };

  return(

  
  
  <>
     {!newGuardian && (
      <>
  <Apps setRefetch={setRefetchs}  refetchs={refetchs}/>

 
    {/* <Button variant="primary"  onClick={fetch}>
      Fetch
    </Button> */}

<div className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleRegisterGuardians}>
              Register Guardians
            </Button>
            <Button variant="primary" onClick={clearEveryting}>
              Finished
            </Button>
          </div>


    
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







            
            <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" name="gender" value={formData.gender} onChange={handleGuadianInputChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            </Form.Control>
            {formErrors.gender && <Alert variant="danger">{formErrors.gender}</Alert>}
            </Form.Group>
            
            <Form.Group controlId="formBirthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleGuadianInputChange}
            />
            {formErrors.birthDate && <Alert variant="danger">{formErrors.birthDate}</Alert>}
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
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
            type="number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleGuadianInputChange}
            />
            {formErrors.phone_number && <Alert variant="danger">{formErrors.phone_number}</Alert>}
            </Form.Group>



            <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleGuadianInputChange}
            />
            {formErrors.address && <Alert variant="danger">{formErrors.address}</Alert>}
            </Form.Group>




            <Button variant="primary" onClick={checkInput}>
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
          <div className="d-flex justify-content-between align-items-center p-3">

     <Button variant="primary" onClick={() => { handleCaptureImage() }}>
       Capture Image
     </Button>
     <Button variant="secondary" onClick={handleRetakeImages}>
            Retake Images
          </Button>
        
          </div>
   </Form.Group>
      {formData.user_photo_3 &&<Button variant="primary" type="submit" onClick={reserhandle}>
      Submit
    </Button>
}
   
    </>
   )
   

   
   }
        
   
   
                 
                
    </>
    
    )}
</>)
};

export default GuardianInfoForm;
