# ⚡ Dulam Anvesh Goud | AI & ML Engineer Portfolio

A responsive, cyber-minimalist personal portfolio website built to showcase my expertise in Artificial Intelligence, Machine Learning, Prompt Engineering, and Vibe Coding. 

The site features an interactive 3D particle background, custom cursor mechanics, and dynamic content rendering, ensuring a seamless and modern user experience.

## ✨ Key Features
* **Dynamic Content Engine:** All skills, categories, and projects are rendered dynamically from a single `data.js` configuration file, making updates instant and effortless.
* **Interactive 3D Background:** Implements Three.js for a responsive, mouse-tracking WebGL particle system.
* **Cyber-Minimalist UI/UX:** Dark mode by default, featuring custom properties for neon accents, glassmorphism effects, and scroll-reveal animations.
* **Custom Cursor Tracking:** A lagging ring and dot cursor mechanic that reacts to interactive elements.
* **Fully Responsive:** Fluid layouts built with CSS Grid and Flexbox, optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Libraries:** [Three.js](https://threejs.org/) (for 3D particle rendering)
* **Architecture:** Component-free dynamic rendering via DOM manipulation
* **Design System:** Custom CSS variables, JetBrains Mono & Inter fonts

## 📁 Project Structure
```text
📦 portfolio-website
 ┣ 📜 index.html    # Main HTML structure and metadata
 ┣ 📜 style.css     # Styling, animations, and responsive breakpoints
 ┣ 📜 script.js     # Three.js setup, scroll observers, and UI interactions
 ┗ 📜 data.js       # JSON-like object storing all portfolio content
