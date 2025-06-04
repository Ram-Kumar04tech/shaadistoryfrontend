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
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        padding: '10px',
        boxSizing: 'border-box'
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: '90%',
          maxWidth: '500px',
          height: 'auto',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <source src={V} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loading;

