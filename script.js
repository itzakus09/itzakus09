const start = new Date('2025-07-15T00:00:00');
const now = new Date();
const days = Math.max(1, Math.floor((now - start) / 86400000));
const fullDate = now.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
}).toUpperCase();
const textUpdates = [
  ['days', String(days)],
  ['day-badge', `DAY ${days}`],
  ['current-date', fullDate],
  ['current-day', `DAY ${days}`],
  ['progress-day', `DAY ${days}`],
  ['stat-day', String(days)],
  ['quote-day', `— ABHISHEK / DAY ${days}`]
];

textUpdates.forEach(([id, value]) => {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealTargets = document.querySelectorAll('.milestone,.skill-card,.chart-card,.stat,.quote-card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.08 });

  revealTargets.forEach(element => observer.observe(element));
} else {
  revealTargets.forEach(element => element.classList.add('in-view'));
}
