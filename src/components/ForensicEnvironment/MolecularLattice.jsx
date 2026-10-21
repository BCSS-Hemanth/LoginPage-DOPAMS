import React from 'react';

/**
 * MolecularLattice:
 * Forensic chemical structure lattice (benzene/dopamine/cannabinoid skeletal structures)
 * with glowing cyan vertices and spectrometry markers.
 */
export default function MolecularLattice({ parallaxX = 0, parallaxY = 0 }) {
  return (
    <div
      className="molecular-lattice-layer"
      style={{
        transform: `translate3d(${parallaxX * 0.15}px, ${parallaxY * 0.15}px, 0)`,
        transition: 'transform 0.2s ease-out',
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexagonal Ring 1 */}
        <polygon
          points="100,80 140,55 180,80 180,125 140,150 100,125"
          stroke="rgba(0, 240, 255, 0.45)"
          strokeWidth="1.5"
          fill="rgba(0, 240, 255, 0.03)"
        />
        {/* Alternating double bonds */}
        <line x1="106" y1="84" x2="136" y2="65" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="1.2" />
        <line x1="174" y1="84" x2="174" y2="121" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="1.2" />
        <line x1="136" y1="140" x2="106" y2="121" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="1.2" />

        {/* Extended Covalent Branch */}
        <line x1="180" y1="80" x2="225" y2="55" stroke="rgba(0, 240, 255, 0.45)" strokeWidth="1.5" />
        <line x1="225" y1="55" x2="270" y2="80" stroke="rgba(0, 240, 255, 0.45)" strokeWidth="1.5" />
        <line x1="270" y1="80" x2="315" y2="55" stroke="rgba(0, 240, 255, 0.45)" strokeWidth="1.5" />
        <text x="325" y="60" fill="#00f0ff" fontSize="10" fontFamily="var(--font-mono)">NH₂</text>

        {/* Hydroxyl branches */}
        <line x1="100" y1="80" x2="65" y2="60" stroke="rgba(255, 170, 0, 0.5)" strokeWidth="1.5" />
        <text x="42" y="62" fill="#ffd066" fontSize="9" fontFamily="var(--font-mono)">OH</text>
        <line x1="100" y1="125" x2="65" y2="145" stroke="rgba(255, 170, 0, 0.5)" strokeWidth="1.5" />
        <text x="42" y="152" fill="#ffd066" fontSize="9" fontFamily="var(--font-mono)">OH</text>

        {/* Glowing Vertices Nodes */}
        {[
          [100, 80],
          [140, 55],
          [180, 80],
          [180, 125],
          [140, 150],
          [100, 125],
          [225, 55],
          [270, 80],
        ].map(([x, y], idx) => (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r="3"
            fill="#00f0ff"
            style={{ filter: 'drop-shadow(0 0 5px #00f0ff)' }}
          />
        ))}

        {/* Forensic Telemetry Notation */}
        <text x="140" y="185" fill="#5a738e" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em">
          MOLECULAR SPECTRA: C₈H₁₁NO₂
        </text>
        <text x="140" y="200" fill="#00f0ff" fontSize="8" fontFamily="var(--font-mono)" opacity="0.75">
          PURITY INDEX: 99.82% // GC-MS VERIFIED
        </text>
      </svg>
    </div>
  );
}
