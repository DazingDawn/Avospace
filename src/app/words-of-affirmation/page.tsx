'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const affirmations = [
  "You are capable of amazing things! ✨",
  "Your potential is limitless! 🌟",
  "You deserve all the happiness in the world! 💖",
  "You are stronger than you think! 💪",
  "Every day is a fresh start! 🌈",
  "You are worthy of love and respect! 💕",
  "Your dreams are valid and achievable! 🎯",
  "You bring light to the world! ☀️",
  "You are enough, just as you are! 🌸",
  "Your kindness makes a difference! 💝",
  "You are braver than you believe! 🦋",
  "Great things are coming your way! ⭐",
  "You have the power to create change! 🔥",
  "You are loved and appreciated! 💜",
  "Your journey is unique and beautiful! 🌺",
  "You radiate positive energy! ✨",
  "You are a gift to this world! 🎁",
  "Your smile brightens someone's day! 😊",
  "You are growing every single day! 🌱",
  "You have everything you need within you! 💎",
  "You are creating your own success story! 📖",
  "Your presence makes the world better! 🌍",
  "You are resilient and unstoppable! 🚀",
  "You deserve to take up space! 🌟",
  "You are a beautiful soul! 💫",
  "Your future is bright and full of possibilities! 🌈",
  "You are making progress, even if it's small! 🎯",
  "You are surrounded by love! 💖",
  "You have the courage to overcome any challenge! 🦁",
  "You are exactly where you need to be! 🗺️",
];

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function WordsOfAffirmationPage() {
  const router = useRouter();
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate random affirmation
  const generateAffirmation = () => {
    setIsAnimating(true);
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);
    
    // Create sparkles
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < 20; i++) {
      newSparkles.push({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 0.5,
        duration: Math.random() * 1 + 1,
      });
    }
    setSparkles(newSparkles);
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Generate affirmation on mount
  useEffect(() => {
    generateAffirmation();
  }, []);

  return (
    <div className="container-fluid nav-margin bg-light">
      <div className="row">
        <div
          className="col-3 bg-light vh-100 fixed-top sidebar"
          style={{ position: 'fixed', top: '9vh', bottom: 0, overflowY: 'auto' }}
        >
          <ul className="px-4 mt-4 list-unstyled fs-5">
            <li className="py-2" 
                onClick={() => router.push('/home')}
                style={{ cursor: 'pointer' }}>Home</li>
            <li className="py-2" 
                onClick={() => router.push('/home')}
                style={{ cursor: 'pointer' }}>Friends</li>
            <li className="py-2" style={{ cursor: 'pointer' }}>Post</li>
            <li className="py-2">Favorites</li>
            <li className="py-2" 
                onClick={() => router.push('/game')}
                style={{ cursor: 'pointer' }}>Game</li>
            <li className="py-2" 
                onClick={() => router.push('/words-of-affirmation')}
                style={{ cursor: 'pointer', color: '#007bff' }}>Words of Affirmation</li>
          </ul>
        </div>
        <div
          className="col-9"
          style={{
            marginTop: '6vh', 
            marginLeft: '25%', 
            paddingTop: '5vh', 
            height: '91vh', 
            overflowY: 'auto', 
            borderTopLeftRadius: '5vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 15s ease infinite',
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes sparkle {
              0%, 100% { 
                opacity: 0; 
                transform: scale(0) rotate(0deg);
              }
              50% { 
                opacity: 1; 
                transform: scale(1) rotate(180deg);
              }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            .affirmation-card {
              animation: float 3s ease-in-out infinite;
            }
            .sparkle {
              position: absolute;
              pointer-events: none;
            }
            .generate-btn {
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            .generate-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }
            .generate-btn:active {
              transform: translateY(0);
            }
          `}} />
          
          <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', position: 'relative' }}>
            {/* Sparkles overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden' }}>
              {sparkles.map((sparkle) => (
                <div
                  key={sparkle.id}
                  className="sparkle"
                  style={{
                    left: `${sparkle.x}%`,
                    top: `${sparkle.y}%`,
                    width: `${sparkle.size}px`,
                    height: `${sparkle.size}px`,
                    animation: `sparkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
                  }}
                >
                  <span style={{ fontSize: `${sparkle.size}px` }}>✨</span>
                </div>
              ))}
            </div>

            <div className="text-center" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '800px' }}>
              <h1 className="mb-5" style={{ 
                color: 'white', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                fontSize: '3rem',
                fontWeight: 'bold'
              }}>
                ✨ Words of Affirmation ✨
              </h1>
              
              <div 
                className={`card affirmation-card ${isAnimating ? 'pulse' : ''}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '30px',
                  padding: '4rem 3rem',
                  marginBottom: '3rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                  border: 'none',
                  minHeight: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p 
                  style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: '600',
                    color: '#667eea',
                    margin: 0,
                    lineHeight: '1.5',
                    transition: 'all 0.5s ease',
                  }}
                  className={isAnimating ? 'pulse' : ''}
                >
                  {currentAffirmation}
                </p>
              </div>

              <button
                className="btn generate-btn"
                onClick={generateAffirmation}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '1rem 3rem',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                🌟 Get Another Affirmation 🌟
              </button>

              <div className="mt-5">
                <p style={{ color: 'white', fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                  You are amazing! Keep shining! ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

