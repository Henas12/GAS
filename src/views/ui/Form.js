// MultiStepForm.js
import React, { useState,useEffect, useRef } from 'react';
import { Form, Image, ProgressBar,  ButtonGroup,
  Card,
  CardBody,
  CardTitle,Button, Col, Row } from 'react-bootstrap';
import StudentInfoForm from '../../components/Registration/StudentInfoForm';
import ImageCaptureForm from '../../components/Registration/ImageCaptureForm';
import image from './kids-walking.jpg';
import StudentSummary from '../../components/Registration/StudentSummary';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { resetStudent } from '../../slices/studentSlice';
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const[preview, setPreview] = useState(false)
  const [formDatas, setFormDatas] = useState(new FormData());

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
              formDatas.append('grade', formData.grade)
              formDatas.append('gender', formData.gender)

              formDatas.append('image', blob, 'image.jpg');
  
      
    }
   
    const { studentInfo } = useSelector((state) => state.student);
    const dispatch = useDispatch()
    
    useEffect(()=>{
       if(studentInfo){
          dispatch(resetStudent())
       }
    },[])

  
  
  

  const [formErrors, setFormErrors] = useState({});
  const webcamRef = useRef(null);


  const handleNext = () => {
    
    if (validateStep()) {


      if(step ==2){
        if(formDatas){
        setPreview(true)      }
      }
        else if(step==3) {
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

  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateStep()) {

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
    }  
  

    setFormErrors(errors);
    return valid;
  };


  return (
    <>
      {preview  ? (
        <StudentSummary setPreview={setPreview} setStep={setStep} formData={formData} formDatas={formDatas} setFormDatas={setFormDatas} />

      ) :  (
        <>
          <Row>
          <Col xs="12" md="6">
          
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Studen Registration Form
            </CardTitle>
            <CardBody className="">
              <div className="button-group">
              <Form onSubmit={handleSubmit}>
                <ProgressBar now={(step / 2) * 100} />
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
                
              
                {/* ... other components ... */}
                <div className="d-flex justify-content-between">
                  
                  
                  {step ===2 && (
                    <Button variant="secondary" onClick={handlePrevious}>
                      Previous
                    </Button>
                  )}
                  {step <3 && (
                    <Button variant="primary" onClick={handleNext}>
                      Next
                    </Button>
                  )}
                </div>
              </Form>

              </div>
            </CardBody>
          </Card>
        </Col>



        <Col xs="12" md="6">
          
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Student Picture
            </CardTitle>
            <CardBody className="">
              <div className="button-group">
              {formData.image?  <Image src={formData.image} alt="Image description" fluid />:
              <Image src={image} alt="Image description" fluid />}
              </div>
            </CardBody>
          </Card>
        </Col>
        
          </Row>
          
          
        </>
      )}
    </>
  );
  
  
};

export default MultiStepForm;

