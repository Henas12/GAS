// ImageCaptureForm.js
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Webcam from 'react-webcam';

const ImageCaptureForm = ({ formData, handleCaptureImage, handleNext, webcamRef}) => (
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
      <Button variant="primary" onClick={() => { handleCaptureImage() }}>
        Capture Image & Next
      </Button>

      
    </Form.Group>
  </>
);

export default ImageCaptureForm;
