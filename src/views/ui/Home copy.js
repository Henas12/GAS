import { Card, CardBody, CardTitle,Badge, CardSubtitle, CardText, Button, Form, FormGroup, Input } from 'reactstrap';
import {useState, useContext} from 'react'
import React from 'react'
import * as faceapi from 'face-api.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useVerficationMutation } from '../../slices/guardiansApiSlice';
import { UseDispatch, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from "../../layouts/loader/Loader";
import { useMyContext } from '../../components/MyContext';
import AuthContext from '../../context/AuthContext';
export const Home = () => {

let {user} =  useContext(AuthContext)


  const navigate = useNavigate()
  const { setMyData } = useMyContext();


  const [status, setStatus] = useState(null);
  

const dispatch = useDispatch()
  const [verify, { isLoading }] = useVerficationMutation()
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
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
     
    };

    loadModels();
  }, [status]);

  // const startVideo = () => {

  //   if (inputValue) {
  //   setCaptureVideo(true);

  //   navigator.mediaDevices
  //     .getUserMedia({ video: { width: 300 } })
  //     .then((stream) => {
  //       let video = videoRef.current;
  //       video.srcObject = stream;
  //       video.play();
  //     })
  //     .catch((err) => {
  //       toast.error(err?.data?.message || err.error);
  //     });

  //   }
  //   else{
  //     toast.error('Please fill in the input field');   
  //   }
  // };

  const startVideo = () => {
    if (inputValue) {
      setCaptureVideo(true);
  
      
      const constraints = {
        video: {
          deviceId: {
            exact: 'd20bb8383db1d0d64bd877025e10a886b88be0d003f866e4fa310b9e7c7a3c1d',
          },
          width: 300,
        },
      };

      navigator.mediaDevices.enumerateDevices().then(devices => {
        devices.forEach(device => {
          console.log(device.kind, device.label, device.deviceId);
        });
      });
  
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          toast.error(err?.data?.message || err.error);
        });
    } 
    else {
      toast('Please fill in the input field');
    }
  };

  // const handleVideoOnPlay = () => {
  //   let counter = 0;
  //   setInterval(async () => {
  //     if (canvasRef && canvasRef.current) {
  //       canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
  //       const displaySize = {
  //         width: videoWidth,
  //         height: videoHeight
  //       };
  
  //       faceapi.matchDimensions(canvasRef.current, displaySize);
  //       const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())  
  //       const resizedDetections = faceapi.resizeResults(detections, displaySize);
  //       canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
  //       canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
  //       if (resizedDetections.length > 0) {
  //         counter++;
  //         if (counter === 1) { 
  //           const faceImageDataUrl = await captureDetectedFace(   resizedDetections[0]?.detection);
  //           setDetectedFaceDataURL(faceImageDataUrl);
  //           sendDataToBackend(inputValue, faceImageDataUrl);
  //           closeWebcam();
           
  //         }
  //       }
  //     }
  //   }, 100);
  // };

  const handleVideoOnPlay = () => {
    let counter = 0;
    setInterval(async () => {
      if (videoRef.current && videoRef.current.readyState === 4) { // Check if video is ready
        if (canvasRef && canvasRef.current) {
          canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
          const displaySize = {
            width: videoWidth,
            height: videoHeight
          };
  
          faceapi.matchDimensions(canvasRef.current, displaySize);
          const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())  
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
          canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          if (resizedDetections.length > 0) {
            counter++;
            if (counter === 1) { 
              const faceImageDataUrl = await captureDetectedFace(resizedDetections[0]?.detection);
              setDetectedFaceDataURL(faceImageDataUrl);
              sendDataToBackend(inputValue, faceImageDataUrl);
              closeWebcam();
            }
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
    const response = await fetch(faceImageDataUrl);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('user_photo', blob, 'face_image.jpg');
    try {
      const response = await verify(formData).unwrap()
      console.log('error')
      console.log('error',response)
      setStatus(response.status);
      setMyData(response);
      navigate('/mykid') 
    } catch (error) {    
      toast.error(error?.data.detail);
    }
  };
  
  


    const closeWebcam = () => {
    
    setTimeout(() => {
    
      videoRef.current.pause();
      videoRef.current.srcObject.getTracks()[0].stop();
      setCaptureVideo(false);
   
  }, 2000);}

  return (




<div style={{ display: 'flex', justifyContent: 'center' }}>
  <Card style={{ width: '80%' }}>
    <CardBody>
      <CardTitle className="border-bottom mb-0" style={{fontWeight:"bold", textAlign: 'center' }}> <h2>
                   <Badge color="secondary">Ready To Take Your Kid</Badge>
                </h2></CardTitle>

     


    
      {!captureVideo && (
        <Input
        type="text"
        placeholder="Enter Username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: '250px',border:" 1px solid #CCCCCC", margin: '0 auto', textAlign: 'center', marginTop:"30px" }}
      />
      )}
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {!captureVideo ? (
          <Button onClick={startVideo} 
           color="primary"
           style={{ height: '60px',width: '250px'}}
          >Scan Face</Button>
        ) : (
          <Button onClick={closeWebcam}>Close Webcam</Button>
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
    </CardBody>
  </Card>
</div>



   
    
  


  

 
  );



    // const [formData, setFormData] = useState({
    //   name: '',
    //   image: null,  
    // });
  
    // const handleChange = (e) => {
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
    // };
  
    // const handleFileChange = (e) => {
    //   setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    // };
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
  
    //   try {
    //     const formDataToSend = new FormData();
    //     formDataToSend.append('username', formData.name);
    //     formDataToSend.append('user_photo', formData.image);
    //     console.log(formDataToSend)
    //     const res = await verify(formDataToSend ).unwrap();
    //     console.log(res)
    //     setMyData(res);
    //     navigate(`/mykid/${res.id}`)      
    //     console.log('Backend response:', res);
    //   } catch (error) {
    //     console.log(error)
    //     toast.error(error?.data.error);
    //   }
    // };
  
    // return (

        
     
   
      
    //     <>
    //       <Card style={{ width: '80%' }}>
          
    //       {isLoading? <Loader/> :
    //        ( <CardBody>

            
    //           <Form onSubmit={handleSubmit}>
    //             <label>
    //               Name:
    //               <input type="text" name="name" value={formData.name} onChange={handleChange} />
    //             </label>
    //             <br />
    //      {user.user_id}
    //             <label>
    //               Image:
    //               <input type="file" name="image" onChange={handleFileChange} />
    //             </label>
    //             <br />
               
    //             <Button disabled={isLoading} type="submit">Submit</Button>
    //           </Form>
    //         </CardBody>)}
    //       </Card>
    //     </>

      
 
     

    // );
  };


