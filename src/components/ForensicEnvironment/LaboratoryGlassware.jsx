import React from 'react';

/**
 * LaboratoryGlassware:
 * High-detail transparent forensic laboratory apparatus:
 * 1. Large Erlenmeyer flask with amber/gold chemical reagent, active bubbling meniscus, graduation lines, and vapor neck.
 * 2. Amber chemical reagent bottle with glass ground stopper and occasional falling droplet.
 * 3. Rack of 3 graduated test tubes with luminescent cyan, amber, and cobalt forensic testing solutions.
 * 4. Specular glass reflections, meniscus curve, and caustic reflections.
 */
export default function LaboratoryGlassware({ parallaxX = 0, parallaxY = 0 }) {
  return (
    <div
      className="glassware-stage-container"
      style={{
        transform: `translate3d(${parallaxX * 0.4}px, ${parallaxY * 0.4}px, 0)`,
        transition: 'transform 0.15s ease-out',
      }}
      aria-hidden="true"
    >
      <div className="glassware-apparatus-group">
        
        {/* =========================================================
            1. LARGE ERLENMEYER FLASK (Main Forensic Reagent)
            ========================================================= */}
        <div className="glass-unit-wrapper" style={{ width: '220px', height: '330px' }}>
          <svg
            viewBox="0 0 220 330"
            width="220"
            height="330"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.75))' }}
          >
            <defs>
              {/* Amber Reagent Fluid Gradient */}
              <linearGradient id="erlenFluidGrad" x1="0" y1="180" x2="0" y2="310" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffb300" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#ff8c00" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#cc5200" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#802b00" stopOpacity="0.95" />
              </linearGradient>

              {/* Meniscus Glow */}
              <linearGradient id="meniscusGlow" x1="45" y1="180" x2="175" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffea75" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ffea75" stopOpacity="0.4" />
              </linearGradient>

              {/* Glass Rim Highlight */}
              <linearGradient id="glassRim" x1="0" y1="20" x2="220" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.7" />
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#00f0ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
              </linearGradient>

              {/* Glass Body Shading & Reflections */}
              <linearGradient id="erlenGlassSheen" x1="30" y1="20" x2="190" y2="310" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="25%" stopColor="#00f0ff" stopOpacity="0.1" />
                <stop offset="60%" stopColor="#00f0ff" stopOpacity="0.03" />
                <stop offset="90%" stopColor="#ffffff" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* Ambient liquid glow behind flask */}
            <circle cx="110" cy="245" r="75" fill="#ff9900" opacity="0.16" filter="blur(25px)" />

            {/* Amber Liquid Fill with Meniscus */}
            <path
              d="M 58 185
                 Q 110 190 162 185
                 L 194 295
                 Q 197 310 180 310
                 L 40 310
                 Q 23 310 26 295
                 Z"
              fill="url(#erlenFluidGrad)"
            />

            {/* Liquid Meniscus Curve Highlight */}
            <ellipse cx="110" cy="185" rx="52" ry="7" fill="url(#meniscusGlow)" opacity="0.85" />
            <path
              d="M 58 185 Q 110 191 162 185"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Rising Micro-Bubbles in Fluid */}
            <g className="erlenmeyer-bubbles">
              <circle cx="95" cy="275" r="2.5" fill="#fff" opacity="0.7">
                <animate attributeName="cy" values="275;190" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.8;0" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="125" cy="290" r="3" fill="#ffea75" opacity="0.8">
                <animate attributeName="cy" values="290;192" dur="3.5s" repeatCount="indefinite" begin="0.8s" />
                <animate attributeName="opacity" values="0;0.9;0" dur="3.5s" repeatCount="indefinite" begin="0.8s" />
              </circle>
              <circle cx="110" cy="255" r="2" fill="#fff" opacity="0.6">
                <animate attributeName="cy" values="255;188" dur="2.2s" repeatCount="indefinite" begin="1.4s" />
                <animate attributeName="opacity" values="0;0.7;0" dur="2.2s" repeatCount="indefinite" begin="1.4s" />
              </circle>
              <circle cx="140" cy="270" r="2.5" fill="#fff" opacity="0.75">
                <animate attributeName="cy" values="270;195" dur="3.1s" repeatCount="indefinite" begin="1.9s" />
                <animate attributeName="opacity" values="0;0.8;0" dur="3.1s" repeatCount="indefinite" begin="1.9s" />
              </circle>
            </g>

            {/* Graduation Markings (ml) */}
            <g stroke="#ffffff" strokeWidth="1.2" opacity="0.65">
              {/* 200ml */}
              <line x1="124" y1="205" x2="148" y2="205" />
              <text x="154" y="208" fill="#fff" fontSize="8" fontFamily="var(--font-mono)" opacity="0.8">200ml</text>
              {/* 150ml */}
              <line x1="130" y1="230" x2="158" y2="230" />
              <text x="164" y="233" fill="#fff" fontSize="8" fontFamily="var(--font-mono)" opacity="0.8">150ml</text>
              {/* 100ml */}
              <line x1="138" y1="255" x2="168" y2="255" />
              <text x="174" y="258" fill="#fff" fontSize="8" fontFamily="var(--font-mono)" opacity="0.8">100ml</text>
              {/* 50ml */}
              <line x1="145" y1="280" x2="178" y2="280" />
              <text x="184" y="283" fill="#fff" fontSize="8" fontFamily="var(--font-mono)" opacity="0.8">50ml</text>
            </g>

            {/* Glass Outline & Form */}
            {/* Lip / Rim at top */}
            <ellipse cx="110" cy="22" rx="26" ry="6" stroke="url(#glassRim)" strokeWidth="2.5" fill="rgba(0, 240, 255, 0.08)" />
            {/* Neck & Body */}
            <path
              d="M 88 24
                 L 88 95
                 L 22 295
                 Q 18 312 36 312
                 L 184 312
                 Q 202 312 198 295
                 L 132 95
                 L 132 24"
              stroke="rgba(0, 240, 255, 0.55)"
              strokeWidth="2"
              fill="url(#erlenGlassSheen)"
            />

            {/* Specular Curved Reflection along left flank */}
            <path
              d="M 94 40
                 L 94 92
                 L 40 285"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Secondary right reflection */}
            <path
              d="M 126 50
                 L 126 90
                 L 175 270"
              stroke="rgba(0, 240, 255, 0.7)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>
        </div>

        {/* =========================================================
            2. AMBER REAGENT BOTTLE WITH DROPPER MECHANISM
            ========================================================= */}
        <div className="glass-unit-wrapper" style={{ width: '160px', height: '280px' }}>
          {/* Falling chemical droplet */}
          <div className="falling-droplet" style={{ left: '80px' }} />

          <svg
            viewBox="0 0 160 280"
            width="160"
            height="280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 12px 28px rgba(0, 0, 0, 0.8))' }}
          >
            <defs>
              {/* Deep Amber Reagent Bottle */}
              <linearGradient id="amberBottleGlass" x1="15" y1="50" x2="145" y2="260" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffb700" stopOpacity="0.45" />
                <stop offset="40%" stopColor="#b45309" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#78350f" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#451a03" stopOpacity="0.98" />
              </linearGradient>

              {/* Forensic Label Gradient */}
              <linearGradient id="forensicLabelGrad" x1="30" y1="130" x2="130" y2="210" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0a182e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#040c19" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Glass Stopper at Top */}
            <path
              d="M 68 12
                 L 92 12
                 Q 98 25 94 40
                 L 66 40
                 Q 62 25 68 12
                 Z"
              fill="rgba(0, 240, 255, 0.2)"
              stroke="rgba(0, 240, 255, 0.6)"
              strokeWidth="1.5"
            />
            {/* Stopper Handle */}
            <ellipse cx="80" cy="12" rx="14" ry="5" fill="rgba(0, 240, 255, 0.3)" stroke="#fff" strokeWidth="1" />

            {/* Bottle Neck */}
            <rect
              x="66"
              y="40"
              width="28"
              height="30"
              fill="url(#amberBottleGlass)"
              stroke="rgba(0, 240, 255, 0.4)"
              strokeWidth="1.5"
            />

            {/* Bottle Body */}
            <rect
              x="25"
              y="70"
              width="110"
              height="180"
              rx="14"
              fill="url(#amberBottleGlass)"
              stroke="rgba(0, 240, 255, 0.45)"
              strokeWidth="1.8"
            />

            {/* Liquid Level Meniscus inside bottle */}
            <path
              d="M 28 100 Q 80 106 132 100"
              stroke="#ffea75"
              strokeWidth="2"
              opacity="0.75"
            />

            {/* Tactical Forensic Label on Bottle */}
            <rect
              x="36"
              y="125"
              width="88"
              height="75"
              rx="4"
              fill="url(#forensicLabelGrad)"
              stroke="rgba(0, 240, 255, 0.3)"
              strokeWidth="1"
            />
            {/* Label Content */}
            <text x="44" y="142" fill="#00f0ff" fontSize="8" fontWeight="bold" fontFamily="var(--font-display)" letterSpacing="0.1em">DOPAMS LAB</text>
            <text x="44" y="154" fill="#9cb1c9" fontSize="6.5" fontFamily="var(--font-mono)">REAGENT SOL. B-7</text>
            <text x="44" y="166" fill="#ffd066" fontSize="6" fontFamily="var(--font-mono)">CAS: 50-37-3</text>
            <line x1="44" y1="172" x2="116" y2="172" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.8" />
            <text x="44" y="184" fill="#5a738e" fontSize="5.5" fontFamily="var(--font-mono)">SECURE SPECIMEN</text>

            {/* Specular Highlight Streak */}
            <rect x="32" y="80" width="5" height="155" rx="2.5" fill="#fff" opacity="0.4" />
          </svg>
        </div>

        {/* =========================================================
            3. FORENSIC TEST TUBE RACK (Cyan, Amber, Cobalt Reagents)
            ========================================================= */}
        <div className="glass-unit-wrapper" style={{ width: '180px', height: '260px' }}>
          <svg
            viewBox="0 0 180 260"
            width="180"
            height="260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 10px 24px rgba(0, 0, 0, 0.7))' }}
          >
            <defs>
              {/* Tube 1: Cyan Luminescent Solution */}
              <linearGradient id="tubeCyan" x1="0" y1="80" x2="0" y2="210" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#0077b6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#023e8a" stopOpacity="0.95" />
              </linearGradient>

              {/* Tube 2: Restrained Amber Solution */}
              <linearGradient id="tubeAmber" x1="0" y1="100" x2="0" y2="210" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffb700" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#d97706" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#78350f" stopOpacity="0.95" />
              </linearGradient>

              {/* Tube 3: Deep Cobalt Forensic Solution */}
              <linearGradient id="tubeCobalt" x1="0" y1="60" x2="0" y2="210" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#2563eb" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Rack Metal Stand */}
            <rect x="15" y="110" width="150" height="6" rx="2" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1" />
            <rect x="15" y="220" width="150" height="10" rx="3" fill="rgba(15, 23, 42, 0.95)" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
            <rect x="22" y="116" width="6" height="104" fill="rgba(15, 23, 42, 0.8)" stroke="rgba(0, 240, 255, 0.25)" />
            <rect x="152" y="116" width="6" height="104" fill="rgba(15, 23, 42, 0.8)" stroke="rgba(0, 240, 255, 0.25)" />

            {/* --- Test Tube 1 (Cyan Solution) --- */}
            <g transform="translate(38, 30)">
              {/* Glass body */}
              <rect x="0" y="0" width="22" height="180" rx="11" fill="rgba(0, 240, 255, 0.05)" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1.2" />
              {/* Liquid fill */}
              <path d="M 1 65 L 21 65 L 21 170 Q 21 179 11 179 Q 1 179 1 170 Z" fill="url(#tubeCyan)" />
              {/* Meniscus */}
              <ellipse cx="11" cy="65" rx="10" ry="2.5" fill="#a5f3fc" opacity="0.9" />
              {/* Specular */}
              <line x1="4" y1="15" x2="4" y2="165" stroke="#fff" strokeWidth="1.2" opacity="0.5" />
            </g>

            {/* --- Test Tube 2 (Amber Solution) --- */}
            <g transform="translate(78, 30)">
              {/* Glass body */}
              <rect x="0" y="0" width="22" height="180" rx="11" fill="rgba(255, 170, 0, 0.05)" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1.2" />
              {/* Liquid fill */}
              <path d="M 1 85 L 21 85 L 21 170 Q 21 179 11 179 Q 1 179 1 170 Z" fill="url(#tubeAmber)" />
              {/* Meniscus */}
              <ellipse cx="11" cy="85" rx="10" ry="2.5" fill="#fde68a" opacity="0.9" />
              {/* Specular */}
              <line x1="4" y1="15" x2="4" y2="165" stroke="#fff" strokeWidth="1.2" opacity="0.5" />
            </g>

            {/* --- Test Tube 3 (Cobalt Solution) --- */}
            <g transform="translate(118, 30)">
              {/* Glass body */}
              <rect x="0" y="0" width="22" height="180" rx="11" fill="rgba(0, 240, 255, 0.05)" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1.2" />
              {/* Liquid fill */}
              <path d="M 1 45 L 21 45 L 21 170 Q 21 179 11 179 Q 1 179 1 170 Z" fill="url(#tubeCobalt)" />
              {/* Meniscus */}
              <ellipse cx="11" cy="45" rx="10" ry="2.5" fill="#bae6fd" opacity="0.9" />
              {/* Specular */}
              <line x1="4" y1="15" x2="4" y2="165" stroke="#fff" strokeWidth="1.2" opacity="0.5" />
            </g>
          </svg>
        </div>

      </div>
    </div>
  );
}
