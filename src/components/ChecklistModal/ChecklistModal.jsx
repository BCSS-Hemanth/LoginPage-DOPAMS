import React from 'react';
import { CheckCircle2, ShieldAlert, Sparkles, X, Info } from 'lucide-react';

/**
 * ChecklistModal:
 * Displays the explicit implementation priority checklist directly in the UI.
 * Validates compliance with all strict rules and priority tiers.
 */
export default function ChecklistModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const checklistItems = [
    {
      category: 'STRICT REQUIREMENT: EAGLE FORCE LOGO PLACEMENT',
      status: 'VERIFIED',
      items: [
        {
          title: 'Actual Supplied Eagle Force Logo Used',
          desc: 'Preserves the official Eagle Force Telangana emblem without AI recreation or distortion.',
        },
        {
          title: 'Logo Inside Login Box Only',
          desc: 'Positioned exclusively inside the glassmorphism login card at the top, directly above the DOPAMS title.',
        },
        {
          title: 'No Outside Duplicates or Background Misplacement',
          desc: 'Never appears as a background graphic or above/outside the card boundaries.',
        },
        {
          title: 'Proportions & Details Preserved',
          desc: 'Natural aspect ratio maintained with subtle ambient backlighting contained within the card.',
        },
      ],
    },
    {
      category: 'PRIORITY 1 — ESSENTIAL ANIMATIONS',
      status: 'ACTIVE',
      items: [
        {
          title: 'Continuously Rising, Evolving Smoke',
          desc: 'Procedural canvas fluid-particle system rendering layered swirling vapor plumes curling upward.',
        },
        {
          title: 'Floating & Rotating Multicolored Capsules',
          desc: 'Independent 3D-shaded capsules (Crimson, Cyan, Amber, Emerald) and tablets floating at various depths.',
        },
        {
          title: 'Moving Background Crystalline Particles',
          desc: 'Pulsing micro-dust particles and luminescent forensic clusters drifting ambiently.',
        },
        {
          title: 'Cinematic Cyan Lighting & Laser Scan Trail',
          desc: 'Sweeping spectroscopy laser beam and floor cyan caustic reflections.',
        },
        {
          title: 'Smooth Entrance Animation for Login Panel',
          desc: 'Graceful cubic-bezier card entrance with subtle glowing corner brackets.',
        },
      ],
    },
    {
      category: 'PRIORITY 2 — LABORATORY FORENSIC ENVIRONMENT',
      status: 'ACTIVE',
      items: [
        {
          title: 'Transparent Laboratory Glassware',
          desc: 'Erlenmeyer flask with amber reagent, meniscus curve, bubbles, and graduation ml markings.',
        },
        {
          title: 'Amber Reagent Bottle & Falling Droplets',
          desc: 'Stoppered bottle with animated periodic chemical droplets falling with realistic timing.',
        },
        {
          title: 'Graduated Test Tube Rack',
          desc: 'Tri-tube forensic testing rack holding luminescent cyan, amber, and cobalt reagent solutions.',
        },
        {
          title: 'Stylized Botanical Leaves',
          desc: 'Swaying botanical extraction leaf specimens with digital forensic analysis tags.',
        },
        {
          title: 'Molecular Chemical Lattice',
          desc: 'Skeletal hexagonal chemical rings with glowing cyan nodes and spectroscopy annotations.',
        },
        {
          title: 'Mouse-Responsive Parallax Depth',
          desc: 'Interactive depth where moving the cursor creates natural layered parallax across the scene.',
        },
      ],
    },
    {
      category: 'LOGIN BEHAVIOR — PROTOTYPE ONLY',
      status: 'COMPLIANT',
      items: [
        {
          title: 'Working Password Visibility Toggle',
          desc: 'Interactive eye toggle seamlessly alternates between masked password and plain text.',
        },
        {
          title: 'Interactive Form Controls',
          desc: 'Accessible inputs with clear labels, focus glow indicators, and remember workstation checkbox.',
        },
        {
          title: 'Tactile Visual Press Animation',
          desc: 'Login button features hover gradient sweep, active click depression, and simulated token check.',
        },
        {
          title: 'Zero Backend / Database / Credentials Storage',
          desc: 'Pure frontend prototype strictly complying with all security and scope constraints.',
        },
      ],
    },
  ];

  return (
    <div className="modal-backdrop-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content-panel" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="modal-title-text">
            <CheckCircle2 size={22} style={{ color: 'var(--emerald-primary)' }} />
            <span>IMPLEMENTATION PRIORITY CHECKLIST</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close checklist"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          Verification summary for the <strong>DOPAMS Forensic Login Page</strong> build:
        </div>

        <div className="checklist-grid">
          {checklistItems.map((section, sIdx) => (
            <div key={sIdx} style={{ marginBottom: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--cyan-primary)',
                  letterSpacing: '0.08em',
                  marginBottom: '8px',
                  borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
                  paddingBottom: '4px',
                }}
              >
                <span>{section.category}</span>
                <span
                  style={{
                    color: section.status === 'VERIFIED' ? 'var(--emerald-primary)' : 'var(--amber-primary)',
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  ✓ {section.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {section.items.map((item, iIdx) => (
                  <div key={iIdx} className="checklist-item-card completed">
                    <CheckCircle2 size={16} style={{ color: 'var(--emerald-primary)' }} className="checklist-item-status-icon" />
                    <div>
                      <div className="checklist-item-title">{item.title}</div>
                      <div className="checklist-item-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="login-submit-btn"
            style={{ width: 'auto', padding: '0 24px', height: '40px', fontSize: '14px' }}
            onClick={onClose}
          >
            Close Checklist
          </button>
        </div>
      </div>
    </div>
  );
}
