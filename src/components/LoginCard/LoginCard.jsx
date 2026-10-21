import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Radio,
  CheckCircle,
} from 'lucide-react';

/**
 * LoginCard:
 * Clean, translucent glassmorphism login panel.
 *
 * SPECIFICATIONS:
 * - Eagle Force photo in the BACKGROUND of the login box (watermark emblem).
 * - "DOPAMS" title at the top.
 * - Field 1: "Username / Mail ID"
 * - Field 2: "Password" with working visibility toggle
 * - Checkbox: "Remember"
 * - Removed: Subtitles, department badges, prototype disclaimer notice, and telemetry footer.
 */
export default function LoginCard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isVerifying) return;

    // Visual Prototype Login Simulation
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setLoginSuccess(true);
      setTimeout(() => setLoginSuccess(false), 3000);
    }, 900);
  };

  return (
    <div className="login-stage-column">
      <div className="login-card-glass" role="region" aria-label="DOPAMS Login">
        {/* =========================================================
            EAGLE FORCE PHOTO IN BACKGROUND OF THE LOGIN BOX
            ========================================================= */}
        <div className="card-bg-watermark-wrapper" aria-hidden="true">
          <img
            src="/eagle-force-logo-transparent.png"
            alt=""
            className="card-bg-watermark-img"
            loading="eager"
          />
        </div>

        {/* Subtle glowing corner accents */}
        <div className="card-corner-accent top-left" aria-hidden="true" />
        <div className="card-corner-accent top-right" aria-hidden="true" />
        <div className="card-corner-accent bottom-left" aria-hidden="true" />
        <div className="card-corner-accent bottom-right" aria-hidden="true" />
        <div className="card-top-glow-line" aria-hidden="true" />

        {/* =========================================================
            CARD FOREGROUND CONTENT
            ========================================================= */}
        <div className="card-foreground-content">
          {/* Header Section: DOPAMS Title */}
          <div className="card-header-section" style={{ marginBottom: '28px' }}>
            <h1 className="dopams-system-title">
              DOPAMS
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleFormSubmit} className="login-form-container" noValidate>
            {/* Username / Mail ID Field */}
            <div className="form-field-group">
              <label htmlFor="dopams-username" className="form-field-label">
                <span>Username / Mail ID</span>
              </label>
              <div className="input-shell-container">
                <span className="input-lead-icon" aria-hidden="true">
                  <User size={18} />
                </span>
                <input
                  id="dopams-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username or Mail ID"
                  className="forensic-text-input"
                />
              </div>
            </div>

            {/* Password Field with Working Visibility Toggle */}
            <div className="form-field-group">
              <label htmlFor="dopams-password" className="form-field-label">
                <span>Password</span>
              </label>
              <div className="input-shell-container">
                <span className="input-lead-icon" aria-hidden="true">
                  <Lock size={18} />
                </span>
                <input
                  id="dopams-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="forensic-text-input"
                />
                {/* Working Password Visibility Toggle */}
                <button
                  type="button"
                  id="password-visibility-toggle"
                  onClick={handleTogglePassword}
                  className="password-toggle-btn"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Options Row: Remember & Forgot Password */}
            <div className="form-options-row">
              <label className="remember-session-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="remember-session-checkbox"
                />
                <span>Remember</span>
              </label>

              <button
                type="button"
                className="terminal-help-link"
                onClick={() => alert('Password Recovery:\nPlease contact the system administrator to reset your credentials.')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Action Button */}
            <button
              type="submit"
              id="dopams-login-button"
              className="login-submit-btn"
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <Radio size={18} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : loginSuccess ? (
                <>
                  <CheckCircle size={19} style={{ color: '#010a14' }} />
                  <span>Access Granted</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={19} />
                  <span>Authorize System Access</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
