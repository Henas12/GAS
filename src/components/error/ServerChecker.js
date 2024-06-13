import React, { useState, useEffect } from 'react';

const ServerChecker = ({ url, children }) => {
  const [isServerUp, setIsServerUp] = useState(null);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setIsServerUp(true);
        } else {
          throw new Error('Server is down');
        }
      } catch (error) {
        setIsServerUp(false);
      }
    };

    checkServer();
  }, [url]);

  if (isServerUp === null) {
    return <div>Checking server status...</div>;
  }

  if (!isServerUp) {
    return (
      <div>
        <h1>Unable to connect to the server</h1>
        <p>Please check your connection and try again later.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ServerChecker;
