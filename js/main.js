/**
 * KEZIA NATALIA PERMANA — LUXURY EDITORIAL PORTFOLIO ENGINE
 * Dynamic Interactions, Metric Counters, ScrollSpy, Lucide Icon Activation,
 * Project Modals with Evidence Documents, Ambient Tracking & Toast System.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Initialize Custom Luxury Cursor & Ambient Glow
  initLuxuryCursorAndGlow();

  // 3. Initialize Sticky Navigation & ScrollSpy
  initScrollSpy();

  // 4. Initialize Animated Number Counters
  initMetricCounters();

  // 5. Initialize Scroll Reveal Animations
  initScrollAnimations();

  // 6. Initialize Project Modals & Authentic Data
  initProjectModals();

  // 7. Initialize Clipboard Copy & Toast Notifications
  initClipboardAndContact();
});

/* ==========================================================================
   1. LUXURY CUSTOM CURSOR & AMBIENT GLOW TRACKER
   ========================================================================== */
function initLuxuryCursorAndGlow() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');

  if (!cursor || !follower) return;

  // Disable custom cursor tracking on touch/mobile devices for optimal performance and touch scrolling
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window) || window.innerWidth <= 1024;
  if (isTouchDevice) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    // Subtle parallax shift on ambient glows
    if (glow1) {
      const shiftX = (mouseX / window.innerWidth - 0.5) * 40;
      const shiftY = (mouseY / window.innerHeight - 0.5) * 40;
      glow1.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
    }
    if (glow2) {
      const shiftX = (mouseX / window.innerWidth - 0.5) * -50;
      const shiftY = (mouseY / window.innerHeight - 0.5) * -50;
      glow2.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
    }
  }, { passive: true });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  // Hover detection on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, input, select, textarea, .metric-card, .exp-card, .project-card, .service-item, .achievement-item, .tech-badge-item, .contact-method-card, .social-item');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    target.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
  });
}

/* ==========================================================================
   2. STICKY NAV & SCROLLSPY
   ========================================================================== */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.sticky-nav .nav-item');
  const stickyNav = document.getElementById('sticky-nav');
  const sections = document.querySelectorAll('section[id], nav[id], div[id="achievements"], div[id="featured-work"]');

  if (!sections.length || !navLinks.length) return;

  let ticking = false;

  function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute('data-nav') === current;
        if (isCurrent) {
          if (!link.classList.contains('active')) {
            navLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
            
            // Center active item within horizontal navbar container ONLY (prevents window scroll lock)
            if (stickyNav && window.innerWidth <= 768) {
              const linkLeft = link.offsetLeft;
              const linkWidth = link.offsetWidth;
              const navWidth = stickyNav.offsetWidth;
              stickyNav.scrollTo({
                left: linkLeft - (navWidth / 2) + (linkWidth / 2),
                behavior: 'smooth'
              });
            }
          }
        }
      });
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateActiveNav);
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   3. ANIMATED METRIC COUNTERS
   ========================================================================== */
function initMetricCounters() {
  const metricCards = document.querySelectorAll('.metric-number');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          metricCards.forEach((card) => {
            const target = parseFloat(card.getAttribute('data-target'));
            const format = card.getAttribute('data-format') || 'integer';
            animateCounter(card, target, format);
          });
        }
      });
    },
    { threshold: 0.25 }
  );

  const metricsSection = document.getElementById('metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }

  function animateCounter(el, target, format) {
    const duration = 1800;
    const start = 0;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuart(progress);
      const current = start + (target - start) * easeProgress;

      if (format === 'decimal') {
        el.textContent = current.toFixed(2);
      } else if (format === 'raw') {
        const rounded = Math.floor(current);
        el.textContent = target === 50 ? `${rounded}+` : rounded;
      } else {
        el.textContent = Math.floor(current);
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        if (format === 'decimal') {
          el.textContent = target.toFixed(2);
        } else if (target === 50) {
          el.textContent = '50+';
        } else {
          el.textContent = target;
        }
      }
    }

    requestAnimationFrame(updateCount);
  }

  function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }
}

/* ==========================================================================
   4. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('active'));
  }
}

/* ==========================================================================
   5. CASE STUDY MODAL SYSTEM & AUTHENTIC CV DATA WITH EVIDENCE
   ========================================================================== */
const projectData = {
  tms: {
    tag: 'EFG Consulting · Bali / Remote · May 2026 – Aug 2026',
    title: 'Software Quality Assurance Internship',
    subtitle: 'Transportation Management System (TMS) & Quoting Tools Quality Assurance',
    tabLabels: ['Internship Overview', 'QA & Testing Strategy', 'Defects & Resolutions', 'Tools & Technologies'],
    metrics: [
      { num: '50+', label: 'Assigned Testing Tickets Completed' },
      { num: '23', label: 'Software Defects Identified & Logged' },
      { num: '4', label: 'User Roles Tested (Client, Sales, GM, Ops)' }
    ],
    overview: `Performed professional Quality Assurance for an enterprise Transportation Management System (TMS) and Quoting Tools at EFG Consulting, a Bali-based consulting and remote talent solutions company. Ensured high software reliability and business requirement validation across multiple stakeholder roles before production releases.`,
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
      { num: '3.70', label: 'Sarjana Informatika GPA at ITHB' }
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

  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalEvidence = document.getElementById('modalEvidence');
  const modalMetrics = document.getElementById('modalMetrics');
  const modalOverview = document.getElementById('modalOverview');
  const modalTestingList = document.getElementById('modalTestingList');
  const modalDefectsList = document.getElementById('modalDefectsList');
  const modalTechChips = document.getElementById('modalTechChips');
  const tabBtns = document.querySelectorAll('.modal-tab-btn');

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-trigger');
      const data = projectData[projectId];
      if (!data) return;

      modalTag.textContent = data.tag;
      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;

      // Render Evidence Banner
      if (modalEvidence && data.evidenceDoc) {
        const isPdf = data.evidenceType === 'pdf';
        modalEvidence.innerHTML = `
          <div class="modal-evidence-banner">
            <div class="modal-evidence-icon">
              <i data-lucide="${isPdf ? 'file-check-2' : 'award'}"></i>
            </div>
            <div class="modal-evidence-info">
              <span class="modal-evidence-tag">VERIFIED PORTFOLIO EVIDENCE</span>
              <span class="modal-evidence-name">${data.evidenceTitle}</span>
            </div>
            <a href="${data.evidenceDoc}" target="_blank" rel="noopener noreferrer" class="modal-evidence-action-btn">
              <i data-lucide="external-link"></i>
              <span>${isPdf ? 'Open Portfolio (PDF)' : 'Verify Credential'}</span>
            </a>
          </div>
        `;
      } else if (modalEvidence) {
        modalEvidence.innerHTML = '';
      }

      if (data.tabLabels && data.tabLabels.length === 4) {
        tabBtns[0].textContent = data.tabLabels[0];
        tabBtns[1].textContent = data.tabLabels[1];
        tabBtns[2].textContent = data.tabLabels[2];
        tabBtns[3].textContent = data.tabLabels[3];
      }

      modalMetrics.innerHTML = data.metrics.map(m => `
        <div class="modal-metric-card">
          <div class="modal-metric-num">${m.num}</div>
          <div class="modal-metric-label">${m.label}</div>
        </div>
      `).join('');

      function renderModalTextWithLinks(text) {
        if (!text) return '';
        const urlRegex = /(https?:\/\/[^\s\)\>]+)/g;
        return text.replace(urlRegex, (url) => {
          let label = url;
          if (url.includes('credly.com')) {
            label = `Verify Credly Badge ↗`;
          } else if (url.includes('sap.com')) {
            label = `Verify SAP Credential ↗`;
          }
          return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--bg-burgundy-main); background: rgba(197, 160, 89, 0.18); padding: 0.18rem 0.55rem; border-radius: 4px; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; display: inline-flex; align-items: center; gap: 0.25rem;">${label}</a>`;
        });
      }

      modalOverview.innerHTML = renderModalTextWithLinks(data.overview);

      modalTestingList.innerHTML = data.testingStrategy.map(item => `
        <li style="margin-bottom: 0.75rem; display: flex; gap: 0.65rem; align-items: flex-start;">
          <span style="color: var(--gold-primary); font-weight: bold;">✦</span>
          <span>${renderModalTextWithLinks(item)}</span>
        </li>
      `).join('');

      modalDefectsList.innerHTML = data.defectsResolved.map(item => `
        <li style="margin-bottom: 0.75rem; display: flex; gap: 0.65rem; align-items: flex-start;">
          <span style="color: var(--gold-primary); font-weight: bold;">✦</span>
          <span>${renderModalTextWithLinks(item)}</span>
        </li>
      `).join('');

      modalTechChips.innerHTML = data.techStack.map(tech => `
        <span class="modal-chip">${tech}</span>
      `).join('');

      switchModalTab('overview');

      modalBackdrop.classList.add('active');
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';

      if (window.lucide) {
        lucide.createIcons();
      }
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
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
   6. CLIPBOARD COPY & TOAST SYSTEM
   ========================================================================== */
function initClipboardAndContact() {
  const copyButtons = document.querySelectorAll('[data-copy], [data-action="copy"]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const valToCopy = btn.getAttribute('data-copy') || btn.getAttribute('data-value') || btn.querySelector('.social-detail')?.textContent;
      if (valToCopy) {
        navigator.clipboard.writeText(valToCopy.trim()).then(() => {
          showToast(`Copied "${valToCopy.trim()}" to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy to clipboard.');
        });
      }
    });
  });
}

function showToast(message) {
  const container = document.querySelector('.toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check-circle-2" style="width:16px;height:16px;color:var(--gold-bright)"></i> <span>${message}</span>`;
  container.appendChild(toast);

  if (window.lucide) {
    lucide.createIcons();
  }

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ==========================================================================
   7. INTERACTIVE CONTACT FORM VIA WHATSAPP
   ========================================================================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('form-name')?.value || '';
  const email = document.getElementById('form-email')?.value || '';
  const subject = document.getElementById('form-subject')?.value || '';
  const message = document.getElementById('form-message')?.value || '';

  const waText = `Halo Kezia Natalia Permana,\n\nNama: ${name}\nKontak: ${email}\nPerihal: ${subject}\n\nPesan:\n${message}`;
  const waUrl = `https://wa.me/6283890559622?text=${encodeURIComponent(waText)}`;

  showToast('Opening WhatsApp to send your message...');
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 600);
}
