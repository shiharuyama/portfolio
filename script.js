/* ── 設定 ── */
const CELL      = 48;
const RADIUS    = 160;
const INTENSITY = 0.20;
const DECAY     = 2.0;

const COLORS = [
  { r: 42,  g: 88,  b: 159 }, // c1
  { r: 71,  g: 117, b: 186 }, // c2
  { r: 43,  g: 156, b: 148 }, // c3
  { r: 124, g: 162, b: 211 }, // c4
];

let activeColor = 0;

/* ── パレットボタン ── */
const paletteBtns = document.querySelectorAll('.palette-btn');
paletteBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = +btn.dataset.color;
    if (activeColor === idx) {
      activeColor = null;
      paletteBtns.forEach(b => b.classList.remove('is-active'));
    } else {
      activeColor = idx;
      paletteBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    }
    if (!raf) raf = requestAnimationFrame(render);
  });
});

/* ── グリッド構築 ── */
const hero  = document.getElementById('hero');
const layer = document.getElementById('cellsLayer');
let cols = 0, rows = 0, cells = [];

function buildGrid() {
  const W = hero.offsetWidth;
  const H = hero.offsetHeight;
  const newCols = Math.ceil(W / CELL);
  const newRows = Math.ceil(H / CELL);
  if (newCols === cols && newRows === rows) return;
  cols = newCols; rows = newRows;

  layer.style.gridTemplateColumns = `repeat(${cols}, ${CELL}px)`;
  layer.style.gridTemplateRows    = `repeat(${rows}, ${CELL}px)`;
  layer.innerHTML = '';
  cells = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const div = document.createElement('div');
      div.className = 'cell';
      div.dataset.colorIdx = (r % 2) * 2 + (c % 2);
      layer.appendChild(div);
      cells.push({
        el: div,
        cx: c * CELL + CELL / 2,
        cy: r * CELL + CELL / 2,
        colorIdx: +div.dataset.colorIdx,
      });
    }
  }
}

/* ── マウス ── */
let mouseX = -9999, mouseY = -9999;
let raf = null;

hero.addEventListener('mousemove', e => {
  const rect = hero.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  if (!raf) raf = requestAnimationFrame(render);
});

hero.addEventListener('mouseleave', () => {
  mouseX = -9999; mouseY = -9999;
  if (!raf) raf = requestAnimationFrame(render);
});

/* ── レンダリング ── */
function render() {
  raf = null;
  cells.forEach(cell => {
    const targetColor = activeColor !== null ? activeColor : cell.colorIdx;
    const dx    = cell.cx - mouseX;
    const dy    = cell.cy - mouseY;
    const dist  = Math.sqrt(dx * dx + dy * dy);
    const t     = Math.max(0, 1 - dist / RADIUS);
    const alpha = Math.pow(t, DECAY) * INTENSITY;

    if (alpha < 0.004) {
      cell.el.style.backgroundColor = '';
    } else {
      const col = COLORS[targetColor];
      cell.el.style.backgroundColor = `rgba(${col.r},${col.g},${col.b},${alpha.toFixed(3)})`;
    }
  });
}

/* ── Init ── */
buildGrid();
window.addEventListener('resize', buildGrid);