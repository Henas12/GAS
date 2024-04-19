// MultiStepForm.js
import React, { useState, useRef } from 'react';
import { Form, Image, ProgressBar,  ButtonGroup,
  Card,
  CardBody,
  CardTitle,Button, Col, Row } from 'react-bootstrap';
import GuardiansInfo from '../../components/Registration/GuardiansInfo';
import GuardianInfoForm from './ParentInfoForm';
import { toast } from 'react-toastify';
const ParentForm = () => {
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
    user_photo_1: null,
    user_photo_2: null,
    user_photo_3: null

  });
    const handleGuardianImage = async () => {
      const response1 = await fetch(guardianFormData.user_photo_1);
      const response2 = await fetch(guardianFormData.user_photo_2);
      const response3 = await fetch(guardianFormData.user_photo_3);

      const blob1 = await response1.blob();
      const blob2 = await response2.blob();
      const blob3 = await response3.blob();
          guardianFormDatas.append('username', guardianFormData.username)

          guardianFormDatas.append('user_photo_1', blob1, 'image1.jpg');
          guardianFormDatas.append('user_photo_2', blob2, 'image2.jpg');
          guardianFormDatas.append('user_photo_3', blob3, 'image3.jpg');          guardianFormDatas.append( 'first_name',guardianFormData.first_name)
          guardianFormDatas.append('last_name', guardianFormData.last_name)
          guardianFormDatas.append('phone_number', guardianFormData.phone_number)
          guardianFormDatas.append('relationship', guardianFormData.relationship)
          guardianFormDatas.append('gender', guardianFormData.gender)
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
        errors.birthDate = 'Birth Date is required';
        valid = false;
      }
          if (guardianFormData.address.trim() === '') {
        errors.address = 'Address is required';
        valid = false;
      }
      
    }

    setFormErrors(errors);
    return valid;
  };


  return (
 
    
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
                    setFormData= {setGuardianFormData}
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
             { guardianFormData.user_photo_1 ?
             (
             
             <div className="mt-2 image-row">
             {guardianFormData.user_photo_1 && (
               <div className="image-item">
                 <strong>Preview 1:</strong>
                 <img src={guardianFormData.user_photo_1} alt="Captured 1" className="img-fluid" />
               </div>
             )}
             {guardianFormData.user_photo_2 && (
               <div className="image-item">
                 <strong>Preview 2:</strong>
                 <img src={guardianFormData.user_photo_2} alt="Captured 2" className="img-fluid" />
               </div>
             )}
             {guardianFormData.user_photo_3 && (
               <div className="image-item">
                 <strong>Preview 3:</strong>
                 <img src={guardianFormData.user_photo_3} alt="Captured 3" className="img-fluid" />
               </div>
             )}
           </div>)
             :  
             
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
    
   
  );
  
  
};

export default ParentForm;

