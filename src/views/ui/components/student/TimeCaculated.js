import React, { useState, useEffect } from 'react';

function TimeAgo({ dateTime }) {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const givenDateTime = new Date(dateTime);
      const currentDateTime = new Date();
      const difference = currentDateTime - givenDateTime;

      if (difference < 60000) { // Less than 1 minute
        setElapsedTime('just now');
      } else if (difference < 3600000) { // Less than 1 hour
        const minutes = Math.floor(difference / 60000);
        setElapsedTime(`${minutes} minute${minutes === 1 ? '' : 's'} ago`);
      } else if (difference < 86400000) { // Less than 1 day
        const hours = Math.floor(difference / 3600000);
        setElapsedTime(`${hours} hour${hours === 1 ? '' : 's'} ago`);
      } else {
        const days = Math.floor(difference / 86400000);
        setElapsedTime(`${days} day${days === 1 ? '' : 's'} ago`);
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [dateTime]);

  return <span>{elapsedTime}</span>;
}

export default TimeAgo;
