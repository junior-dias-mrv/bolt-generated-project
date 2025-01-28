import React from 'react';

const Bullet: React.FC<{ position: number }> = ({ position }) => {
  return (
    <div
      className="w-2 h-4 bg-yellow-500 absolute"
      style={{ left: `${position}%`, bottom: '10%' }}
    ></div>
  );
};

export default Bullet;
