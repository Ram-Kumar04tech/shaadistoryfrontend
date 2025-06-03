import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Immediate redirect with 300ms delay for better UX
    const timer = setTimeout(() => {
      window.location.href = 'https://home-seven-steel.vercel.app/';
    }, 300);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="text-center max-w-md px-4">
        <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-6" 
             xmlns="http://www.w3.org/2000/svg" 
             fill="none" 
             viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Taking you to our new platform</h1>
        <p className="text-gray-500 mb-8">You'll be redirected automatically in just a moment...</p>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-indigo-600 h-2.5 rounded-full animate-pulse" style={{width: '45%'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;