
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse bg-google-blue"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-google-red [animation-delay:0.2s]"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-google-yellow [animation-delay:0.4s]"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-google-green [animation-delay:0.6s]"></div>
    </div>
  );
};

export default Spinner;
