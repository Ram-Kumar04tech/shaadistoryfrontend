import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import V from '../asserts/entryvideo.mp4';

const Loading = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.onended = () => {
        navigate('/login');
      };
    }
  }, [navigate]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={V} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loading;


