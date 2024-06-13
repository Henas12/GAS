import React, { useState, useRef, useEffect } from 'react';
import { useVideoMutation } from '../../slices/registrationApiSlice';
import '../../video.css';

const VideoRecorder = () => {
  const [video, { isLoading }] = useVideoMutation();

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
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const file = new File([blob], `${formattedDate}.mp4`, { type: 'video/webm' });

    formData.append('file', file);

    try {
      const response = await video(formData);

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

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Check if the current time is 9 PM
    if (currentHour === 21 && currentMinute === 0) {
      // Start recording automatically
      handleStartRecording();

      // Stop recording after 1 minute
      setTimeout(() => {
        handleStopRecording();
        handleSaveRecording();
      }, 60000); // 1 minute (60 seconds * 1000 milliseconds)
    }
  }, []);

  return (
    <div style={{marginTop:"70px"}} className="recording-container">
      <video ref={videoRef} autoPlay className="video-element" />
      <div className="button-container">
        {isRecording ? (
          <button onClick={handleStopRecording} className="stop-button">
            Stop Recording
          </button>
        ) : (
          <button onClick={handleStartRecording} className="start-button">
            Start Recording
          </button>
        )}
        <button onClick={handleSaveRecording} className="save-button">
          Save Recording
        </button>
      </div>
    </div>
  );
};

export default VideoRecorder;
