/**
 * KEZIA NATALIA PERMANA - PORTFOLIO INTERACTION ENGINE
 * Luxury Micro-Interactions, Case Study Modals, Toast Alerts & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeaderScroll();
  initScrollAnimations();
  initProjectModals();
  initClipboardAndContact();
  initMobileMenu();
});

/* ==========================================================================
   1. CUSTOM LUXURY CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  // Hover states for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-item, .achievement-item, .tech-badge-item, input, textarea');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
  });
}

/* ==========================================================================
   2. HEADER SCROLL & ACTIVE LINK HIGHLIGHTING
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header blur state
    if (scrollPos > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active navigation highlight
    sections.forEach((section) => {
      const top = section.offsetTop - 150;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   3. SCROLL-TRIGGERED REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, optionally unobserve for performance
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   4. CASE STUDY MODAL SYSTEM & AUTHENTIC CV DATA
   ========================================================================== */
const projectData = {
  tms: {
    tag: 'EFG Consulting · Australia / Remote · May 2026 – Aug 2026',
    title: 'Software Quality Assurance Internship',
    subtitle: 'Transportation Management System (TMS) & Quoting Tools Quality Assurance',
    tabLabels: ['Internship Overview', 'QA & Testing Strategy', 'Defects & Resolutions', 'Tools & Technologies'],
    metrics: [
      { num: '50+', label: 'Assigned Testing Tickets Completed' },
      { num: '23', label: 'Software Defects Identified & Logged' },
      { num: '4', label: 'User Roles Tested (Client, Sales, GM, Ops)' }
    ],
    overview: `Performed professional Quality Assurance for an enterprise Transportation Management System (TMS) and Quoting Tools at EFG Consulting, an Australia-based consulting and remote talent solutions company. Ensured high software reliability and business requirement validation across multiple stakeholder roles before production releases.`,
    testingStrategy: [
      'Executed functional, regression, and User Acceptance Testing (UAT) for web-based enterprise applications to ensure product quality before release.',
      'Completed 50+ assigned testing tickets, validating new features, enhancements, and bug fixes according to detailed business requirements.',
      'Utilized Postman to test and validate API endpoints supporting quote status workflows and notification systems, verifying correct behavior across multiple user roles (Client, Sales, GM, Operations).',
      'Collaborated closely with developers, project managers, senior QA engineers, and stakeholders to verify bug fixes and ensure strict compliance with quality standards.'
    ],
    defectsResolved: [
      'Identified, documented, and reported 23 software defects with clear reproduction steps, severity levels, and supporting evidence.',
      'Facilitated efficient issue resolution by development teams by providing network logs, payload samples, and step-by-step reproduction.',
      'Conducted re-testing and regression testing after bug fixes to guarantee zero side-effects on existing quote status workflows.'
    ],
    techStack: ['Postman', 'Jira', 'Playwright', 'Trello', 'RESTful API Testing', 'Regression Testing', 'UAT', 'TMS Workflows', 'Defect Management']
  },
  platform: {
    tag: 'ITHB Informatics Department · Bandung · 2025 – 2026',
    title: 'Academic Lab Mentorship & Assistant Lecturer',
    subtitle: 'Platform-Based Programming (React / Express) & Algorithm Lab (Java)',
    tabLabels: ['Role Overview', 'Courses & Curriculum', 'Responsibilities & Mentorship', 'Technologies Taught'],
    metrics: [
      { num: '59', label: 'Total Students Guided (35 Web + 24 Java)' },
      { num: '2', label: 'Academic Semesters as Assistant Lecturer' },
      { num: '3.7', label: 'Sarjana Informatika GPA at ITHB' }
    ],
    overview: `Appointed as Assistant Lecturer at Institut Teknologi Harapan Bangsa (ITHB) for two fundamental computer science courses: Platform-Based Programming (Feb 2026 – May 2026) and Algorithm Lab (Aug 2025 – Nov 2025). Guided students in software engineering principles, full-stack architecture, and algorithmic logic.`,
    testingStrategy: [
      'Platform-Based Programming (Feb 2026 – May 2026): Guided and mentored 35 students in developing full-stack web applications using React, Express.js, and Sequelize ORM.',
      'Covered component-based frontend development, RESTful API implementation, database integration (PostgreSQL & MySQL), and MVC architecture.',
      'Algorithm Lab (Aug 2025 – Nov 2025): Taught and guided 24 students in mastering Java fundamentals (variables, arrays, loops, conditional logic, sorting algorithms, and basic OOP).',
      'Assisted students with interactive debugging sessions, workstation readiness, and technical lab setup.'
    ],
    defectsResolved: [
      'Supported weekly laboratory sessions, practical coding assignments, quizzes, midterm, and final evaluations.',
      'Conducted rigorous code reviews and provided technical assistance to help students resolve architectural flaws and API bugs.',
      'Served as Member of Internal Event and Finance Coordinator at ITHB Informatics Engineering Community (2024–2026).'
    ],
    techStack: ['React', 'Express.js', 'Node.js', 'Sequelize ORM', 'PostgreSQL', 'MySQL', 'Java', 'OOP', 'GitHub', 'Algorithms']
  },
  cloud: {
    tag: 'ITHB Career Resource Center & SAP Learning · 2025 – 2026',
    title: 'Enterprise Certifications & Professional Training',
    subtitle: 'AWS Academy Cloud Foundations, SAP Business Suite & Certiplus Program',
    tabLabels: ['Program Overview', 'AWS Cloud Foundations', 'SAP S/4HANA & Business Suite', 'Certified Competencies'],
    metrics: [
      { num: 'AWS ACF', label: 'AWS Cloud Foundations Certified' },
      { num: 'SAP ERP', label: 'SAP Business Suite & S/4HANA' },
      { num: 'Certiplus', label: 'Professional Skills Certified' }
    ],
    overview: `Completed specialized professional certification programs and enterprise system training at ITHB Career Resource Center and SAP Learning, establishing strong foundations in cloud computing architecture, enterprise resource planning (ERP), and professional leadership.`,
    testingStrategy: [
      'AWS Academy Cloud Foundations (ACF, Completed November 2025): Mastered cloud computing architecture, core AWS services (EC2, S3, RDS, VPC), cloud security, compliance, and cloud economics.',
      'Learned best practices for designing scalable, highly available, fault-tolerant, and secure cloud environments.',
      'Credential ID: 012be65d-c3ba-47c6-b69d-a2aee50e8bb6 (https://www.credly.com/badges/012be65d-c3ba-47c6-b69d-a2aee50e8bb6)'
    ],
    defectsResolved: [
      'Exploring End-to-End Business Processes in SAP Business Suite: Certified mastery of integrated enterprise business workflows across supply chain, procurement, financial accounting, and sales operations (https://badger.learning.sap.com/verify/xyvid-comyv-mokyl-mogom-casav)',
      'SAP Configuration S/4HANA (Completed January 2026): Completed hands-on configuration of enterprise ERP business structures, master data, and workflows.',
      'SAP Introduction to S/4HANA using Global Bike (Completed August 2025): Simulated end-to-end procurement, production, inventory, and sales processes in an enterprise simulation.',
      'Certiplus Program (Completed December 2025): Completed professional training in advanced computer literacy, professional communication, leadership, entrepreneurship, and career planning.'
    ],
    techStack: ['SAP Business Suite', 'AWS Cloud Foundations (ACF)', 'SAP S/4HANA', 'Global Bike ERP', 'Cloud Security & Architecture', 'Certiplus Program', 'Enterprise Workflows']
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('projectModal');
  if (!modalBackdrop) return;

  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  const triggerBtns = document.querySelectorAll('[data-project-trigger]');

  // Modal elements to populate
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalMetrics = document.getElementById('modalMetrics');
  const modalOverview = document.getElementById('modalOverview');
  const modalTestingList = document.getElementById('modalTestingList');
  const modalDefectsList = document.getElementById('modalDefectsList');
  const modalTechChips = document.getElementById('modalTechChips');
  const tabBtns = document.querySelectorAll('.modal-tab-btn');

  // Open modal handler
  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-trigger');
      const data = projectData[projectId];
      if (!data) return;

      modalTag.textContent = data.tag;
      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;

      // Update tab button labels dynamically if provided
      if (data.tabLabels && data.tabLabels.length === 4) {
        tabBtns[0].textContent = data.tabLabels[0];
        tabBtns[1].textContent = data.tabLabels[1];
        tabBtns[2].textContent = data.tabLabels[2];
        tabBtns[3].textContent = data.tabLabels[3];
      }

      // Populate metrics
      modalMetrics.innerHTML = data.metrics.map(m => `
        <div class="modal-metric-card">
          <div class="modal-metric-num">${m.num}</div>
          <div class="modal-metric-label">${m.label}</div>
        </div>
      `).join('');

      // Helper to convert URLs into clickable links with target="_blank"
      function renderModalTextWithLinks(text) {
        if (!text) return '';
        const urlRegex = /(https?:\/\/[^\s\)\>]+)/g;
        return text.replace(urlRegex, (url) => {
          let label = url;
          if (url.includes('credly.com')) {
            label = `Verify on Credly <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem; margin-left: 0.2rem;"></i>`;
          } else if (url.includes('sap.com')) {
            label = `Verify SAP Credential <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem; margin-left: 0.2rem;"></i>`;
          } else {
            label = `${url} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem; margin-left: 0.2rem;"></i>`;
          }
          return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--bg-burgundy-main); background: rgba(197, 160, 89, 0.18); padding: 0.18rem 0.55rem; border-radius: 4px; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; display: inline-flex; align-items: center; gap: 0.25rem; transition: var(--transition-fast);">${label}</a>`;
        });
      }

      // Populate overview
      modalOverview.innerHTML = renderModalTextWithLinks(data.overview);

      // Populate tab 2 list
      modalTestingList.innerHTML = data.testingStrategy.map(item => `
        <li style="margin-bottom: 0.7rem; display: flex; gap: 0.6rem; align-items: flex-start;">
          <span style="color: var(--gold-primary); font-weight: bold;">✦</span>
          <span>${renderModalTextWithLinks(item)}</span>
        </li>
      `).join('');

      // Populate tab 3 list
      modalDefectsList.innerHTML = data.defectsResolved.map(item => `
        <li style="margin-bottom: 0.7rem; display: flex; gap: 0.6rem; align-items: flex-start;">
          <span style="color: var(--gold-primary); font-weight: bold;">✦</span>
          <span>${renderModalTextWithLinks(item)}</span>
        </li>
      `).join('');

      // Populate tech chips
      modalTechChips.innerHTML = data.techStack.map(tech => `
        <span class="modal-chip">${tech}</span>
      `).join('');

      // Re-attach hover states for dynamically rendered links
      modalBackdrop.querySelectorAll('a').forEach((link) => {
        link.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
        link.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
      });

      // Show first tab by default
      switchModalTab('overview');

      // Open backdrop
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close handlers
  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Tab switcher
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.getAttribute('data-tab');
      switchModalTab(tabKey);
    });
  });

  function switchModalTab(tabKey) {
    tabBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tabKey));
    document.querySelectorAll('.modal-tab-content').forEach(c => {
      c.classList.toggle('active', c.id === `tab-${tabKey}`);
    });
  }
}

/* ==========================================================================
   5. CLIPBOARD COPY & TOAST SYSTEM
   ========================================================================== */
function initClipboardAndContact() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast(`Selected: ${textToCopy}`);
      });
    });
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✦</span> <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ==========================================================================
   6. MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}
