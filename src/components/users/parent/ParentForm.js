import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'react-toastify';
import { Form, Image,ProgressBar, Button, Col, Row, Alert } from 'react-bootstrap';
import '../../../Registration.css'
import logo from '../../../assets/images/logos/logo.svg'
import ImageCapture from './ImageCapture';
import { useParentRegistrationMutation } from '../../../slices/registrationApiSlice';
const ParentForm = () => {

  const [ parentRegistration, {isLoading}] = useParentRegistrationMutation()
  const [step, setStep] = useState(1);
  const [formDatas, setFormDatas] = useState({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
  
    username: "",
    email: "",
    password:'',
    confirmPassword:'',
    phone_number: "",
    user_photo_1: null,
    user_photo_2: null,
    user_photo_3: null
  });

  const [parantInfos, setparantInfos] = useState(new FormData());
const [submit, setSubmit] = useState(false)

  const [formErrors, setFormErrors] = useState({});
  const webcamRef = useRef(null);

 

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else 
    {

      if  (!(formData.confirmPassword === '') && (formData.password !==formData.confirmPassword)) {
        toast.error('Passwords are Different')
       }

else{ 
       toast.error('Please fill all the required fields correctly before proceeding.');
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setparantInfos(new FormData())

    const response1 = await fetch(formData.user_photo_1);
    const response2 = await fetch(formData.user_photo_1);
    const response3 = await fetch(formData.user_photo_1);



    const blob1 = await response1.blob();
    const blob2 = await response2.blob();
    const blob3 = await response3.blob();

    // formDatas.first_name = formData.firstName
    // formDatas.last_name = formData.lastName
    // formDatas.username = formData.username
    // formDatas.email = formData.email
    // formDatas.phone_number = formData.phone_number
    // formDatas.gender = formData.gender
    // formDatas.date_of_birth = formData.birthDate
    // formDatas.password = formData.password
    


    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
      phone_number: formData.phone_number,
      gender: formData.gender,
      date_of_birth: formData.birthDate,
      password: formData.password
    };
    
    const userDataString = JSON.stringify(userData);
    parantInfos.append('user',userDataString)



    parantInfos.append('user_photo_1', blob1, 'image1.jpg');
    parantInfos.append('user_photo_2', blob2, 'image2.jpg');
    parantInfos.append('user_photo_3', blob3, 'image3.jpg');
  

   try{

    for (const [key, value] of parantInfos.entries()) {
     
      console.log(`${key}:`, value);
    }
 



      const res = await parentRegistration(parantInfos).unwrap();
      console.log('Backend response:', res);
    
      setparantInfos(new FormData())
      
      
      toast.success('User is Registered')
     
   
    } catch (err) {
      
      console.log(err)
    }


}




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
     
    
      if (formData.username.trim() === '') {
        errors.username = 'username is required';
        valid = false;
      }
      if (formData.email.trim() === '') {
        errors.email = 'email is required';
        valid = false;
      }
      if (formData.password.trim() === '') {
        errors.password = 'password is required';
        valid = false;
      }
      if (formData.confirmPassword.trim() === '') {
        errors.confirmPassword = 'Confirm Password is required';
        valid = false;
      }
      if (formData.phone_number.trim() === '') {
        errors.phone_number = 'Phone number is required';
        valid = false;
      }
      if  (!(formData.confirmPassword === '') && (formData.password !==formData.confirmPassword)) {
        valid = false;
       }
   
    }
     else if (step === 2) {
      // Add validation for the second step here
    } else if (step === 3) {
      // Add validation for the third step here
    }

    setFormErrors(errors);
    return valid;
  };

  return (
    <div className="login-container">
     <div className="auth-wrapper">
      <div className="auth-inner"> 

      <div className="d-flex justify-content-center align-items-center">
        <div className="logo-container text-center">
              <img src={logo} alt="Bright School Logo" />
              <h1>Parent Registration</h1>
              </div>
              </div>
<Row>

      <Col md={12}>
        <Form onSubmit={handleSubmit}>
          <ProgressBar now={(step / 3) * 100} />
          {step === 1 && (
            <>
                          <Row>
              {/* Display "First Name" and "Last Name" side by side */}
              <Col  className="mb-3">
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
              <Col  className="mb-3">
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

            <Form.Group controlId="username">
                  <Form.Label> userame</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {formErrors.username && <Alert variant="danger">{formErrors.username}</Alert>}
                </Form.Group>


                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && <Alert variant="danger">{formErrors.email}</Alert>}
                </Form.Group>

                <Form.Group controlId="phone_number">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />
                  {formErrors.phone_number && <Alert variant="danger">{formErrors.phone_number}</Alert>}
                </Form.Group>

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


              <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {formErrors.password && <Alert variant="danger">{formErrors.password}</Alert>}
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {formErrors.confirmPassword && <Alert variant="danger">{formErrors.confirmPassword}</Alert>}
                </Form.Group>
             
            </>
          )}
          {step === 2 && (

<>

<ImageCapture formData={formData} setFormData={setFormData} setSubmit={setSubmit}/>

</>
          )}
       


        <div className="d-flex justify-content-between">
          {step > 1 && (
            <Button variant="secondary" onClick={handlePrevious}>
              Previous
            </Button>
          )}

          
          {step < 2 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="primary" type="submit" disabled={!submit} onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </Form>
    </Col>

</Row>
</div>
     </div>
     </div>

  );
};

export default ParentForm;