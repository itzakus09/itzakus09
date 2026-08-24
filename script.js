const start = new Date('2025-07-15T00:00:00');
const now = new Date();
const days = Math.max(1, Math.floor((now - start) / 86400000));
const el = document.getElementById('days');
if (el) el.textContent = days;

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.milestone,.skill-card,.chart-card,.stat,.quote-card').forEach(el => observer.observe(el));
