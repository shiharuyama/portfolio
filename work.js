/* ─────────────────────────────────────
   FADE UP（スクロール連動）
───────────────────────────────────── */
const up = document.querySelectorAll('.fade-up');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
up.forEach(el => io.observe(el));

/* ─────────────────────────────────────
   レンズズーム（PCのみ）
───────────────────────────────────── */
document.querySelectorAll('.lens-wrap').forEach(wrap => {
  const lens = wrap.querySelector('.lens');
  const img  = wrap.querySelector('img');

  wrap.addEventListener('mouseenter', () => {
    lens.style.display = 'block';
  });

  wrap.addEventListener('mouseleave', () => {
    lens.style.display = 'none';
  });

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lens.style.left = (x - 150) + 'px';
    lens.style.top  = (y - 150) + 'px';

    const zoom = 2;
    const bgW = img.offsetWidth  * zoom;
    const bgH = img.offsetHeight * zoom;
    const bgX = 150 - x * zoom;
    const bgY = 150 - y * zoom;

    lens.style.backgroundImage    = `url(${img.src})`;
    lens.style.backgroundSize     = `${bgW}px ${bgH}px`;
    lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
  });
});