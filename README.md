# DOPAMS — Drugs Operational and Prevention Analysis Management System
### Telangana Police Narcotics Intelligence Portal — Frontend UI Prototype

A cinematic, responsive, high-contrast intelligence portal login page for **Telangana State Police (Narcotics Enforcement Wing • Eagle Force)**.

---

## 📁 Project Structure

```
login page - V1/
├── assets/
│   ├── images/
│   │   ├── background.jpg          # Original high-resolution investigation desk photo
│   │   └── eagle-force-logo.png    # High-resolution Eagle Force emblem (watermark)
│   └── icons/                      # Interface graphics (embedded SVGs)
├── css/
│   ├── styles.css                  # Design tokens, color palette, glassmorphism, typography
│   ├── animations.css              # Deep red beacon pulse, card border glow, transitions
│   └── responsive.css              # Desktop (>1440px), Laptop, Tablet (768px), Mobile (<768px)
├── js/
│   └── app.js                      # Tactical Canvas ambient particles, beacon positioning, password toggle
├── index.html                      # Semantic HTML5 structure with multi-layer composition
└── README.md                       # Project documentation & execution guide
```

---

## 🎨 Coordinated Cinematic Tactical Ambient Architecture

### Layering Order (Stacking from Background to Viewer)
- **Layer 1 — High-Contrast Background Image & Right-Side Black Gradient**: Original uncompressed investigation desk photo with elevated cinematic contrast (`contrast: 1.36`, `brightness: 1.02`, `saturate: 1.16`, deep obsidian blacks, brilliant specular highlights), combined with a targeted right-side gradient fading into solid black up to the middle of the login box while leaving 100% of left and center evidence crystal clear.
- **Layer 2 — Accurately Aligned Deep Red Beacon**: Centered with mathematical precision on the monitor's circular avatar node (`35.216%, 22.146%`) with intense crimson core, hot pinpoint, and radiating sonar rings.
- **Layer 3 — Cinematic Fire Ember Particle Sweep Canvas (`<canvas id="ambientCanvas">`)**:
  - Originates at the extreme right edge of the screen and drifts from right to left toward the center.
  - Smooth, natural, slightly curved trajectories with subtle speed variations and gentle thermal buoyancy.
  - Small, glowing red (`#FF2D1C`), orange (`#FF7314`), and amber (`#FFB40F`) embers with occasional brighter hot sparks (`#FFF2C3`).
  - **Strict Protected Exclusion Zone**: Zero particle overlap across the login box; particles approaching the login card smoothly dissolve and remain 100% transparent within the card boundary.
  - **Cinematic Intensity**: Subtle atmospheric motion that gradually cools and fades to 0 as particles approach the center, leaving left-side evidence completely clean.
  - **Constraints Enforced**: No actual flames, no smoke, no scanning lines, and no blinking dots.
- **Layer 4 — Panel Border & Controlled Cyan Glow**: Restrained 4.5-second breathing glow around the login card with smooth opacity transitions.
- **Layer 5 — Login Interface**:
  - **Eagle Force Emblem**: Stationary and razor-sharp (`0.45` opacity, static, no pulsing or blurring).
  - **Translucent Glass Inputs**: Frosted navy controls (`rgba(2, 12, 24, 0.72)` with `backdrop-filter: blur(4px)`) allowing the shield emblem to be clearly visible behind the form.
  - **Primary Action Button**: High-contrast cyan button with smooth hover, light sweep sheen, and active click feedback.

---

## 🚀 How to Run & View

### Option 1: Direct File Open
You can open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Brave):
- Double click [index.html](file:///c:/Users/HEMANTH/OneDrive/Desktop/login%20page%20-%20V1/index.html) or right-click > **Open with Chrome**.

### Option 2: Local HTTP Server (Active)
A local server is currently running at:
- **`http://localhost:5500`**
