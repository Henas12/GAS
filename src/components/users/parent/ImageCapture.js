
import React, { useState,useRef } from 'react';
import Webcam from 'react-webcam';

import { Form, Image,ProgressBar, Button, Col, Row, Alert } from 'react-bootstrap';
function ImageCapture({formData, setFormData, setSubmit}) {

  
  const [prompt, setPrompt] = useState('Take Picture 1');

  const webcamRef = useRef(null);

  const handleCaptureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
   

    if (formData.user_photo_1 === null) {
      setFormData(prevState => ({ ...prevState, user_photo_1: imageSrc }));
      setPrompt('Take Picture 2');
    } else if (formData.user_photo_2 === null) {
      setFormData(prevState => ({ ...prevState, user_photo_2: imageSrc }));
      setPrompt('Take Picture 3');
    } else if (formData.user_photo_3 === null) {
      setFormData(prevState => ({ ...prevState, user_photo_3: imageSrc }));
      setSubmit(true)
    } else {
      console.log('All images captured.');
    }
  };

  const handleRetakeImages = () => {
    setSubmit(false)

    setFormData({
      user_photo_1: null,
      user_photo_2: null,
      user_photo_3: null
    });
  };

  return (
    <Form.Group controlId="formStep2">
    
      <div className="d-flex justify-content-between align-items-center p-3">
      
          <Button variant="primary" onClick={handleCaptureImage}>
            Capture Image
          </Button>
          <div>
       <h6> {prompt}  </h6>  
        </div>
          <Button variant="secondary" onClick={handleRetakeImages}>
            Retake Images
          </Button>
        
      </div>
      <div className="webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="mb-2"
          style={{ padding: 0, margin: 0, height: '80%', width: '90%' }} // Adjust the height and width as needed
        />
      </div>
      <div className="mt-2 image-row">
        {formData.user_photo_1 && (
          <div className="image-item">
            <strong>Preview 1:</strong>
            <img src={formData.user_photo_1} alt="Captured 1" className="img-fluid" />
          </div>
        )}
        {formData.user_photo_2 && (
          <div className="image-item">
            <strong>Preview 2:</strong>
            <img src={formData.user_photo_2} alt="Captured 2" className="img-fluid" />
          </div>
        )}
        {formData.user_photo_3 && (
          <div className="image-item">
            <strong>Preview 3:</strong>
            <img src={formData.user_photo_3} alt="Captured 3" className="img-fluid" />
          </div>
        )}
      </div>
    </Form.Group>
  );
}

export default ImageCapture;