/* ============================================
   PORTFOLIO - Full-Page Scroll Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // 1. RENDER DATA
  // =====================
  const renderProjects = () => {
    const container = document.getElementById('projects-container');
    const projectCount = document.getElementById('project-count');
    if (!container || typeof PORTFOLIO_DATA === 'undefined') return;

    if (projectCount) {
      projectCount.textContent = PORTFOLIO_DATA.projects.length + '+';
    }

    container.innerHTML = PORTFOLIO_DATA.projects.map((project, index) => {
      const linkBtn = project.link
        ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View Project</a>`
        : '';

      // Give the first project an ID so navigation can link to it
      const sectionId = index === 0 ? 'id="projects-start"' : '';

      const workflowHtml = project.workflow && project.workflow.length > 0
        ? `<div class="workflow-diagram">
             <h4 class="workflow-title">Project Workflow</h4>
             ${project.workflow.map(step => `<div class="workflow-step">${step}</div>`).join('<div class="workflow-arrow">↓</div>')}
           </div>`
        : '';

      return `
        <section class="section project-fullscreen" ${sectionId}>
          <div class="container project-fs-grid reveal">
            <div class="project-fs-info">
              <span class="project-fs-label">Featured Project 0${index + 1}</span>
              <h2 class="project-fs-title">${project.title}</h2>
              <p class="project-fs-desc">${project.description}</p>
              
              <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
              </div>
              
              <div style="z-index: 10;">
                ${linkBtn}
              </div>
            </div>
            <div class="project-fs-visual glass-card">
              ${workflowHtml}
            </div>
          </div>
        </section>
      `;
    }).join('');
  };

  const renderSkills = () => {
    const grid = document.getElementById('skills-grid');
    if (!grid || typeof PORTFOLIO_DATA === 'undefined') return;

    const skillIcon = `<svg class="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

    grid.innerHTML = PORTFOLIO_DATA.skillCategories.map(category => `
      <div class="glass-card skill-category reveal">
        <h3 class="skill-cat-title">${category.title}</h3>
        <div class="skill-list">
          ${category.skills.map(skill => `
            <div class="skill-item">
              ${skillIcon}
              <span class="skill-name">${skill.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  };

  renderProjects();
  renderSkills();


  // =====================
  // 2. SCROLL REVEAL ANIMATIONS (Intersection Observer on fullpage-container)
  // =====================
  const initRevealAnimations = () => {
    const reveals = document.querySelectorAll('.reveal');
    // For fullpage scroll, we observe based on the scroll container
    const scrollContainer = document.getElementById('fullpage-container');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: window.innerWidth > 768 ? scrollContainer : null,
      threshold: 0.15
    });

    reveals.forEach(el => observer.observe(el));

    // Trigger immediately for hero elements
    setTimeout(() => {
      document.querySelectorAll('.hero .reveal').forEach((el, index) => {
        setTimeout(() => el.classList.add('active'), index * 100);
        observer.unobserve(el);
      });
    }, 50);
  };

  initRevealAnimations();

  // =====================
  // 3. MOUSE TRACKING GLOW
  // =====================
  const initMouseTracking = () => {
    const handleOnMouseMove = e => {
      const { currentTarget: target } = e;
      const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      target.style.setProperty("--mouse-x", `${x}px`);
      target.style.setProperty("--mouse-y", `${y}px`);
    }

    const cards = document.querySelectorAll('.glass-card');
    for (const card of cards) {
      card.addEventListener('mousemove', handleOnMouseMove);
    }
  };

  initMouseTracking();

  // =====================
  // 4. SMOOTH SCROLLING NAV
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      const scrollContainer = document.getElementById('fullpage-container');

      if (targetEl && scrollContainer && window.innerWidth > 768) {
        // Desktop: Scroll the container directly
        const targetPos = targetEl.offsetTop;
        scrollContainer.scrollTo({ top: targetPos, behavior: 'smooth' });
      } else if (targetEl) {
        // Mobile: Normal window scroll
        const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

});
