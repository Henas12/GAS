// MultiStepForm.js
import React, { useState, useRef } from 'react';
import { Form, Image, ProgressBar,  ButtonGroup,
  Card,
  CardBody,
  CardTitle,Button, Col, Row } from 'react-bootstrap';
import GuardiansInfo from '../../components/Registration/GuardiansInfo';
import GuardianInfoForm from './ParentInfoForm';
import { useNewParentAssignMutation } from '../../slices/registrationApiSlice';
import { toast } from 'react-toastify';
const ParentForm = () => {
  const [step, setStep] = useState(1);
  const[parentId, setParentId] = useState(false)

  const [parentAssign, {isLaodng}]  = useNewParentAssignMutation()
  const [guardianFormDatas, setGuardianFormDatas] = useState(new FormData());
  const [guardianFormData, setGuardianFormData] = useState({
   
 
    user_photo_1: null,
    user_photo_2: null,
    user_photo_3: null

  });

  
  const [newGuardian, setNewGuardian] = useState(false);
  const [refetchs, setRefetchs] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const webcamRef = useRef(null);

    const handleGuardianImage = async () => {
      const response1 = await fetch(guardianFormData.user_photo_1);
      const response2 = await fetch(guardianFormData.user_photo_2);
      const response3 = await fetch(guardianFormData.user_photo_3);

      const blob1 = await response1.blob();
      const blob2 = await response2.blob();
      const blob3 = await response3.blob();
          guardianFormDatas.append('parent_id', parentId)

          guardianFormDatas.append('user_photo_1', blob1, 'image1.jpg');
          guardianFormDatas.append('user_photo_2', blob2, 'image2.jpg');
          guardianFormDatas.append('user_photo_3', blob3, 'image3.jpg');   
          
          
try{




          const res = await parentAssign(guardianFormDatas).unwrap();
        
          setNewGuardian(false)
          setGuardianFormDatas(new FormData())
          toast.success('Parent is Activated')
     
   
        } catch (err) {
          
          toast.error(err?.detail) 
          toast.error(err?.data?.message || (err.data?.username?err.data?.username[0]:`${err?.data?.detail}`));
        }
      
      }
  

  
  




  






 

  const handleGuadianInputChange = (event) => {
    const { name, value } = event.target;
    setGuardianFormData({ ...guardianFormData, [name]: value });
    // Clear the error message when the user starts typing in the field
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    
    
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
                    
                    newGuardian={newGuardian}
                    setNewGuardian={setNewGuardian}
                    handleGuardianImage={handleGuardianImage}
                  
                   
                   
                    setRefetchs={setRefetchs}
                    refetchs={refetchs}
                    setFormData= {setGuardianFormData}
                    setParentId= {setParentId}
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

