import React from 'react';

/**
 * FloatingCapsules:
 * 3D-shaded multicolored pharmaceutical capsules and forensic tablets.
 * They float at distinct depths with varying rotations, floating trajectories, and specular reflections.
 * Explicitly arranged across the laboratory environment outside the login card.
 */
export default function FloatingCapsules({ parallaxX = 0, parallaxY = 0, isReducedMotion = false }) {
  // Capsule definitions with varying colors, depths, sizes, and animation styles
  const capsules = [
    {
      id: 'cap-1',
      theme: 'theme-crimson-white',
      width: 24,
      height: 58,
      left: '12%',
      top: '28%',
      depth: 0.9,
      rotation: '28deg',
      animName: 'float-gentle-1',
      animDuration: '7.2s',
      animDelay: '0s',
      blur: '0px',
    },
    {
      id: 'cap-2',
      theme: 'theme-cyan-navy',
      width: 20,
      height: 50,
      left: '26%',
      top: '16%',
      depth: 0.65,
      rotation: '-42deg',
      animName: 'float-gentle-2',
      animDuration: '8.5s',
      animDelay: '1.2s',
      blur: '0.5px',
    },
    {
      id: 'cap-3',
      theme: 'theme-amber-gold',
      width: 28,
      height: 66,
      left: '42%',
      top: '34%',
      depth: 1.1,
      rotation: '65deg',
      animName: 'float-gentle-3',
      animDuration: '6.8s',
      animDelay: '0.4s',
      blur: '0px',
    },
    {
      id: 'cap-4',
      theme: 'theme-emerald-white',
      width: 18,
      height: 44,
      left: '8%',
      top: '58%',
      depth: 0.55,
      rotation: '-18deg',
      animName: 'float-gentle-1',
      animDuration: '9.4s',
      animDelay: '2.1s',
      blur: '1px',
    },
    {
      id: 'cap-5',
      theme: 'theme-crimson-white',
      width: 22,
      height: 52,
      left: '34%',
      top: '64%',
      depth: 0.8,
      rotation: '35deg',
      animName: 'float-gentle-2',
      animDuration: '7.8s',
      animDelay: '1.8s',
      blur: '0px',
    },
    {
      id: 'cap-6',
      theme: 'theme-cyan-navy',
      width: 16,
      height: 38,
      left: '52%',
      top: '20%',
      depth: 0.45,
      rotation: '-55deg',
      animName: 'float-gentle-3',
      animDuration: '10.2s',
      animDelay: '3.1s',
      blur: '1.5px',
    },
  ];

  // Round forensic tablets
  const tablets = [
    {
      id: 'tab-1',
      size: 26,
      left: '18%',
      top: '42%',
      depth: 0.75,
      color: '#00f0ff',
      gradient: 'radial-gradient(circle at 35% 35%, #5fe1ff 0%, #0088cc 80%, #004466 100%)',
      animName: 'float-gentle-2',
      animDuration: '8.2s',
      animDelay: '0.6s',
    },
    {
      id: 'tab-2',
      size: 32,
      left: '38%',
      top: '18%',
      depth: 0.95,
      color: '#fbbf24',
      gradient: 'radial-gradient(circle at 35% 35%, #fef08a 0%, #d97706 80%, #78350f 100%)',
      animName: 'float-gentle-1',
      animDuration: '6.4s',
      animDelay: '1.5s',
    },
  ];

  return (
    <div className="floating-capsules-layer" aria-hidden="true">
      {/* 3D Cylindrical Capsules */}
      {capsules.map((c) => {
        const px = parallaxX * c.depth * 0.8;
        const py = parallaxY * c.depth * 0.8;

        return (
          <div
            key={c.id}
            className={`capsule-item-3d ${c.theme}`}
            style={{
              width: `${c.width}px`,
              height: `${c.height}px`,
              left: c.left,
              top: c.top,
              filter: `blur(${c.blur})`,
              transform: `translate3d(${px}px, ${py}px, 0) rotate(${c.rotation})`,
              animation: isReducedMotion ? 'none' : `${c.animName} ${c.animDuration} ease-in-out infinite ${c.animDelay}`,
            }}
          >
            {/* Top Hemisphere */}
            <div className="capsule-half-top">
              <div className="capsule-sheen-highlight" />
            </div>
            {/* Bottom Hemisphere */}
            <div className="capsule-half-bottom">
              <div className="capsule-sheen-highlight" />
            </div>
          </div>
        );
      })}

      {/* Round Tablets */}
      {tablets.map((t) => {
        const px = parallaxX * t.depth * 0.7;
        const py = parallaxY * t.depth * 0.7;

        return (
          <div
            key={t.id}
            className="round-pill-item-3d"
            style={{
              width: `${t.size}px`,
              height: `${t.size}px`,
              left: t.left,
              top: t.top,
              background: t.gradient,
              boxShadow: `0 8px 20px rgba(0, 0, 0, 0.7), 0 0 12px ${t.color}33`,
              transform: `translate3d(${px}px, ${py}px, 0)`,
              animation: isReducedMotion ? 'none' : `${t.animName} ${t.animDuration} ease-in-out infinite ${t.animDelay}`,
            }}
          />
        );
      })}
    </div>
  );
}
