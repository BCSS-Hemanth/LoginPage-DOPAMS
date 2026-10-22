/**
 * DOPAMS — Drugs Operational and Prevention Analysis Management System
 * Cinematic Tactical Ambient Animation & Interaction Controller
 * Telangana Police Narcotics Intelligence Portal
 *
 * Notice: This is a frontend-only visual prototype.
 * No real authentication, credential validation, or network submission is performed.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- DOM Element References ---
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('passwordInput');
  const passwordToggleBtn = document.getElementById('passwordToggleBtn');
  const authorizeAccessBtn = document.getElementById('authorizeAccessBtn');
  const loginCard = document.getElementById('loginCard');
  const canvas = document.getElementById('ambientCanvas');

  // ==========================================================================
  // 1. Cinematic Tactical Ambient Floating Particles (HTML Canvas)
  // Soft, drifting atmospheric particles concentrated in darker edges
  // Protected zones: Zero particle rendering over the login panel & Eagle logo
  // ==========================================================================
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId = null;
    let particles = [];
    let isRunning = false;

    // Accessibility check: Prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // ==========================================================================
    // 1. Cinematic Fire Ember Particle Sweep (HTML Canvas)
    // - Location: Extreme right edge of the login screen.
    // - Direction: Particles travel from right to left, drifting toward the center.
    // - Movement: Smooth, natural, slightly curved trajectories with subtle speed variations.
    // - Appearance: Small glowing red, orange, and amber embers with occasional brighter sparks.
    // - Boundary: Protected exclusion zone around login box (strictly zero overlap).
    // - Intensity: Subtle and cinematic, with particles gradually fading as they move left.
    // - Effect: Pure drifting embers; no actual flames, smoke, scan lines, or blinking dots.
    // ==========================================================================

    // Ember color definitions: fiery orange, deep red, warm amber, and hot sparks
    const EMBER_PALETTES = [
      { r: 255, g: 115, b: 20,  isSpark: false, weight: 0.45 }, // Fiery Ember Orange
      { r: 255, g: 45,  b: 28,  isSpark: false, weight: 0.25 }, // Deep Glowing Crimson Red
      { r: 255, g: 180, b: 15,  isSpark: false, weight: 0.20 }, // Warm Golden Amber
      { r: 255, g: 242, b: 195, isSpark: true,  weight: 0.10 }  // Hot Bright Spark
    ];

    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initEmbers();
    }

    class CinematicFireEmber {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        // Location: Extreme right edge of the screen
        // On initial startup, distribute some along the rightward drift path
        if (initial) {
          this.x = width * (0.55 + Math.random() * 0.45);
        } else {
          // Spawn at the extreme right edge
          this.x = width * (0.94 + Math.random() * 0.08);
        }

        // Distributed vertically across screen height with natural buoyancy
        this.y = Math.random() * height;

        // Direction & Movement: travel from right to left with subtle speed variations
        this.speedX = -(0.42 + Math.random() * 0.72);
        this.speedY = -(0.10 + Math.random() * 0.32); // Gentle thermal upward drift

        // Curved trajectory: Sinusoidal wave & subtle curl turbulence
        this.angle = Math.random() * Math.PI * 2;
        this.curlSpeed = 0.010 + Math.random() * 0.016;
        this.curlAmp = 0.20 + Math.random() * 0.50;

        // Appearance: Select ember color palette
        const rand = Math.random();
        let cumulative = 0;
        let selectedPalette = EMBER_PALETTES[0];
        for (const p of EMBER_PALETTES) {
          cumulative += p.weight;
          if (rand <= cumulative) {
            selectedPalette = p;
            break;
          }
        }

        this.color = selectedPalette;
        this.isSpark = selectedPalette.isSpark;

        // Small glowing ember sizes: 0.8px to 2.2px, with bright hot sparks
        const sizeDepth = Math.random();
        if (this.isSpark) {
          this.radius = 0.9 + sizeDepth * 0.65;
          this.baseAlpha = 0.65 + Math.random() * 0.30;
        } else {
          this.radius = 0.8 + sizeDepth * 1.35;
          this.baseAlpha = 0.35 + sizeDepth * 0.45;
        }

        // Lifetime & fading
        this.life = 0;
        this.maxLife = 200 + Math.random() * 180;
        this.alpha = 0;
        this.fadeInSpeed = 0.025;
      }

      update(cardBounds) {
        this.life++;
        this.x += this.speedX;
        this.angle += this.curlSpeed;
        this.y += this.speedY + Math.sin(this.angle) * this.curlAmp;

        // Fade in smoothly upon spawn
        if (this.alpha < this.baseAlpha) {
          this.alpha = Math.min(this.alpha + this.fadeInSpeed, this.baseAlpha);
        }

        // Intensity: Subtle & cinematic, gradually fading as particles move left toward center
        const centerCutoff = width * 0.38; // Completely fades out before reaching left evidence
        const fadeSpan = width * 0.46;
        const leftwardFade = Math.max(0, Math.min(1, (this.x - centerCutoff) / fadeSpan));

        // Lifespan cooling fade-out
        let lifeFade = 1;
        if (this.life > this.maxLife * 0.72) {
          lifeFade = Math.max(0, 1 - (this.life - this.maxLife * 0.72) / (this.maxLife * 0.28));
        }

        let currentAlpha = this.alpha * leftwardFade * lifeFade;

        // Boundary: Strictly protected exclusion zone outside the login box (zero overlap)
        if (cardBounds) {
          const exclusionBuffer = 24; // Exclusion border around login card
          const fadeMargin = 22;      // Smooth edge proximity dissolve

          const cardLeft = cardBounds.left - exclusionBuffer;
          const cardRight = cardBounds.right + exclusionBuffer;
          const cardTop = cardBounds.top - exclusionBuffer;
          const cardBottom = cardBounds.bottom + exclusionBuffer;

          // Inside login box exclusion zone: completely transparent (zero overlap)
          if (
            this.x >= cardLeft &&
            this.x <= cardRight &&
            this.y >= cardTop &&
            this.y <= cardBottom
          ) {
            currentAlpha = 0;
          } else {
            // Proximity fade: smoothly dissolve as particle approaches exclusion zone edge
            const distLeft = cardLeft - this.x;
            const distRight = this.x - cardRight;
            const distTop = cardTop - this.y;
            const distBottom = this.y - cardBottom;

            const minDist = Math.min(
              distLeft > 0 ? distLeft : Infinity,
              distRight > 0 ? distRight : Infinity,
              distTop > 0 ? distTop : Infinity,
              distBottom > 0 ? distBottom : Infinity
            );

            if (minDist < fadeMargin) {
              currentAlpha *= (minDist / fadeMargin);
            }
          }
        }

        // Recycle if moved past center cutoff, offscreen, or lifespan ended
        if (this.x < centerCutoff - 15 || this.y < -30 || this.y > height + 30 || this.life >= this.maxLife) {
          this.reset(false);
        }

        return currentAlpha;
      }

      draw(renderAlpha) {
        if (renderAlpha <= 0.01) return;

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Glowing ember aura
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${renderAlpha * 0.85})`;
        ctx.shadowBlur = this.isSpark ? this.radius * 4.5 : this.radius * 3.2;

        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${renderAlpha})`;
        ctx.fill();

        // Hot center spark for high-intensity sparks
        if (this.isSpark && renderAlpha > 0.25) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${renderAlpha * 0.95})`;
          ctx.shadowColor = '#FFFFFF';
          ctx.shadowBlur = 2;
          ctx.fill();
        }

        ctx.restore();
      }
    }

    function initEmbers() {
      // Density: 52 embers on desktop, 22 on mobile (subtle, cinematic, zero performance impact)
      const count = width < 768 ? 22 : 52;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new CinematicFireEmber());
      }
    }

    function renderLoop() {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      // Measure current login card bounding rect for protected visual exclusion zone
      let cardBounds = null;
      if (loginCard) {
        cardBounds = loginCard.getBoundingClientRect();
      }

      for (let i = 0; i < particles.length; i++) {
        const renderAlpha = particles[i].update(cardBounds);
        particles[i].draw(renderAlpha);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    }

    function startAnimation() {
      if (isRunning || prefersReducedMotion.matches) return;
      isRunning = true;
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    function stopAnimation() {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      ctx.clearRect(0, 0, width, height);
    }

    // Initialize Canvas Dimensions and Particle Pool
    resizeCanvas();
    startAnimation();

    // Responsive Canvas Resize
    window.addEventListener('resize', () => {
      resizeCanvas();
    }, { passive: true });

    // Page Visibility Lifecycle: Pause when tab is hidden to save CPU/battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });

    // Accessibility: Listen for changes in motion preference
    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });
  }

  // ==========================================================================
  // 2. High-Precision Deep Red Target Beacon Alignment
  // Centroid of red circular node in background.jpg (1024x575): x = 360.61px, y = 127.34px
  // ==========================================================================
  const intelRedBeacon = document.getElementById('intelRedBeacon');
  const IMG_NATURAL_W = 1024;
  const IMG_NATURAL_H = 575;
  const IMG_ASPECT = IMG_NATURAL_W / IMG_NATURAL_H; // ~1.78087

  // Exact relative centroid of the red circular node (35.216%, 22.146%)
  const NODE_REL_X = 360.61 / IMG_NATURAL_W;
  const NODE_REL_Y = 127.34 / IMG_NATURAL_H;

  function alignRedBeacon() {
    if (!intelRedBeacon) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const screenAspect = vw / vh;

    let renderW, renderH, offsetX, offsetY;

    if (screenAspect > IMG_ASPECT) {
      // Screen is wider than 16:9 image (cover scales by width)
      renderW = vw;
      renderH = vw / IMG_ASPECT;
      offsetX = 0;
      offsetY = (vh - renderH) / 2;
    } else {
      // Screen is taller than 16:9 image (cover scales by height)
      renderH = vh;
      renderW = vh * IMG_ASPECT;
      offsetX = (vw - renderW) / 2;
      offsetY = 0;
    }

    const posX = offsetX + (renderW * NODE_REL_X);
    const posY = offsetY + (renderH * NODE_REL_Y);

    intelRedBeacon.style.left = `${posX.toFixed(1)}px`;
    intelRedBeacon.style.top = `${posY.toFixed(1)}px`;
    intelRedBeacon.style.display = 'flex';
  }

  alignRedBeacon();
  window.addEventListener('resize', alignRedBeacon, { passive: true });

  // ==========================================================================
  // 3. Password Visibility Toggle
  // ==========================================================================
  if (passwordToggleBtn && passwordInput) {
    passwordToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = passwordInput.getAttribute('type') === 'password';

      if (isPassword) {
        passwordInput.setAttribute('type', 'text');
        passwordToggleBtn.classList.add('showing-password');
        passwordToggleBtn.setAttribute('aria-label', 'Hide password');
        passwordToggleBtn.setAttribute('title', 'Hide password');
      } else {
        passwordInput.setAttribute('type', 'password');
        passwordToggleBtn.classList.remove('showing-password');
        passwordToggleBtn.setAttribute('aria-label', 'Show password');
        passwordToggleBtn.setAttribute('title', 'Show password');
      }

      passwordInput.focus();
    });
  }

  // ==========================================================================
  // 3. Primary Button Visual Feedback (Smooth Hover / Active State)
  // ==========================================================================
  if (authorizeAccessBtn) {
    authorizeAccessBtn.addEventListener('click', (e) => {
      e.preventDefault();

      authorizeAccessBtn.classList.add('btn-pressed');
      authorizeAccessBtn.style.boxShadow = '0 0 28px #00F0FF, inset 0 0 12px rgba(255, 255, 255, 0.85)';

      setTimeout(() => {
        authorizeAccessBtn.classList.remove('btn-pressed');
        authorizeAccessBtn.style.boxShadow = '';
      }, 300);
    });
  }

  // ==========================================================================
  // 4. Form Submission Prevention
  // ==========================================================================
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (authorizeAccessBtn) {
        authorizeAccessBtn.click();
      }
    });
  }
});
