import React from 'react';

const Invader: React.FC<{ position: number }> = ({ position }) => {
  return (
    <div
      className="w-8 h-8 bg-red-500 absolute"
      style={{ left: `${position}%` }}
    ></div>
  );
};

export default Invader;
