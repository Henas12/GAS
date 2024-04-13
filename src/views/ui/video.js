import React, { useState, useRef } from 'react';
import { useVideoMutation } from '../../slices/registrationApiSlice';

const VideoRecorder = () => {
        const [video, {isLoading}] = useVideoMutation()

  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const handleStartRecording = () => {
   
    
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  };

  
  const handleSaveRecording = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const formData = new FormData();
        const renamedBlob = new Blob([blob], { type: blob.type });

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1
        const day = currentDate.getDate();
        
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        const file = new File([blob], `${formattedDate}.mp4`, { type: 'video/webm' });
        

     
        formData.append('file', file);
        
      
        try {
          const response = await video(formData)
      
          if (response.ok) {
            console.log('Video uploaded successfully!');
          } else {
            console.error('Failed to upload video:', response.statusText);
          }
        } catch (error) {
          console.error('Error uploading video:', error.message);
        } finally {
          // Reset chunks
          chunksRef.current = [];
        }
      };
      


  return (
    <div>
      <video ref={videoRef} autoPlay />
      {isRecording ? (
        <button onClick={handleStopRecording}>Stop Recording</button>
      ) : (
        <button onClick={handleStartRecording}>Start Recording</button>
      )}
      <button onClick={handleSaveRecording}>Save Recording</button>
    </div>
  );
};

export default VideoRecorder;






