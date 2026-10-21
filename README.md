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
│   ├── animations.css              # Live intelligence network, scan beam, ambient lighting, border glow
│   └── responsive.css              # Desktop (>1440px), Laptop, Tablet (768px), Mobile (<768px)
├── js/
│   └── app.js                      # Password toggle, checkbox interaction, button feedback, subtle parallax
├── index.html                      # Semantic HTML5 structure
└── README.md                       # Project documentation & execution guide
```

---

## 🎨 Asset Composition & Design System

1. **Full-Screen Background (`assets/images/background.jpg`)**:
   - The original, uncompressed, crystal-clear investigation desk scene.
   - Highlights the Telangana Police cap, seized evidence, forensic materials, and the upper intelligence monitors.
   - Preserved with subtle cinematic drift and gentle scale animation (Animation A).

2. **Eagle Force Watermark (`assets/images/eagle-force-logo.png`)**:
   - The authentic Eagle Force shield emblem centered directly inside the login card behind the input form.
   - Calibrated opacity (`0.12`) to remain distinct and recognizable without interfering with text contrast or input accessibility.

3. **Recreated Glassmorphic Login Card**:
   - Deep navy glass backdrop (`rgba(3, 17, 32, 0.90)`) with backdrop blur (`14px`).
   - Restrained cyan outer breathing glow (`@keyframes cardGlowBreath`).
   - Clean, high-contrast typography using Google Fonts (`Orbitron` for heading, `Rajdhani` for tactical labels/buttons, `Inter` for clean inputs).
   - High-contrast inputs (`rgba(2, 13, 25, 0.94)`) with cyan glow on focus.

4. **Live Intelligence HUD Overlay**:
   - Scaled SVG overlay aligned over the digital monitor.
   - Pulsing cyan & blue nodes, data stream dashed lines, and a central red threat core emitting expanding sonar rings.
   - Vertical cyan laser scanner beam (`scan-beam`).

5. **Interactions**:
   - **Password Visibility Toggle**: Interactive show/hide toggle switching password masking and eye icons.
   - **Remember Checkbox**: Custom animated cyan checkmark.
   - **Authorize System Access Button**: Cyber-styled primary button with light sheen sweep and active click feedback (strictly frontend; prevents page reload).
   - **Mouse Parallax**: Smooth, subtle (±3.5px) depth motion on desktop pointer movement (auto-disabled on touch devices and when `prefers-reduced-motion` is enabled).

---

## 🚀 How to Run & View

### Option 1: Direct File Open
You can open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Brave):
- Double click [index.html](file:///c:/Users/HEMANTH/OneDrive/Desktop/login%20page%20-%20V1/index.html) or right-click > **Open with Chrome**.

### Option 2: Local HTTP Server (Active)
A local server is currently running at:
- **`http://localhost:5500`**
