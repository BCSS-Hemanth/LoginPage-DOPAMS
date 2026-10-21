import React, { useState, useEffect } from 'react';
import AtmosphereCanvas from './AtmosphereCanvas';

/**
 * ForensicEnvironment:
 * Incorporates the high-resolution forensic laboratory photograph with realistic organic animations:
 *
 * 1. Realistic Organic Blue Vapor: Billowing from the flask neck in a smooth loop.
 * 2. Floating Blue Dust Particles: Subtle, continuous high-tech atmosphere.
 * 3. Falling Amber Chemical Droplet: Periodic gravity drop from pipette nozzle.
 * 4. Micro-Bubbles: Effervescent chemical activity inside the flask.
 * 5. Glass Reflections & Liquid Surface Pulses: Gentle blue & amber highlights.
 * 6. Surveillance CCTV Tally Blinker: Authentic subtle surveillance presence.
 */
export default function ForensicEnvironment({ isReducedMotion = false }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId;

    const handleMouseMove = (e) => {
      targetX = e.clientX - window.innerWidth / 2;
      targetY = e.clientY - window.innerHeight / 2;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const updateParallax = () => {
      // Gentle damping for subtle 3D depth without causing image zoom
      currentX += (targetX - currentX) * 0.035;
      currentY += (targetY - currentY) * 0.035;
      setParallax({ x: currentX, y: currentY });
      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isReducedMotion]);

  return (
    <div className="forensic-environment-viewport" aria-hidden="true">
      {/* =========================================================
          1. RESTORED FORENSIC LABORATORY BACKGROUND PHOTOGRAPH
          ========================================================= */}
      <div
        className="forensic-photo-bg-layer"
        style={{
          transform: isReducedMotion
            ? 'none'
            : `translate3d(${parallax.x * 0.006}px, ${parallax.y * 0.006}px, 0)`,
          transition: 'transform 0.12s ease-out',
        }}
      >
        <img
          src="/forensic-main-bg.jpg"
          alt="Forensic Laboratory Environment"
          className="forensic-lab-bg-img"
          loading="eager"
        />
      </div>

      {/* =========================================================
          2. GENTLE GLASS REFLECTIONS & LIQUID HIGHLIGHTS
          ========================================================= */}
      {/* Gentle Blue Chemiluminescence over Erlenmeyer Flask Liquid */}
      <div
        className="flask-liquid-blue-pulse"
        style={{
          transform: `translate3d(${parallax.x * 0.012}px, ${parallax.y * 0.012}px, 0)`,
        }}
      />

      {/* Glass Specular Sheen across the Flask Surface */}
      <div
        className="flask-glass-specular-sheen"
        style={{
          transform: `translate3d(${parallax.x * 0.015}px, ${parallax.y * 0.015}px, 0)`,
        }}
      />

      {/* Gentle Amber Highlight over Reagent Bottle */}
      <div
        className="amber-bottle-liquid-pulse"
        style={{
          transform: `translate3d(${parallax.x * 0.01}px, ${parallax.y * 0.01}px, 0)`,
        }}
      />

      {/* Blue Reflection Caustics on the Table Bench */}
      <div
        className="table-bench-blue-caustic"
        style={{
          transform: `translate3d(${parallax.x * 0.007}px, ${parallax.y * 0.007}px, 0)`,
        }}
      />

      {/* CCTV Camera Blinking Surveillance Indicator LED */}
      <div
        className="cctv-tally-blinker"
        style={{
          transform: `translate3d(${parallax.x * 0.009}px, ${parallax.y * 0.009}px, 0)`,
        }}
      />

      {/* Surveillance Monitor Telemetry Scanline Sweep */}
      <div
        className="surveillance-monitor-scanline"
        style={{
          transform: `translate3d(${parallax.x * 0.008}px, ${parallax.y * 0.008}px, 0)`,
        }}
      />

      {/* =========================================================
          3. REAL-TIME CANVAS SMOKE, DROPLETS & BLUE PARTICLES
          ========================================================= */}
      <AtmosphereCanvas
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        isReducedMotion={isReducedMotion}
      />

      {/* =========================================================
          4. SUBTLE ATMOSPHERIC VIGNETTE
          ========================================================= */}
      <div className="photo-atmospheric-overlay" />
    </div>
  );
}
