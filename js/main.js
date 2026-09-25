/* ================================================
   MAIN JS - Portfolio Interactions
   ================================================ */
'use strict';

/* ================================================
   PAGE LOADER
   ================================================ */
(function initLoader() {
  const loaderHTML = `
    <div class="loader-overlay" id="loaderOverlay">
      <div class="loader-logo">&lt;Ernest John /&gt;</div>
      <div class="loader-bar"><div class="loader-fill" id="loaderFill"></div></div>
    </div>`;
  document.body.insertAdjacentHTML('afterbegin', loaderHTML);

  const fill = document.getElementById('loaderFill');
  const overlay = document.getElementById('loaderOverlay');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        overlay.classList.add('hidden');
        setTimeout(() => overlay.remove(), 500);
      }, 300);
    }
    fill.style.width = progress + '%';
  }, 120);
})();

/* ================================================
   CUSTOM CURSOR
   ================================================ */
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  if (!dot || !outline) return;

  let dotX = 0, dotY = 0;
  let outX = 0, outY = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    dotX = e.clientX;
    dotY = e.clientY;
  });

  function animate() {
    outX += (dotX - outX) * 0.15;
    outY += (dotY - outY) * 0.15;
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    outline.style.left = outX + 'px';
    outline.style.top = outY + 'px';
    raf = requestAnimationFrame(animate);
  }
  animate();

  // Hover effects
  document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .contact-card, .tab-btn, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovering'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
  });
})();

/* ================================================
   NAVBAR
   ================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
    toggleBackToTop();
  }, { passive: true });

  // Hamburger
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link on scroll
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
})();

/* ================================================
   BACK TO TOP
   ================================================ */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================================================
   TYPING ANIMATION
   ================================================ */
(function initTyping() {
  const target = document.getElementById('typedText');
  if (!target) return;

  const words = [
    'Full-Stack Developer',
    'UI/UX Enthusiast',
    'Open Source Contributor',
    'Problem Solver',
    'React Developer',
    'Python Engineer',
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pauseTime = 0;

  function type() {
    const word = words[wordIndex % words.length];

    if (!isDeleting) {
      target.textContent = word.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === word.length) {
        pauseTime = 2000;
        isDeleting = true;
      }
    } else {
      target.textContent = word.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        pauseTime = 300;
      }
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(type, charIndex === 0 ? pauseTime : (charIndex === word.length ? pauseTime : speed));
  }

  type();
})();

/* ================================================
   SCROLL REVEAL
   ================================================ */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.section-header, .about-grid > *, .skill-card, .project-card, .timeline-item, .contact-info > *, .contact-form, .stat-item');

  elements.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('delay-2');
    if (i % 3 === 2) el.classList.add('delay-3');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
})();

/* ================================================
   STATS COUNTER ANIMATION
   ================================================ */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting) && !countersStarted) {
      countersStarted = true;
      statNums.forEach(el => animateCounter(el));
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  const banner = document.querySelector('.stats-banner');
  if (banner) observer.observe(banner);
})();

/* ================================================
   SKILL BARS ANIMATION
   ================================================ */
(function initSkillBars() {
  function animateBars(container) {
    container.querySelectorAll('.skill-fill').forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  }

  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate currently visible tab
        const activeTab = skillsSection.querySelector('.tab-content.active');
        if (activeTab) animateBars(activeTab);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillsSection);

  // Also animate on tab switch
  window.__animateBarsOnTab = animateBars;
})();

/* ================================================
   SKILLS TABS
   ================================================ */
(function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(t => {
        t.classList.remove('active');
        // Reset bars
        t.querySelectorAll('.skill-fill').forEach(bar => { bar.style.width = '0'; });
      });

      btn.classList.add('active');
      const activeContent = document.getElementById('tab-' + tabId);
      if (activeContent) {
        activeContent.classList.add('active');
        // Animate bars with delay
        setTimeout(() => {
          if (window.__animateBarsOnTab) window.__animateBarsOnTab(activeContent);
        }, 50);
      }
    });
  });
})();

/* ================================================
   PROJECT FILTERS
   ================================================ */
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Add transition to project cards
  projectCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
})();

/* ================================================
   3D CARD TILT EFFECT
   ================================================ */
(function initTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });
})();

/* ================================================
   CONTACT FORM VALIDATION
   ================================================ */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successMsg = document.getElementById('formSuccess');

  function showError(fieldId, errorId, msg) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add('error');
    if (error) error.textContent = msg;
  }

  function clearErrors() {
    form.querySelectorAll('input, textarea').forEach(f => f.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(e => e.textContent = '');
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('input', (e) => {
    const field = e.target;
    field.classList.remove('error');
    const errorEl = document.getElementById(field.id + 'Error');
    if (errorEl) errorEl.textContent = '';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || name.length < 2) {
      showError('name', 'nameError', 'Please enter your full name.');
      valid = false;
    }
    if (!email || !validateEmail(email)) {
      showError('email', 'emailError', 'Please enter a valid email address.');
      valid = false;
    }
    if (!subject || subject.length < 3) {
      showError('subject', 'subjectError', 'Please enter a subject.');
      valid = false;
    }
    if (!message || message.length < 10) {
      showError('message', 'messageError', 'Message must be at least 10 characters.');
      valid = false;
    }

    if (valid) {
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      // Simulate API call
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
        }
      }, 1800);
    }
  });
})();

/* ================================================
   SMOOTH SCROLL FOR NAV LINKS
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ================================================
   RIPPLE EFFECT ON BUTTONS
   ================================================ */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.left = (e.clientX - rect.left - 10) + 'px';
    ripple.style.top = (e.clientY - rect.top - 10) + 'px';
    this.style.position = 'relative';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ================================================
   HAMBURGER ANIMATION
   ================================================ */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', function () {
    const isOpen = navLinksEl.classList.contains('open');
    const spans = this.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

/* ================================================
   SECTION BACKGROUND GRADIENT EFFECTS
   ================================================ */
(function initSectionGlows() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'background 0.8s ease';
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(s => observer.observe(s));
})();

console.log('%c🚀 Portfolio loaded!', 'color: #6c63ff; font-size: 1.2rem; font-weight: bold;');
console.log('%cBuilt with ❤️ using vanilla HTML, CSS & JS', 'color: #06d6a0; font-size: 0.9rem;');
