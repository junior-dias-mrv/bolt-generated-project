import React, { useState, useEffect } from 'react';
import Player from './components/Player';
import Invader from './components/Invader';
import Bullet from './components/Bullet';

function App() {
  const [playerPosition, setPlayerPosition] = useState(50);
  const [bullets, setBullets] = useState<{ position: number; top: number }[]>([]);
  const [invaders, setInvaders] = useState<number[]>([10, 30, 50, 70, 90]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPlayerPosition((pos) => Math.max(0, pos - 5));
      } else if (e.key === 'ArrowRight') {
        setPlayerPosition((pos) => Math.min(100, pos + 5));
      } else if (e.key === ' ') {
        setBullets((bullets) => [...bullets, { position: playerPosition, top: 10 }]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((bullets) =>
        bullets
          .map((bullet) => ({ ...bullet, top: bullet.top + 5 }))
          .filter((bullet) => bullet.top < 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkCollisions = () => {
      setBullets((bullets) =>
        bullets.filter((bullet) => {
          const hit = invaders.some((invader) => Math.abs(invader - bullet.position) < 5 && bullet.top > 90);
          if (hit) {
            setInvaders((invaders) => invaders.filter((invader) => Math.abs(invader - bullet.position) >= 5));
          }
          return !hit;
        })
      );
    };

    checkCollisions();
  }, [bullets, invaders]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="relative w-full h-96 bg-black">
        {invaders.map((pos, index) => (
          <Invader key={index} position={pos} />
        ))}
        {bullets.map((bullet, index) => (
          <div
            key={index}
            style={{ left: `${bullet.position}%`, bottom: `${bullet.top}%` }}
            className="absolute"
          >
            <Bullet position={bullet.position} />
          </div>
        ))}
        <Player position={playerPosition} />
      </div>
    </div>
  );
}

export default App;
