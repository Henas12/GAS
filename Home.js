import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Form, FormGroup, Input } from 'reactstrap';
import {useState} from 'react'
import React from 'react'
import * as faceapi from 'face-api.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useVerficationMutation } from '../../slices/guardiansApiSlice';
import { UseDispatch, useDispatch } from 'react-redux';
export const Home = () => {

  const videoRef = React.useRef();
  const canvasRef = React.useRef();
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [detectedFaceDataURL, setDetectedFaceDataURL] = React.useState(null);
  const [faceImageDataBlob, setFaceImageDataBlob] = React.useState(null);
  
  const [inputValue, setInputValue] = React.useState(null);


  const videoHeight = 480;
  const videoWidth = 640;

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    loadModels();
  }, []);

  const startVideo = () => {

    if (inputValue) {
    setCaptureVideo(true);

    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        toast.error(err?.data?.message || err.error);
      });

    }
    else{
      toast('Please fill in the input field');   
    }
  };

  const handleVideoOnPlay = () => {
    let counter = 0;
  
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        };
  
        faceapi.matchDimensions(canvasRef.current, displaySize);
  
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
  
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
  
        if (resizedDetections.length > 0) {
          counter++;
          if (counter === 1) {
            
            const faceImageDataUrl = await captureDetectedFace(   resizedDetections[0]?.detection);
            console.log(faceImageDataUrl)
            setDetectedFaceDataURL(faceImageDataUrl);
            // setFaceImageDataBlob(faceImageDataUrl)
            sendDataToBackend(inputValue, faceImageDataUrl);
            closeWebcam();
           
          }
        }
      }
    }, 100);
  };

  const captureDetectedFace = async (detection) => {
    if (!detection || !detection.box) {
        return null; // Handle undefined or missing data
    }

    const margin = 40; // You can adjust the margin as needed

    const canvas = document.createElement('canvas');
    const { x, y, width, height } = detection.box;

    // Add margin to the bounding box
    const extendedX = Math.max(0, x - margin);
    const extendedY = Math.max(0, y - margin);
    const extendedWidth = Math.min(videoWidth, width + 2 * margin);
    const extendedHeight = Math.min(videoHeight, height + 2 * margin);

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

    const imageData = context.getImageData(extendedX, extendedY, extendedWidth, extendedHeight);

    canvas.width = extendedWidth;
    canvas.height = extendedHeight;
    context.putImageData(imageData, 0, 0);

    const faceImageDataUrl = canvas.toDataURL();
    return faceImageDataUrl;
};

  const sendDataToBackend = async (username, faceImageDataUrl) => {
    console.log(faceImageDataUrl)
    const response = await fetch(faceImageDataUrl);
    const blob = await response.blob();

    // Create FormData and append the image blob
    const formData = new FormData();
    formData.append('username', username);
    formData.append('user_photo', blob, 'face_image.jpg');
    
 
    try {
      // Make a POST request to your Django backend
      const response = await axios.post('http://10.42.0.61:8000/verify/', formData
 
 
      )

      console.log(response)

      

      // console.log('Backend response:', response.data);
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };
  
  


    const closeWebcam = () => {
    
    setTimeout(() => {
    
      videoRef.current.pause();
      videoRef.current.srcObject.getTracks()[0].stop();
      setCaptureVideo(false);
   
  }, 2000);}

  return (
<>



<Card style={{ width: '80%' }}>   
     <CardBody>
          <CardTitle tag="h5">Ready To Take  Yout Kid </CardTitle>
          
         
         {!captureVideo &&
      
              
            <Input
                type="text"
                placeholder="Enter Username"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

           
}
          <div>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {!captureVideo ? (
          <Button
            onClick={startVideo}  
          >
           Scan Your Face
          </Button>
        ) : (
          <Button
            onClick={closeWebcam}
            
          >
            Close Webcam
          </Button>
        )}
      </div>
      {captureVideo && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
          <video ref={videoRef} onPlay={handleVideoOnPlay} width={videoWidth} height={videoHeight} />
          <canvas ref={canvasRef} style={{ position: 'absolute' }} />
        </div>
      )}
      {detectedFaceDataURL && (
        <div style={{ textAlign: 'center' }}>
          <h2>Detected Face</h2>
          <img src={detectedFaceDataURL} alt="Detected Face" style={{ maxWidth: '100%' }} />
        </div>
      )}


{faceImageDataBlob && (
        <div>
          <img src={URL.createObjectURL(faceImageDataBlob)} alt="Detected Face" />
          
        </div>
      )}
   

    </div>

        </CardBody>
      </Card>
   
    
  


  

    </>
  );
}


// const dispatch = useDispatch()
//   const [verify, { isLoading }] = useVerficationMutation()



//     const [formData, setFormData] = useState({
//       name: '',
//       image: null,  // Use null to represent no file initially
//     });
  
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleFileChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       try {


//         const formDataToSend = new FormData();
//         formDataToSend.append('username', formData.name);
//         formDataToSend.append('user_photo', formData.image);
//         console.log(formDataToSend)
//         const res = await verify(formDataToSend ).unwrap();

        
//         console.log('Backend response:', res);
//       } catch (error) {
//         console.error('Error sending data to the backend:', error);
//       }
//     };
  
//     return (
//       <Card style={{ width: '80%' }}>   
//      <CardBody>
//       <Form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Image:
//           <input type="file" name="image" onChange={handleFileChange} />
//         </label>
//         <br />
//         <Button type="submit">Submit</Button>
//       </Form>
// </CardBody>
//        </Card >   

  //   );
  // };




























