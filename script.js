/* ============================================
   AKSHAY KUMAR PORTFOLIO — script.js
   ============================================ */

/* ---------- Custom Cursor ---------- */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 6 + 'px';
  cursor.style.top  = e.clientY - 6 + 'px';

  // Follower lags slightly for a smooth feel
  setTimeout(() => {
    cursorFollower.style.left = e.clientX - 18 + 'px';
    cursorFollower.style.top  = e.clientY - 18 + 'px';
  }, 80);
});

// Scale cursor on interactive elements
document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    cursor.style.opacity   = '0.6';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.opacity   = '1';
  });
});

/* ---------- Scroll Reveal ---------- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ---------- Counter Animation ---------- */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

// Trigger counters when stats strip enters viewport
const statsStrip = document.querySelector('.stats-strip');
let countersStarted = false;

const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounter(document.getElementById('stat1'), 4);
      animateCounter(document.getElementById('stat2'), 6);
      animateCounter(document.getElementById('stat3'), 500, '+');
      animateCounter(document.getElementById('stat4'), 15);
      statsObserver.disconnect();
    }
  },
  { threshold: 0.3 }
);

statsObserver.observe(statsStrip);

/* ---------- Active Nav Highlight ---------- */
const navLinks   = document.querySelectorAll('.nav-links a');
const allSections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  let currentSection = '';

  allSections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav(); // Run on load

/* ---------- Navbar Background on Scroll ---------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(5, 8, 16, 0.95)';
  } else {
    navbar.style.background = 'rgba(5, 8, 16, 0.7)';
  }
}, { passive: true });

/* ---------- Smooth Scroll for Nav Links ---------- */
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const offset = 80; // navbar height offset
      const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- Skill Tag Hover Ripple ---------- */
document.querySelectorAll('.skill-tag').forEach((tag) => {
  tag.addEventListener('mouseenter', function () {
    this.style.transition = 'all 0.2s ease';
  });
});

/* ---------- Project Card Tilt Effect ---------- */
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const xPos  = e.clientX - rect.left;
    const yPos  = e.clientY - rect.top;
    const xPct  = (xPos / rect.width  - 0.5) * 8;
    const yPct  = (yPos / rect.height - 0.5) * 8;
    card.style.transform = `perspective(800px) rotateX(${-yPct}deg) rotateY(${xPct}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s ease';
  });
});

/* ---------- Hackathon Item Entrance Stagger ---------- */
const hackItems = document.querySelectorAll('.hack-item');
const hackObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateX(0)';
        }, i * 100);
      }
    });
  },
  { threshold: 0.1 }
);

hackItems.forEach((item) => {
  item.style.opacity   = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  hackObserver.observe(item);
});

/* ---------- Cert Card Entrance ---------- */
const certCards = document.querySelectorAll('.cert-card');
const certObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
      }
    });
  },
  { threshold: 0.1 }
);

certCards.forEach((card) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  certObserver.observe(card);
});

/* ---------- Page Load Fade ---------- */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
const heroPhotoFrame = document.querySelector('.hero-photo-frame');

heroPhotoFrame.addEventListener('mousemove', (e) => {
  const rect = heroPhotoFrame.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = ((x / rect.width) - 0.5) * 18;
  const rotateX = ((y / rect.height) - 0.5) * -18;

  heroPhotoFrame.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.03)
  `;
});

heroPhotoFrame.addEventListener('mouseleave', () => {
  heroPhotoFrame.style.transform = `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    scale(1)
  `;
});

