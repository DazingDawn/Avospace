'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Upgrade {
  id: string;
  name: string;
  cost: number;
  cowsPerSecond: number;
  owned: number;
}

interface SavedGame {
  cows: number;
  clickPower: number;
  upgrades: Upgrade[];
  cowsPerSecond: number;
}

const STORAGE_KEY = 'cowClickerSave';

const defaultUpgrades: Upgrade[] = [
  { id: 'cursor', name: '👋 Cow Hand', cost: 15, cowsPerSecond: 0.1, owned: 0 },
  { id: 'grandma', name: '👨‍🌾 Ranch Hand', cost: 100, cowsPerSecond: 1, owned: 0 },
  { id: 'farm', name: '🌾 Pasture', cost: 1100, cowsPerSecond: 8, owned: 0 },
  { id: 'mine', name: '🥛 Dairy Farm', cost: 12000, cowsPerSecond: 47, owned: 0 },
  { id: 'factory', name: '🧀 Cheese Factory', cost: 130000, cowsPerSecond: 260, owned: 0 },
];

export default function GamePage() {
  const router = useRouter();
  const [cows, setCows] = useState(0);
  const [cowsPerSecond, setCowsPerSecond] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(defaultUpgrades);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved game on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedGame: SavedGame = JSON.parse(saved);
        setCows(savedGame.cows || 0);
        setClickPower(savedGame.clickPower || 1);
        const loadedUpgrades = savedGame.upgrades || defaultUpgrades;
        setUpgrades(loadedUpgrades);
        // Recalculate cows per second from loaded upgrades
        const totalCPS = loadedUpgrades.reduce((sum, upgrade) => 
          sum + (upgrade.cowsPerSecond * upgrade.owned), 0);
        setCowsPerSecond(totalCPS);
      }
    } catch (err) {
      console.error('Error loading saved game:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save game whenever state changes
  useEffect(() => {
    if (isLoaded) {
      const gameState: SavedGame = {
        cows,
        clickPower,
        upgrades,
        cowsPerSecond,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
      } catch (err) {
        console.error('Error saving game:', err);
      }
    }
  }, [cows, clickPower, upgrades, cowsPerSecond, isLoaded]);

  // Auto-clicker effect
  useEffect(() => {
    if (cowsPerSecond > 0) {
      const interval = setInterval(() => {
        setCows(prev => prev + cowsPerSecond);
      }, 100); // Update every 100ms for smoother animation
      return () => clearInterval(interval);
    }
  }, [cowsPerSecond]);

  const handleCowClick = () => {
    setCows(prev => prev + clickPower);
  };

  const buyUpgrade = (upgradeId: string) => {
    setUpgrades(prev => prev.map(upgrade => {
      if (upgrade.id === upgradeId && cows >= upgrade.cost) {
        setCows(prevCows => prevCows - upgrade.cost);
        const newOwned = upgrade.owned + 1;
        const newCost = Math.floor(upgrade.cost * 1.15);
        setCowsPerSecond(prevCPS => prevCPS + upgrade.cowsPerSecond);
        return { ...upgrade, owned: newOwned, cost: newCost };
      }
      return upgrade;
    }));
  };

  const buyClickPower = () => {
    const cost = Math.floor(10 * Math.pow(1.5, clickPower));
    if (cows >= cost) {
      setCows(prev => prev - cost);
      setClickPower(prev => prev + 1);
    }
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all your progress? This cannot be undone!')) {
      setCows(0);
      setCowsPerSecond(0);
      setClickPower(1);
      setUpgrades(defaultUpgrades.map(upgrade => ({ ...upgrade })));
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return Math.floor(num).toString();
  };

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
                style={{ cursor: 'pointer', color: '#007bff' }}>Game</li>
            <li className="py-2" 
                onClick={() => router.push('/words-of-affirmation')}
                style={{ cursor: 'pointer' }}>Words of Affirmation</li>
          </ul>
        </div>
        <div
          className="col-9"
          style={{
            marginTop: '6vh', marginLeft: '25%', paddingTop: '5vh', height: '91vh', overflowY: 'auto', 
            borderTopLeftRadius: '5vh',
          }}
        >
          <div className="container mt-5 pt-4">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <h1 className="text-center mb-4">🐄 Cow Clicker 🐄</h1>
          
                {/* Cow Display */}
                <div className="text-center mb-4">
                  <div 
                    className="d-inline-block"
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={handleCowClick}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'scale(0.95)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div style={{ fontSize: '120px', transition: 'transform 0.1s' }}>
                      🐄
                    </div>
                  </div>
                  <h2 className="mt-3">{formatNumber(cows)} cows</h2>
                  <p className="text-muted">
                    {cowsPerSecond > 0 && (
                      <>+{formatNumber(cowsPerSecond)} cows per second</>
                    )}
                    {cowsPerSecond === 0 && 'Click the cow to start!'}
                  </p>
                  <p className="text-muted">Click power: {clickPower} cows per click</p>
                </div>

                {/* Click Power Upgrade */}
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">⚡ Increase Click Power</h5>
                    <p className="card-text">
                      Current power: {clickPower} cows per click
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={buyClickPower}
                      disabled={cows < Math.floor(10 * Math.pow(1.5, clickPower))}
                    >
                      Buy for {formatNumber(Math.floor(10 * Math.pow(1.5, clickPower)))} cows
                    </button>
                  </div>
                </div>

                {/* Upgrades */}
                <h3 className="mt-4 mb-3">Upgrades</h3>
                <div className="row">
                  {upgrades.map(upgrade => (
                    <div key={upgrade.id} className="col-md-6 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">{upgrade.name}</h5>
                          <p className="card-text">
                            <small className="text-muted">
                              +{upgrade.cowsPerSecond} cows/sec
                            </small>
                            <br />
                            <small>Owned: {upgrade.owned}</small>
                          </p>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => buyUpgrade(upgrade.id)}
                            disabled={cows < upgrade.cost}
                          >
                            Buy for {formatNumber(upgrade.cost)} cows
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">📊 Statistics</h5>
                    <ul className="list-unstyled">
                      <li>Total Cows: {formatNumber(cows)}</li>
                      <li>Cows Per Second: {formatNumber(cowsPerSecond)}</li>
                      <li>Click Power: {clickPower} cows per click</li>
                      <li>Total Upgrades: {upgrades.reduce((sum, u) => sum + u.owned, 0)}</li>
                    </ul>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="card mt-3">
                  <div className="card-body">
                    <h5 className="card-title text-danger">⚠️ Reset Progress</h5>
                    <p className="card-text text-muted">
                      This will permanently delete all your progress. This action cannot be undone!
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={resetProgress}
                    >
                      Reset All Progress
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

