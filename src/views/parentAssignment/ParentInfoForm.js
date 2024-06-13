// GuardianInfoForm.js
import React from 'react';
import { Form, Col, Row, Alert,Button } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Apps from './ParentApp';
import { resetStudent } from "../../slices/studentSlice";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const GuardianInfoForm = ({ webcamRef, formData,newGuardian,setNewGuardian, handleGuardianImage, setRefetchs,refetchs,setFormData,setParentId }) => {
  
  const[openCamera, setOpenCamera]= useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const clearEveryting=()=>{
    dispatch(resetStudent());
    navigate(`/${studentId}/registration_parent`)
  }

  const {id: studentId} = useParams();
  const reserhandle =() =>{

    handleGuardianImage()
    setOpenCamera(true)

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
  <Apps setNewGuardian={setNewGuardian} setRefetch={setRefetchs}  refetchs={refetchs}  setParentId={setParentId}/>

 
    {/* <Button variant="primary"  onClick={fetch}>
      Fetch
    </Button> */}

<div className="d-flex justify-content-between">

<Button variant="primary" onClick={clearEveryting}>
            Register New Parent
            </Button>

            <Button variant="primary" onClick={(()=>
            navigate(`/${studentId}/guardian_registration`))

}>

            
                 Register Guardians
            </Button>
           
          </div>


    
      </>
    )}



    {newGuardian && (
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
        
   

</>)
};

export default GuardianInfoForm;
