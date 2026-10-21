import React from 'react';

/**
 * BotanicalSpecimens:
 * Stylized forensic botanical leaves (narcotics/extraction investigation motif).
 * Features subtle organic swaying animations and digital forensic telemetry tags.
 */
export default function BotanicalSpecimens({ parallaxX = 0, parallaxY = 0, isReducedMotion = false }) {
  return (
    <div className="botanical-specimens-layer" aria-hidden="true">
      {/* Botanical Specimen 1: Left Midground Leaf */}
      <div
        className="botanical-leaf-group"
        style={{
          left: '6%',
          top: '32%',
          transform: `translate3d(${parallaxX * 0.3}px, ${parallaxY * 0.3}px, 0)`,
          animation: isReducedMotion ? 'none' : 'leaf-sway 11s ease-in-out infinite',
        }}
      >
        <svg
          className="botanical-leaf-svg"
          width="130"
          height="160"
          viewBox="0 0 130 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="leafGrad" x1="65" y1="10" x2="65" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#047857" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="veinGrad" x1="65" y1="10" x2="65" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5fe1ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Stylized Palmate Leaf Contour */}
          <path
            d="M 65 145
               C 65 110 52 80 20 65
               C 38 60 52 68 62 82
               C 55 52 48 30 65 10
               C 82 30 75 52 68 82
               C 78 68 92 60 110 65
               C 78 80 65 110 65 145 Z"
            fill="url(#leafGrad)"
            stroke="rgba(0, 240, 255, 0.4)"
            strokeWidth="1.2"
          />

          {/* Central Stem & Glowing Forensic Vein */}
          <path
            d="M 65 152 L 65 15"
            stroke="url(#veinGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Lateral veins */}
          <path d="M 65 110 L 40 85" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
          <path d="M 65 110 L 90 85" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
          <path d="M 65 80 L 45 55" stroke="rgba(0, 240, 255, 0.35)" strokeWidth="1" />
          <path d="M 65 80 L 85 55" stroke="rgba(0, 240, 255, 0.35)" strokeWidth="1" />
        </svg>

        {/* Forensic Sample Tag */}
        <div className="botanical-analysis-frame" style={{ top: '80px', left: '75px' }}>
          <span>SPECIMEN #CAN-892</span>
          <div style={{ color: '#10b981', fontSize: '8px', marginTop: '2px' }}>
            ORGANIC EXTRACTION
          </div>
        </div>
      </div>

      {/* Botanical Specimen 2: Upper Central Background Leaf */}
      <div
        className="botanical-leaf-group"
        style={{
          left: '32%',
          top: '12%',
          transform: `translate3d(${parallaxX * 0.2}px, ${parallaxY * 0.2}px, 0) scale(0.75)`,
          animation: isReducedMotion ? 'none' : 'leaf-sway 14s ease-in-out infinite 2s',
          opacity: 0.6,
        }}
      >
        <svg
          className="botanical-leaf-svg"
          width="110"
          height="140"
          viewBox="0 0 130 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 65 145
               C 65 110 52 80 20 65
               C 38 60 52 68 62 82
               C 55 52 48 30 65 10
               C 82 30 75 52 68 82
               C 78 68 92 60 110 65
               C 78 80 65 110 65 145 Z"
            fill="rgba(16, 185, 129, 0.25)"
            stroke="rgba(0, 240, 255, 0.3)"
            strokeWidth="1"
          />
          <path d="M 65 150 L 65 20" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
