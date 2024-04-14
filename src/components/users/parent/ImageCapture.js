
import React, { useState,useRef } from 'react';
import Webcam from 'react-webcam';

import { Form, Image,ProgressBar, Button, Col, Row, Alert } from 'react-bootstrap';
function ImageCapture({formData, setFormData}) {

  

   
  const webcamRef = useRef(null);


  const handleCaptureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    if (!formData.user_photo_1) {
      setFormData({ ...formData, user_photo_1: imageSrc });
      console.log('hena1')
    } else if (!formData.user_photo_2) {
      setFormData({ ...formData, user_photo_2: imageSrc });
      console.log('hena1')
    } else if (!formData.user_photo_3) {
      setFormData({ ...formData, user_photo_3: imageSrc });
      console.log('hena1')
    }
  };

  return (
    <Form.Group controlId="formStep2">
      <Form.Label>Take Pictures</Form.Label>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="mb-2"
        style={{ height: '400px', width: '100%' }} // Adjust the height and width as needed
      />
      <div className="mt-2">
        <Button variant="primary" onClick={handleCaptureImage}>
          Capture Image
        </Button>
        {formData.user_photo_1 && (
          <div className="mt-2">
            <strong>Preview 1:</strong>
            <img src={formData.user_photo_1} alt="Captured 1" className="img-fluid" />
          </div>
        )}
        {formData.user_photo_2 && (
          <div className="mt-2">
            <strong>Preview 2:</strong>
            <img src={formData.user_photo_2} alt="Captured 2" className="img-fluid" />
          </div>
        )}
        {formData.user_photo_3 && (
          <div className="mt-2">
            <strong>Preview 3:</strong>
            <img src={formData.user_photo_3} alt="Captured 3" className="img-fluid" />
          </div>
        )}
      </div>
    </Form.Group>
  );
}

export default ImageCapture;
