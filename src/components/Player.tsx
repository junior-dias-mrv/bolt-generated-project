import React from 'react';

const Player: React.FC<{ position: number }> = ({ position }) => {
  return (
    <div
      className="w-10 h-10 bg-blue-500 absolute bottom-0"
      style={{ left: `${position}%` }}
    ></div>
  );
};

export default Player;
