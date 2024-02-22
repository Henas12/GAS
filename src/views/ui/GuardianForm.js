// MultiStepForm.js
import React, { useState, useRef } from 'react';
import { Form, Image, ProgressBar,  ButtonGroup,
  Card,
  CardBody,
  CardTitle,Button, Col, Row } from 'react-bootstrap';
import GuardiansInfo from '../../components/Registration/GuardiansInfo';
import GuardianInfoForm from '../../components/Registration/GuardianInfoForm';
import image from './kids-walking.jpg';
import GuardianSummary from '../../components/Registration/GuardianSummary';
import { toast } from 'react-toastify';

const GuardianForm = () => {
  const [step, setStep] = useState(1);
  const[preview, setPreview] = useState(false)
  const [guardianFormDatas, setGuardianFormDatas] = useState(new FormData());


  const [guardianFormData, setGuardianFormData] = useState({
    username : '',
    image : null,
    first_name : '',
    last_name : '',
    phone_number : '',
    relationship : '',
    gender : '',
    birthDate: '',
    address: '',



  });

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
          // guardianFormDatas.append('gender', guardianFormData.gender)
          guardianFormDatas.append('date_of_birth', guardianFormData.birthDate)
          guardianFormDatas.append('address', guardianFormData.address)
      }
  

  
  
  
  const [newGuardian, setNewGuardian] = useState(false);
  const [refetchs, setRefetchs] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const webcamRef = useRef(null);



  
  const handleRegisterGuardians=()=>{
    setNewGuardian(true)
    
  }


  const handleNext = () => {
    
    if (validateStep()) {
        if(guardianFormDatas)
        {
        setPreview(true)    
        }
      
   
    } else {
      toast.error('Please fill all the required fields correctly before proceeding.');
    }
  };

;

 

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


   if (step ===1) {
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

      if (guardianFormData.gender.trim() === '') {
        errors.gender = 'Gender is required';
        valid = false;
      }
      if (guardianFormData.birthDate.trim() === '') {
        errors.birthDate = 'Relationship is required';
        valid = false;
      }
          if (guardianFormData.address.trim() === '') {
        errors.address = 'Relationship is required';
        valid = false;
      }
      
    }

    setFormErrors(errors);
    return valid;
  };


  return (
    <>
      {preview  ? 
        (
        <GuardianSummary  
        setPreview={setPreview} 
        preview={preview}
        setStep={setStep} 
         guardianFormData={guardianFormData} 
         guardianFormDatas={guardianFormDatas} 
         setGuardianFormData={setGuardianFormData}
         setGuardianFormDatas={setGuardianFormDatas} 
         setNewGuardian={setNewGuardian}
         newGuardian={newGuardian}
         />
      ) : (
        <>
          <Row>



        <Col xs="12" md="6">
          
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Guardian Registration Form
            </CardTitle>
            <CardBody className="">
              <div className="button-group">




              <Form onSubmit={handleSubmit}>
              
               
                  <GuardianInfoForm
                    webcamRef={webcamRef}
                    formData={guardianFormData}
                    formErrors={formErrors}
                    handleGuadianInputChange={handleGuadianInputChange}
                    newGuardian={newGuardian}
                    handleRegisterGuardians={handleRegisterGuardians}
                    handleGuardianImage={handleGuardianImage}
                    handleNext={handleNext}
                    validateStep={validateStep}
                    setRefetchs={setRefetchs}
                    refetchs={refetchs}
                  />
               
                {/* ... other components ... */}
               
              </Form>
              
              </div>
            </CardBody>
          </Card>
        </Col>





        <Col xs="12" md="6">
          
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Guardians
            </CardTitle>
            <CardBody className="">
            <div className="button-group">
             { guardianFormData.image? <Image src={guardianFormData.image} alt="Image description" fluid /> :  
             
             <GuardiansInfo
              refetchs={refetchs} setRefetch={setRefetchs}
             />
                   


              }
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

export default GuardianForm;

