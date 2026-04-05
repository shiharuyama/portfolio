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

// ========================================
// メールアドレスのbot対策とワンクリックコピー
// ========================================

const u = 'shiharuyama';
const d = 'gmail.com';
const wrap = document.getElementById('emailWrap');
const link = document.getElementById('emailLink');
const tip  = document.getElementById('emailTooltip');

link.textContent = u + '@' + d;

wrap.addEventListener('click', () => {
    navigator.clipboard.writeText(u + '@' + d).then(() => {
        tip.textContent = 'コピーしました';
        wrap.classList.add('copied');
        setTimeout(() => {
            tip.textContent = 'クリックでコピー';
            wrap.classList.remove('copied');
        }, 2000);
    });
});