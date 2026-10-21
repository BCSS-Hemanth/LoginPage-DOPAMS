/**
 * DOPAMS — Drugs Operational and Prevention Analysis Management System
 * Frontend Visual Interaction Controller
 * Telangana Police Narcotics Intelligence Portal
 *
 * Notice: This is a frontend-only visual prototype.
 * No real authentication, credential validation, or network submission is performed.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Element References ---
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('passwordInput');
  const passwordToggleBtn = document.getElementById('passwordToggleBtn');
  const authorizeAccessBtn = document.getElementById('authorizeAccessBtn');
  const intelTargetBeacon = document.getElementById('intelTargetBeacon');

  // ==========================================================================
  // 1. Precise Red Threat Beacon Coordinate Alignment
  // Aligns the beacon directly onto the red target node in the intelligence monitor (x: 353, y: 127 in 1024x575 image)
  // ==========================================================================
  const IMG_NATURAL_W = 1024;
  const IMG_NATURAL_H = 575;
  const IMG_ASPECT = IMG_NATURAL_W / IMG_NATURAL_H; // ~1.78087

  // Exact relative coordinate of the red node in the original photo
  const NODE_REL_X = 353 / IMG_NATURAL_W; // 34.47%
  const NODE_REL_Y = 127 / IMG_NATURAL_H; // 22.09%

  function alignRedBeacon() {
    if (!intelTargetBeacon) return;

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

    intelTargetBeacon.style.left = `${posX.toFixed(1)}px`;
    intelTargetBeacon.style.top = `${posY.toFixed(1)}px`;
    intelTargetBeacon.style.display = 'flex';
  }

  // Initial alignment and reactive update on resize
  alignRedBeacon();
  window.addEventListener('resize', alignRedBeacon, { passive: true });

  // ==========================================================================
  // 2. Password Visibility Toggle
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
  // 3. Primary Button Visual Feedback
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
