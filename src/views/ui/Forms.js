import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Form, Image,ProgressBar, Button, Col, Row, Alert } from 'react-bootstrap';
import image from "./kids-walking.jpg";
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    grade: '',
    image: 'null'
  });
  
const [newGuardian, setNewGuardian] = useState(false)

  const [formErrors, setFormErrors] = useState({});
  const webcamRef = useRef(null);
  const handleCaptureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData({ ...formData, image: imageSrc });
  };

  const handleRegisterGuardians=()=>{
    setNewGuardian(true)
    console.log('register')
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      alert('Please fill all the required fields correctly before proceeding.');
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error message when the user starts typing in the field
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateStep()) {
      // handle form submission
    } else {
      alert('Please fill all the required fields correctly before submitting.');
    }
  };


  const validateStep = () => {
    let valid = true;
    const errors = {};

    if (step === 1) {
      if (formData.firstName.trim() === '') {
        errors.firstName = 'First Name is required';
        valid = false;
      }
      if (formData.lastName.trim() === '') {
        errors.lastName = 'Last Name is required';
        valid = false;
      }
      if (formData.birthDate.trim() === '') {
        errors.birthDate = 'Birth Date is required';
        valid = false;
      }
      if (formData.gender.trim() === '') {
        errors.gender = 'Gender is required';
        valid = false;
      }
      if (formData.grade.trim() === '') {
        errors.grade = 'Grade is required';
        valid = false;
      }
    } else if (step === 2) {
      // Add validation for the second step here
    } else if (step === 3) {
      // Add validation for the third step here
    }

    setFormErrors(errors);
    return valid;
  };

  return (
    <Row>
      <Col md={6}>
        <Form onSubmit={handleSubmit}>
          <ProgressBar now={(step / 3) * 100} />
          {step === 1 && (
            <>
                          <Row>
              {/* Display "First Name" and "Last Name" side by side */}
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
                {formErrors.gender && <Alert variant="danger">{formErrors.gender}</Alert>}
              </Form.Group>
              <Form.Group controlId="formGrade">
                <Form.Label>Grade</Form.Label>
                <Form.Control as="select" name="grade" value={formData.grade} onChange={handleInputChange}>
                  <option value="">Select Grade</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  {/* Add other grade options */}
                </Form.Control>
                {formErrors.grade && <Alert variant="danger">{formErrors.grade}</Alert>}
              </Form.Group>
            </>
          )}
          {step === 2 && (

<>

<Form.Group controlId="formStep2">
  <Form.Label>Take a Picture</Form.Label>
  <Webcam
  audio={false}
  ref={webcamRef}
  screenshotFormat="image/jpeg"
  className="mb-2"
  style={{ height: '400px', width: '400px' }} // Adjust the height and width as needed
/>
  <Button variant="primary" onClick={handleCaptureImage}>
    Capture Image
  </Button>

  {formData.image && (
    <div className="mt-2">
      <strong>Preview:</strong>
      <img src={formData.image} alt="Captured" className="img-fluid" />
    </div>
  )}
</Form.Group>

</>
          )}
          {step === 3 && (
             <>
             <Form.Group controlId="formStep3">
               <Form.Label>Search Guardians</Form.Label>
               <Form.Control
                 type="text"
                 name="searchGuardians"
                 value={formData.searchGuardians}
                 onChange={handleInputChange}
               />
             </Form.Group>


{ !newGuardian &&           <Button variant="primary" onClick={handleRegisterGuardians}>
               Register Guardians
             </Button>}
{newGuardian &&    <>
                         <Row>
                         {/* Display "First Name" and "Last Name" side by side */}
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
                             <option value="male">Male</option>
                             <option value="female">Female</option>
                             <option value="other">Other</option>
                           </Form.Control>
                           {formErrors.gender && <Alert variant="danger">{formErrors.gender}</Alert>}
                         </Form.Group>
                         <Form.Group controlId="formGrade">
                           <Form.Label>Grade</Form.Label>
                           <Form.Control as="select" name="grade" value={formData.grade} onChange={handleInputChange}>
                             <option value="">Select Grade</option>
                             <option value="1">1</option>
                             <option value="2">2</option>
                             {/* Add other grade options */}
                           </Form.Control>
                           {formErrors.grade && <Alert variant="danger">{formErrors.grade}</Alert>}
                         </Form.Group>

</>
}

           </>
          )}


        <div className="d-flex justify-content-between">
          {step > 1 && (
            <Button variant="secondary" onClick={handlePrevious}>
              Previous
            </Button>
          )}

          
          {step < 3 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </Col>

<Col md={6}>
<Image src={image} alt="Image description" fluid />
</Col>
</Row>
  );
};

export default MultiStepForm;
