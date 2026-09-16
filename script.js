/* ============================================
   PORTFOLIO - Main JavaScript
   Three.js Particles | Custom Cursor | Scroll Reveals
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // 0. RENDER DYNAMIC CONTENT FROM data.js
  // =====================
  const renderSkills = () => {
    const grid = document.getElementById('skills-grid');
    if (!grid || typeof PORTFOLIO_DATA === 'undefined') return;

    // Also update the stats counter in About section
    const totalSkills = PORTFOLIO_DATA.skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 2) {
      statNumbers[1].textContent = totalSkills + '+';
    }

    grid.innerHTML = PORTFOLIO_DATA.skillCategories.map(category => `
      <div class="skill-category reveal">
        <div class="skill-category-header">
          <div class="skill-category-icon">${category.icon}</div>
          <h3>${category.title}</h3>
        </div>
        ${category.skills.map(skill => `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-percent">${skill.percent}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-fill" data-width="${skill.percent}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('');
  };

  const renderProjects = () => {
    const grid = document.getElementById('projects-grid');
    if (!grid || typeof PORTFOLIO_DATA === 'undefined') return;

    // Also update the stats counter in About section
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 1) {
      statNumbers[0].textContent = PORTFOLIO_DATA.projects.length + '+';
    }

    grid.innerHTML = PORTFOLIO_DATA.projects.map((project, index) => {
      const num = String(index + 1).padStart(2, '0');
      const slug = project.title.toLowerCase().replace(/\s+/g, '-');
      const linkHTML = project.link
        ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link-btn">View Project →</a>`
        : '';

      return `
        <div class="project-card reveal" id="project-${slug}">
          <div class="project-card-glow"></div>
          <div class="project-header">
            <div class="project-number">PROJECT ${num}</div>
            <h3>${project.title}</h3>
          </div>
          <div class="project-body">
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            ${linkHTML}
          </div>
        </div>
      `;
    }).join('');
  };

  // Render data-driven content first
  renderSkills();
  renderProjects();


  // =====================
  // 1. THREE.JS PARTICLE BACKGROUND
  // =====================
  const initParticles = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Create particles ---
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const cyanColor = new THREE.Color(0x00f0ff);
    const purpleColor = new THREE.Color(0x8b5cf6);
    const whiteColor = new THREE.Color(0x444466);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Distribute in a sphere
      const radius = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random color mix
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.3) color = cyanColor;
      else if (colorChoice < 0.5) color = purpleColor;
      else color = whiteColor;

      colors[i3]     = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for glow particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec3 pos = position;

          // Gentle floating motion
          pos.x += sin(uTime * 0.3 + position.y * 0.5) * 0.3;
          pos.y += cos(uTime * 0.2 + position.x * 0.5) * 0.3;
          pos.z += sin(uTime * 0.25 + position.z * 0.3) * 0.2;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * uPixelRatio * (80.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          // Soft circle with glow
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= 0.6;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 12;

    // --- Mouse interaction ---
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // --- Resize handler ---
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- Animation loop ---
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsed;

      // Smooth mouse follow rotation
      targetRotY += (mouseX * 0.3 - targetRotY) * 0.02;
      targetRotX += (mouseY * 0.3 - targetRotX) * 0.02;

      particles.rotation.y = targetRotY + elapsed * 0.05;
      particles.rotation.x = targetRotX;

      renderer.render(scene, camera);
    };

    animate();
  };

  initParticles();


  // =====================
  // 2. CUSTOM CURSOR
  // =====================
  const initCursor = () => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    // Check if touch device
    if ('ontouchstart' in window) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    const animateCursor = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;

      // Ring follows with lag
      ringX += (cursorX - ringX) * 0.12;
      ringY += (cursorY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .skill-category');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  };

  initCursor();


  // =====================
  // 3. NAVBAR SCROLL EFFECT
  // =====================
  const navbar = document.getElementById('navbar');
  const navScrollHandler = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', navScrollHandler);


  // =====================
  // 4. MOBILE MENU
  // =====================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });


  // =====================
  // 5. SCROLL REVEAL ANIMATIONS
  // =====================
  const initRevealAnimations = () => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation slightly
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  };

  initRevealAnimations();


  // =====================
  // 6. SKILL BAR ANIMATION
  // =====================
  const initSkillBars = () => {
    const skillFills = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.getAttribute('data-width');
          // Slight delay for visual effect
          setTimeout(() => {
            fill.style.width = targetWidth + '%';
          }, 300);
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observer.observe(fill));
  };

  initSkillBars();


  // =====================
  // 7. PROJECT CARD GLOW (mouse follow)
  // =====================
  const initCardGlow = () => {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  };

  initCardGlow();


  // =====================
  // 8. SMOOTH SCROLL FOR ANCHOR LINKS
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });


  // =====================
  // 9. HERO CONTENT ENTRANCE ANIMATION
  // =====================
  const initHeroAnimation = () => {
    const badge = document.querySelector('.hero-badge');
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const cta = document.querySelector('.hero-cta');

    const elements = [badge, title, subtitle, cta];

    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.8s ease ${i * 0.15 + 0.3}s, transform 0.8s ease ${i * 0.15 + 0.3}s`;
    });

    // Trigger after a brief moment
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        elements.forEach(el => {
          if (!el) return;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  };

  initHeroAnimation();


  // =====================
  // 10. ACTIVE NAV LINK HIGHLIGHT
  // =====================
  const initActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinksAll.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'var(--accent-cyan)';
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  };

  initActiveNav();


  // =====================
  // 11. PARALLAX ON SCROLL (subtle)
  // =====================
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
        }
        ticking = false;
      });
      ticking = true;
    }
  });

});
