import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'react-toastify';
import { Form, Image,ProgressBar, Button, Col, Row, Alert } from 'react-bootstrap';
import '../../../Registration.css'
import logo from '../../../assets/images/logos/logo.svg'
import { useAuthenticatorRegistrationMutation } from '../../../slices/registrationApiSlice';
import { useNavigate } from 'react-router-dom';
const AuthenticatorForm = () => {
  const navigate = useNavigate()
  const [ authenticatorRegistration, {isLoading}] = useAuthenticatorRegistrationMutation()

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
   
  });


  const [formErrors, setFormErrors] = useState({});

 

  const handleNext = (event) => {
    event.preventDefault();
    if (validateStep()) {
      console.log(validateStep())
      handleSubmit()
    } 
    
    else 
    {

      if  (!(formData.confirmPassword === '') && (formData.password !==formData.confirmPassword)) {
        toast.error('Passwords are Different')
       }

else{ 
       toast.error('Please fill all the required fields correctly before proceeding.');
    }
  }};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };
  const [formDatas, setFormDatas] = useState({})

  const handleSubmit = async () => {
 
    formDatas.first_name = formData.firstName
    formDatas.last_name = formData.lastName
    formDatas.username = formData.username
    formDatas.email = formData.email
    formDatas.phone_number = formData.phone_number
    formDatas.gender = formData.gender
    formDatas.date_of_birth = formData.birthDate
    formDatas.password = formData.password
    
const data = {"user":formDatas}
console.log(data)
    try {
      const res = await authenticatorRegistration(data).unwrap();
      console.log(res)
      
      toast.success('User is Registered')
      navigate('/activate')     
   
    } catch (err) {
      console.log(err)
      toast.error(err) 
     
    }


}




  const validateStep = () => {
    let valid = true;
    const errors = {};

  
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
              <h1>Authenticator Registration</h1>
              </div>
              </div>
<Row>

      <Col md={12}>
        <Form>
  
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
      
          

       


        
            <Button variant="primary" type="submit"  onClick={handleNext}>
              Submit
            </Button>
        
      </Form>
    </Col>

</Row>
</div>
     </div>
     </div>

  );
};

export default AuthenticatorForm;
