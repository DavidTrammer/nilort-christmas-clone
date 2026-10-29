/**
 * Nilort IT Group - Christmas Holiday Edition
 * Vanilla JavaScript: Snowfall engine, mobile menu, accordion, interactive celebrations
 */

document.addEventListener('DOMContentLoaded', () => {
  initSnowfall();
  initMobileDrawer();
  initFAQAccordion();
  initContactForm();
  initLanguageSwitcher();
  initScrollFeatures();
});

/* ==========================================================================
   1. LIGHTWEIGHT CANVAS SNOW ENGINE
   ========================================================================== */
let snowActive = true;
let snowAnimationId = null;

function initSnowfall() {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Flake properties
  const flakeCount = Math.min(Math.floor(width / 14), 100);
  const flakes = [];

  for (let i = 0; i < flakeCount; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      density: Math.random() * flakeCount,
      speedY: Math.random() * 1.5 + 0.7,
      speedX: Math.random() * 0.8 - 0.4,
      opacity: Math.random() * 0.7 + 0.3,
      angle: Math.random() * Math.PI * 2
    });
  }

  function render() {
    if (!snowActive) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
      ctx.fill();

      // Motion
      f.angle += 0.015;
      f.y += f.speedY;
      f.x += Math.sin(f.angle) * 0.6 + f.speedX;

      // Wrap around
      if (f.y > height) {
        f.y = -5;
        f.x = Math.random() * width;
      }
      if (f.x > width + 5) {
        f.x = -5;
      } else if (f.x < -5) {
        f.x = width + 5;
      }
    }

    snowAnimationId = requestAnimationFrame(render);
  }

  render();

  // Snow toggle button
  const toggleBtn = document.getElementById('snow-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      snowActive = !snowActive;
      toggleBtn.innerHTML = snowActive
        ? '<span>❄️</span> Snow: On'
        : '<span>❄️</span> Snow: Off';
      if (snowActive) {
        render();
      }
    });
  }
}

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const closeBtn = document.getElementById('close-drawer-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-drawer .nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. FAQ ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all others
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   4. CONTACT FORM & FESTIVE CELEBRATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('festive-contact-form');
  const statusMsg = document.getElementById('form-status-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;

    if (statusMsg) {
      statusMsg.innerHTML = `🎄 <strong>Thank you, ${escapeHtml(name)}!</strong> Your message has been received with holiday cheer. We'll reply to <em>${escapeHtml(email)}</em> promptly!`;
      statusMsg.className = 'form-status-msg success';
      statusMsg.style.display = 'block';
    }

    form.reset();

    // Trigger holiday sparkles
    triggerSparkles();
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

function triggerSparkles() {
  // Simple cheerful celebratory confetti
  const colors = ['#ffd700', '#dc2626', '#16a34a', '#ffffff', '#38bdf8'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.top = '50%';
    el.style.left = '50%';
    el.style.width = Math.random() * 8 + 4 + 'px';
    el.style.height = el.style.width;
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
    document.body.appendChild(el);

    const destX = (Math.random() - 0.5) * 500;
    const destY = (Math.random() - 0.8) * 400;

    requestAnimationFrame(() => {
      el.style.transform = `translate(${destX}px, ${destY}px) rotate(${Math.random() * 720}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => el.remove(), 1000);
  }
}

/* ==========================================================================
   5. LANGUAGE SWITCHER
   ========================================================================== */
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ==========================================================================
   6. SCROLL FEATURES
   ========================================================================== */
function initScrollFeatures() {
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
