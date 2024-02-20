// MultiStepForm.js
import React, { useState, useRef } from 'react';
import { Form, Image, ProgressBar, Button, Col, Row } from 'react-bootstrap';
import StudentInfoForm from '../../components/Registration/StudentInfoForm';
import ImageCaptureForm from '../../components/Registration/ImageCaptureForm';
import GuardianInfoForm from '../../components/Registration/GuardianInfoForm';
import image from './kids-walking.jpg';
import GuardianSummary from '../../components/Registration/GuardianSummary';
import StudentSummary from '../../components/Registration/StudentSummary';
import { toast } from 'react-toastify';
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const[preview, setPreview] = useState(false)
  const[guardianPreview, setGuardianPreview] = useState(false)
  const [formDatas, setFormDatas] = useState(new FormData());
  const [guardianFormDatas, setGuardianFormDatas] = useState(new FormData());

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    grade: '',
    image: null,
  });



  const handleCaptureImage = async () => {
 
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData({ ...formData, image: imageSrc });
  

    const response = await fetch(imageSrc);
        const blob = await response.blob();
     
        formDatas.append( 'first_name',formData.firstName)
     
          formDatas.append('last_name', formData.lastName)
            formDatas.append('date_of_birth', formData.birthDate)
              formDatas.append('class_name', formData.grade)
              formDatas.append('image', blob, 'image.jpg');
  
      
    }
    const handleGuardianImage = async () => {
 
      const imageSrc = webcamRef.current.getScreenshot();
      setGuardianFormData({ ...guardianFormData, image: imageSrc });
       
  
      const response = await fetch(imageSrc);
          const blob = await response.blob();
          guardianFormDatas.append('username', guardianFormData.username)
          guardianFormDatas.append('user_photo', blob, 'image.jpg');
          guardianFormDatas.append( 'first_name',guardianFormData.first_name)
            guardianFormDatas.append('last_name', guardianFormData.last_name)
            guardianFormDatas.append('phone_number', guardianFormData.phone_number)
                guardianFormDatas.append('relationship', guardianFormData.relationship)
          
      }
  

  
  
  
  const [newGuardian, setNewGuardian] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const webcamRef = useRef(null);



  
  const handleRegisterGuardians=()=>{
    setNewGuardian(true)
    console.log('register')
  }

  const handleNext = () => {
    
    if (validateStep()) {


      if(step ==2){
        if(formDatas){
        setPreview(true)      }
      }
        else if(step==3) {
          setGuardianPreview(true)
        }
      
      else{
      setStep(step + 1);
    }
    } else {
      toast.error('Please fill all the required fields correctly before proceeding.');
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

  const handleGuadianInputChange = (event) => {
    const { name, value } = event.target;
    setGuardianFormData({ ...guardianFormData, [name]: value });
    // Clear the error message when the user starts typing in the field
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateStep()) {
      // handle form submission
    } else {
      toast.error('Please fill all the required fields correctly before submitting.');
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
      if (guardianFormData.first_name.trim() === '') {
        errors.first_name = 'First Name is required';
        valid = false;
      }
      if (guardianFormData.last_name.trim() === '') {
        errors.last_name = 'Last Name is required';
        valid = false;
      }
      if (guardianFormData.username.trim() === '') {
        errors.username = 'Username is required';
        valid = false;
      }
      if (guardianFormData.phone_number.trim() === '') {
        errors.phone_number = 'Phone Number is required';
        valid = false;
      }
      if (guardianFormData.relationship.trim() === '') {
        errors.relationship = 'Relationship is required';
        valid = false;
      }
    }

    setFormErrors(errors);
    return valid;
  };


  return (
    <>
      {preview  ? (
        <StudentSummary setPreview={setPreview} setStep={setStep} formData={formData} formDatas={formDatas}/>

      ) : guardianPreview ? (
        <GuardianSummary  setGuardianPreview={setGuardianPreview} setStep={setStep}  guardianFormData={guardianFormData} guardianFormDatas={guardianFormDatas} />
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <ProgressBar now={(step / 3) * 100} />
                {step === 1 && (
                  <StudentInfoForm
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                  />
                )}
                {step === 2 && (
                  <ImageCaptureForm
                    formData={formData}
                    webcamRef={webcamRef}
                    handleCaptureImage={handleCaptureImage}
                    handleNext={handleNext}
                  />
                )}
                {step === 3 && (
                  <GuardianInfoForm
                    webcamRef={webcamRef}
                    formData={guardianFormData}
                    formErrors={formErrors}
                    handleGuadianInputChange={handleGuadianInputChange}
                    newGuardian={newGuardian}
                    handleRegisterGuardians={handleRegisterGuardians}
                    handleGuardianImage={handleGuardianImage}
                    handleNext={handleNext}
                  />
                )}
                {/* ... other components ... */}
                <div className="d-flex justify-content-between">
                  {step === 1 && (
                    <Button variant="secondary" onClick={handlePrevious}>
                      Previous
                    </Button>
                  )}
                  {step < 3 && (
                    <Button variant="primary" onClick={handleNext}>
                      Next
                    </Button>
                  )}
                </div>
              </Form>
            </Col>
            <Col md={6}>
              <Image src={image} alt="Image description" fluid />
            </Col>
          </Row>
        </>
      )}
    </>
  );
  
  
};

export default MultiStepForm;

