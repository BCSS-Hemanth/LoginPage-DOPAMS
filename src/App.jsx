import React, { useState } from 'react';
import ForensicEnvironment from './components/ForensicEnvironment/ForensicEnvironment';
import LoginCard from './components/LoginCard/LoginCard';
import { Sliders } from 'lucide-react';

export default function App() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  return (
    <div className="dopams-app-container">
      {/* Discreet Motion Control in Top-Right */}
      <aside className="top-motion-control-wrapper" aria-label="Display Controls">
        <button
          type="button"
          onClick={() => setIsReducedMotion((prev) => !prev)}
          className="subtle-motion-toggle-btn"
          title={isReducedMotion ? 'Enable Dynamic Motion' : 'Reduce Motion'}
          aria-label={isReducedMotion ? 'Enable Dynamic Motion' : 'Reduce Motion'}
        >
          <Sliders size={13} />
          <span>{isReducedMotion ? 'Motion: Off' : 'Motion: Dynamic'}</span>
        </button>
      </aside>

      {/* Outside Cinematic Forensic Animated Environment (Glassware, Smoke, Droplets, Refractions) */}
      <ForensicEnvironment isReducedMotion={isReducedMotion} />

      {/* Main Layout Stage with Login Card on Right */}
      <main className="main-layout-stage">
        {/* Open laboratory visualization space across left and center */}
        <div className="lab-open-stage-area" aria-hidden="true" />

        {/* Right Glassmorphism Login Card with Eagle Force Emblem in Background */}
        <LoginCard />
      </main>
    </div>
  );
}
