
import React, { useState,useRef } from 'react';
import Webcam from 'react-webcam';

import { Form, Image,ProgressBar, Button, Col, Row, Alert } from 'react-bootstrap';
function ImageCapture({formData, setFormData}) {



    const webcamRef = useRef(null);
    const handleCaptureImage = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setFormData({ ...formData, image: imageSrc });
    };
  return (
    
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

  );
}

export default ImageCapture;
