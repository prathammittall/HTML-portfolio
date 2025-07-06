// Floating text and parallax/particle background for hero
const heroBg = document.querySelector('.hero-bg');
const canvas = document.createElement('canvas');
canvas.classList.add('particle-canvas');
heroBg.appendChild(canvas);
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = heroBg.offsetWidth;
  canvas.height = heroBg.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles() {
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      alpha: Math.random() * 0.5 + 0.5
    });
  }
}
createParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#00ffe7';
    ctx.shadowColor = '#00ffe7';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Reveal on scroll for cards and icons
function revealOnScroll() {
  const revealEls = document.querySelectorAll('.animated-card, .animated-icon');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Smooth scroll for navigation (if any anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}); 