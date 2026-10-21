import React, { useEffect, useRef } from 'react';

/**
 * AtmosphereCanvas:
 * Perfectly calibrated forensic animations locked to the physical photo landmarks:
 *
 * Background Image: Restored original forensic laboratory photograph (2048 x 1364, aspect ratio 1.5015)
 *
 * Exact Physical Landmarks:
 * - Dropper Pipette Tip: x = 49.90%, y = 22.65%
 * - Erlenmeyer Flask Rim Opening: x = 21.78%, y = 41.57%
 * - Droplet Impact on Bench: y = 72.95%
 * - Flask Chemical Liquid: x = 20.0% - 24.5%, y = 53.0% - 66.0%
 */

function getImageRenderMetrics(viewportWidth, viewportHeight, imageAspect = 2048 / 1364) {
  const viewportAspect = viewportWidth / viewportHeight;
  let renderWidth, renderHeight, offsetX, offsetY;

  if (viewportAspect > imageAspect) {
    // Viewport is wider than image -> image fills width, overflows top/bottom
    renderWidth = viewportWidth;
    renderHeight = viewportWidth / imageAspect;
    offsetX = 0;
    offsetY = (viewportHeight - renderHeight) / 2;
  } else {
    // Viewport is taller than image -> image fills height, overflows left/right
    renderHeight = viewportHeight;
    renderWidth = viewportHeight * imageAspect;
    offsetX = (viewportWidth - renderWidth) / 2;
    offsetY = 0;
  }

  return {
    renderWidth,
    renderHeight,
    offsetX,
    offsetY,
    toScreenX: (normX) => offsetX + normX * renderWidth,
    toScreenY: (normY) => offsetY + normY * renderHeight,
  };
}

export default function AtmosphereCanvas({
  mouseX = 0,
  mouseY = 0,
  isReducedMotion = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const imageAspect = 2048 / 1364; // 1.501466 (Original Photo Aspect Ratio)

    // Exact landmarks measured from pixels in the 2048 x 1364 image
    const anchorPoints = {
      flaskX: 0.2178,       // Center mouth of Erlenmeyer flask
      flaskY: 0.4157,       // Top rim of Erlenmeyer flask opening
      pipetteX: 0.4990,     // Glass tip of pipette dropper
      pipetteY: 0.2265,     // Droplet beading origin at nozzle
      dropletImpactY: 0.7295, // Bench sample surface directly below dropper
      bubbleStartX: 0.200,  // Flask liquid horizontal center
      bubbleRangeX: 0.040,  // Bubble horizontal span
      bubbleBottomY: 0.660, // Bottom of blue chemical liquid
      bubbleTopY: 0.530,    // Meniscus surface where bubbles pop
    };

    // =========================================================
    // 1. ORGANIC RISING VAPOR & SMOKE PARTICLES
    // Emerges strictly inside the flask opening rim (±6px)
    // =========================================================
    const vaporWisps = [];
    const maxWisps = 55;

    const createVaporWisp = (initialProgress = 0) => {
      const mouthSpreadX = (Math.random() - 0.5) * 10;
      const mouthSpreadY = (Math.random() - 0.5) * 3;

      const maxLife = 240 + Math.random() * 90;
      const life = initialProgress * maxLife;

      return {
        mouthOffsetX: mouthSpreadX,
        mouthOffsetY: mouthSpreadY,
        life: life,
        maxLife: maxLife,
        initialVy: -0.7 - Math.random() * 0.4,
        targetRadius: 60 + Math.random() * 50,
        swaySpeed1: 0.02 + Math.random() * 0.015,
        swaySpeed2: 0.042 + Math.random() * 0.02,
        swayAmp1: 12 + Math.random() * 10,
        swayAmp2: 5 + Math.random() * 5,
        swayPhase1: Math.random() * Math.PI * 2,
        swayPhase2: Math.random() * Math.PI * 2,
        draftSpeed: 0.12 + Math.random() * 0.18,
        maxAlpha: 0.13 + Math.random() * 0.08,
        tone: Math.random() < 0.75 ? 'cyan' : 'blue',
      };
    };

    // Pre-populate smoke
    for (let i = 0; i < maxWisps; i++) {
      vaporWisps.push(createVaporWisp(Math.random()));
    }

    // =========================================================
    // 2. AMBER CHEMICAL DROPLET (Pipette Physics)
    // Beads directly on glass nozzle tip, falls straight down
    // =========================================================
    const dropletState = {
      phase: 'forming', // 'forming' | 'falling' | 'impact' | 'idle'
      timer: 0,
      formDuration: 150, // ~2.5s beading
      radius: 1.0,
      y: 0,
      vy: 0,
      impactRadius: 0,
      impactAlpha: 1,
    };

    // =========================================================
    // 3. FLOATING BLUE PARTICLES & GLOWING DUST
    // =========================================================
    const dustParticles = [];
    const dustCount = 35;

    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.45) * 0.2,
        vy: -0.15 - Math.random() * 0.25,
        alpha: Math.random() * 0.4 + 0.2,
        pulseSpeed: 0.012 + Math.random() * 0.016,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() < 0.85 ? '0, 240, 255' : '130, 220, 255',
      });
    }

    // =========================================================
    // 4. MICRO-BUBBLES IN FLASK LIQUID
    // =========================================================
    const flaskBubbles = [];
    const maxBubbles = 7;

    const createBubble = () => {
      const normX = anchorPoints.bubbleStartX + Math.random() * anchorPoints.bubbleRangeX;
      return {
        normX: normX,
        progress: Math.random(),
        radius: Math.random() * 1.5 + 0.7,
        speed: 0.003 + Math.random() * 0.004,
        wobbleSpeed: 0.06 + Math.random() * 0.04,
        wobbleAmp: 1.2 + Math.random() * 1.2,
        wobblePhase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.3,
      };
    };

    for (let i = 0; i < maxBubbles; i++) {
      flaskBubbles.push(createBubble());
    }

    // =========================================================
    // MAIN RENDER LOOP
    // =========================================================
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      const metrics = getImageRenderMetrics(width, height, imageAspect);
      const parallaxX = (mouseX / width - 0.5) * 6;
      const parallaxY = (mouseY / height - 0.5) * 4;

      const currentFlaskX = metrics.toScreenX(anchorPoints.flaskX);
      const currentFlaskY = metrics.toScreenY(anchorPoints.flaskY);
      const currentPipetteX = metrics.toScreenX(anchorPoints.pipetteX);
      const currentPipetteY = metrics.toScreenY(anchorPoints.pipetteY);
      const currentImpactY = metrics.toScreenY(anchorPoints.dropletImpactY);

      // -------------------------------------------------------
      // A. RENDER VOLUMETRIC CHEMICAL VAPOR / SMOKE
      // -------------------------------------------------------
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < vaporWisps.length; i++) {
        const w = vaporWisps[i];

        if (!isReducedMotion) {
          w.life++;
          if (w.life >= w.maxLife) {
            vaporWisps[i] = createVaporWisp(0);
            continue;
          }
        }

        const progress = w.life / w.maxLife;
        const verticalRise = (w.initialVy * w.life) * (1 - progress * 0.35);

        // Turbulence starts at 0 right at the mouth and develops as it rises
        const turbulenceFactor = Math.min(1, Math.pow(progress, 0.8) * 2.2);
        const sway =
          (Math.sin(time * w.swaySpeed1 + w.swayPhase1) * w.swayAmp1 +
           Math.cos(time * w.swaySpeed2 + w.swayPhase2) * w.swayAmp2) * turbulenceFactor;
        const draft = (w.draftSpeed * w.life * 0.22) * turbulenceFactor;

        const posX = currentFlaskX + w.mouthOffsetX + sway + draft + parallaxX * 0.35;
        const posY = currentFlaskY + w.mouthOffsetY + verticalRise + parallaxY * 0.35;

        const currentRadius = 6 + (w.targetRadius - 6) * Math.pow(progress, 0.7);

        let alpha = 0;
        if (progress < 0.1) {
          alpha = (progress / 0.1) * w.maxAlpha;
        } else if (progress > 0.55) {
          alpha = ((1 - progress) / 0.45) * w.maxAlpha;
        } else {
          alpha = w.maxAlpha;
        }

        const grad = ctx.createRadialGradient(
          posX,
          posY,
          currentRadius * 0.05,
          posX,
          posY,
          currentRadius
        );

        if (w.tone === 'cyan') {
          grad.addColorStop(0, `rgba(220, 250, 255, ${alpha * 1.5})`);
          grad.addColorStop(0.25, `rgba(0, 230, 255, ${alpha * 0.95})`);
          grad.addColorStop(0.55, `rgba(0, 145, 235, ${alpha * 0.4})`);
          grad.addColorStop(0.85, `rgba(0, 60, 160, ${alpha * 0.1})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          grad.addColorStop(0, `rgba(235, 252, 255, ${alpha * 1.6})`);
          grad.addColorStop(0.3, `rgba(110, 210, 255, ${alpha * 0.85})`);
          grad.addColorStop(0.65, `rgba(25, 105, 210, ${alpha * 0.3})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(posX, posY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Soft meniscus glow right at the flask rim
      const rimGlowGrad = ctx.createRadialGradient(
        currentFlaskX + parallaxX * 0.35,
        currentFlaskY + parallaxY * 0.35,
        2,
        currentFlaskX + parallaxX * 0.35,
        currentFlaskY + parallaxY * 0.35,
        20
      );
      rimGlowGrad.addColorStop(0, 'rgba(210, 250, 255, 0.26)');
      rimGlowGrad.addColorStop(0.4, 'rgba(0, 230, 255, 0.15)');
      rimGlowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rimGlowGrad;
      ctx.beginPath();
      ctx.ellipse(
        currentFlaskX + parallaxX * 0.35,
        currentFlaskY + parallaxY * 0.35,
        16,
        6,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();

      // -------------------------------------------------------
      // B. RENDER AMBER DROPLET PRECISELY FROM PIPETTE TIP
      // -------------------------------------------------------
      if (!isReducedMotion) {
        dropletState.timer++;

        const dropX = currentPipetteX + parallaxX * 0.4;

        if (dropletState.phase === 'forming') {
          const formProgress = dropletState.timer / dropletState.formDuration;
          dropletState.radius = 0.8 + formProgress * 2.2;
          const dropY = currentPipetteY + dropletState.radius * 0.75 + parallaxY * 0.4;

          ctx.fillStyle = `rgba(255, 175, 25, ${0.45 + formProgress * 0.5})`;
          ctx.beginPath();
          ctx.arc(dropX, dropY, dropletState.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255, 240, 160, ${0.6 + formProgress * 0.35})`;
          ctx.beginPath();
          ctx.arc(dropX - 0.5, dropY - 0.5, dropletState.radius * 0.35, 0, Math.PI * 2);
          ctx.fill();

          if (dropletState.timer >= dropletState.formDuration) {
            dropletState.phase = 'falling';
            dropletState.y = currentPipetteY + 3;
            dropletState.vy = 0.5;
          }
        } else if (dropletState.phase === 'falling') {
          dropletState.vy += 0.35;
          dropletState.y += dropletState.vy;

          const dropY = dropletState.y + parallaxY * 0.4;

          ctx.fillStyle = 'rgba(255, 185, 30, 0.95)';
          ctx.beginPath();
          ctx.ellipse(dropX, dropY, 2.2, 5.0, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(255, 215, 75, 0.32)';
          ctx.beginPath();
          ctx.arc(dropX, dropY, 6.5, 0, Math.PI * 2);
          ctx.fill();

          if (dropletState.y >= currentImpactY) {
            dropletState.phase = 'impact';
            dropletState.impactRadius = 3;
            dropletState.impactAlpha = 0.85;
          }
        } else if (dropletState.phase === 'impact') {
          dropletState.impactRadius += 1.3;
          dropletState.impactAlpha -= 0.055;

          const impactY = currentImpactY + parallaxY * 0.4;

          ctx.strokeStyle = `rgba(255, 195, 45, ${dropletState.impactAlpha})`;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.ellipse(
            dropX,
            impactY,
            dropletState.impactRadius * 1.9,
            dropletState.impactRadius * 0.65,
            0,
            0,
            Math.PI * 2
          );
          ctx.stroke();

          if (dropletState.impactAlpha <= 0) {
            dropletState.phase = 'idle';
            dropletState.timer = 0;
          }
        } else if (dropletState.phase === 'idle') {
          if (dropletState.timer >= 140) {
            dropletState.phase = 'forming';
            dropletState.timer = 0;
          }
        }
      }

      // -------------------------------------------------------
      // C. RENDER EFFERVESCENT MICRO-BUBBLES IN FLASK LIQUID
      // -------------------------------------------------------
      const startBubbleY = metrics.toScreenY(anchorPoints.bubbleBottomY);
      const endBubbleY = metrics.toScreenY(anchorPoints.bubbleTopY);
      const bubbleHeightSpan = startBubbleY - endBubbleY;

      for (let i = 0; i < flaskBubbles.length; i++) {
        const b = flaskBubbles[i];
        if (!isReducedMotion) {
          b.progress += b.speed;
          if (b.progress >= 1) {
            b.progress = 0;
            b.normX = anchorPoints.bubbleStartX + Math.random() * anchorPoints.bubbleRangeX;
          }
          b.wobblePhase += b.wobbleSpeed;
        }

        const by = startBubbleY - b.progress * bubbleHeightSpan + parallaxY * 0.3;
        const currentBubbleBaseX = metrics.toScreenX(b.normX);
        const bx = currentBubbleBaseX + Math.sin(b.wobblePhase) * b.wobbleAmp + parallaxX * 0.3;

        ctx.fillStyle = `rgba(185, 245, 255, ${b.alpha * (1 - b.progress * 0.3)})`;
        ctx.beginPath();
        ctx.arc(bx, by, b.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(bx - b.radius * 0.3, by - b.radius * 0.3, b.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      // -------------------------------------------------------
      // D. RENDER FLOATING BLUE PARTICLES & GLOWING DUST
      // -------------------------------------------------------
      for (let i = 0; i < dustParticles.length; i++) {
        const d = dustParticles[i];

        if (!isReducedMotion) {
          d.x += d.vx;
          d.y += d.vy;
          d.phase += d.pulseSpeed;

          if (d.y < 0) {
            d.y = height + 4;
            d.x = Math.random() * width;
          }
          if (d.x < 0) d.x = width;
          if (d.x > width) d.x = 0;
        }

        const currentAlpha = (Math.sin(d.phase) * 0.28 + 0.72) * d.alpha;
        const dx = d.x + parallaxX * 0.75;
        const dy = d.y + parallaxY * 0.75;

        ctx.fillStyle = `rgba(${d.color}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(dx, dy, d.radius, 0, Math.PI * 2);
        ctx.fill();

        if (d.radius > 1.2) {
          ctx.fillStyle = `rgba(${d.color}, ${currentAlpha * 0.22})`;
          ctx.beginPath();
          ctx.arc(dx, dy, d.radius * 2.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="smoke-particle-canvas"
      aria-hidden="true"
    />
  );
}
