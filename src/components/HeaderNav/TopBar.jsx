import React, { useState, useEffect } from 'react';
import { Shield, Activity, Sliders, CheckSquare, Sparkles } from 'lucide-react';

/**
 * TopBar:
 * Official tactical top bar with law enforcement classification notice,
 * system pulse telemetry, motion toggle, and checklist trigger.
 */
export default function TopBar({ isReducedMotion, onToggleReducedMotion, onOpenChecklist }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="top-tactical-header" role="banner">
      {/* Left Branding */}
      <div className="top-left-branding">
        <span className="telangana-emblem-badge">
          <Shield size={13} />
          <span>TELANGANA POLICE</span>
        </span>
        <div className="header-classification">
          <span className="classification-dot" aria-hidden="true" />
          <span>FORENSIC NARCOTICS SURVEILLANCE & ANALYSIS PORTAL</span>
        </div>
      </div>

      {/* Right Telemetry Controls */}
      <div className="top-right-telemetry">
        {/* Live System Time */}
        <div className="telemetry-item" style={{ display: 'none', minWidth: '85px' }}>
          <span>{timeStr}</span>
        </div>

        {/* Operational Status */}
        <div className="telemetry-item" style={{ color: 'var(--emerald-primary)' }}>
          <Activity size={13} />
          <span style={{ fontSize: '10px', letterSpacing: '0.08em' }}>SYS OPERATIONAL</span>
        </div>

        {/* Reduced Motion Toggle Button */}
        <button
          type="button"
          onClick={onToggleReducedMotion}
          className="checklist-toggle-btn"
          style={{
            background: isReducedMotion ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            borderColor: isReducedMotion ? 'var(--cyan-border)' : 'rgba(255, 255, 255, 0.15)',
            color: isReducedMotion ? 'var(--cyan-primary)' : 'var(--text-secondary)',
          }}
          title={isReducedMotion ? 'Enable Full Cinematic Animations' : 'Reduce Motion / Pause Animations'}
          aria-label={isReducedMotion ? 'Enable Full Cinematic Animations' : 'Reduce Motion'}
        >
          <Sliders size={13} />
          <span>{isReducedMotion ? 'Motion: Reduced' : 'Motion: Dynamic'}</span>
        </button>

        {/* Priority Checklist Button */}
        <button
          type="button"
          className="checklist-toggle-btn"
          onClick={onOpenChecklist}
          title="Open Implementation Priority Checklist"
        >
          <CheckSquare size={13} />
          <span>Priority Checklist</span>
        </button>
      </div>
    </header>
  );
}
