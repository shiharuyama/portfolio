/* ─────────────────────────────────────
   FADE UP（スクロール連動）
───────────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-up');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => io.observe(el));

/* ─────────────────────────────────────
   レンズズーム（PCのみ）
───────────────────────────────────── */
const ZOOM      = 2;
const LENS_SIZE = 200;

function initLens(wrapEl) {
  const img  = wrapEl.querySelector('img');
  const lens = wrapEl.querySelector('.lens');
  if (!img || !lens) return;

  lens.style.width  = LENS_SIZE + 'px';
  lens.style.height = LENS_SIZE + 'px';

  wrapEl.addEventListener('mouseenter', () => {
    lens.style.display = 'block';
  });

  wrapEl.addEventListener('mouseleave', () => {
    lens.style.display = 'none';
  });

  wrapEl.addEventListener('mousemove', e => {
    const rect = wrapEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lens.style.left = (x - LENS_SIZE / 2) + 'px';
    lens.style.top  = (y - LENS_SIZE / 2) + 'px';

    const bgW = img.offsetWidth  * ZOOM;
    const bgH = img.offsetHeight * ZOOM;
    const bgX = (LENS_SIZE / 2) - x * ZOOM;
    const bgY = (LENS_SIZE / 2) - y * ZOOM;

    lens.style.backgroundImage    = `url(${img.src})`;
    lens.style.backgroundSize     = `${bgW}px ${bgH}px`;
    lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
  });
}

/* lens-wrap クラスを持つ要素すべてに自動適用 */
document.querySelectorAll('.lens-wrap').forEach(initLens);
