// Continuous scroll depth and fixed, non-cumulative tier rewards.
(() => {
  const tiers = [
    { id: 'surface', depth: 0, label: 'SURFACE', points: 0 },
    { id: 'plankton', depth: 100, label: 'PLANKTON', points: 10 },
    { id: 'introduction', depth: 150, label: 'TOO CLEVER', points: 15 },
    { id: 'about', depth: 300, label: 'SCHOOLER', points: 30 },
    { id: 'projects', depth: 600, label: 'RARE', points: 60 },
    { id: 'skills', depth: 850, label: 'DEEP CUT', points: 85 },
    { id: 'contact', depth: 1000, label: 'ONE IN A KRILLION', points: 100 }
  ];
  const meter = document.querySelector('[data-depth-meter]');
  if (!meter) return;
  const readout = meter.querySelector('[data-depth-readout]');
  const label = meter.querySelector('[data-depth-zone]');
  const points = meter.querySelector('[data-depth-points]');
  const next = meter.querySelector('[data-depth-next]');
  const marker = meter.querySelector('[data-depth-marker]');
  const track = meter.querySelector('.depth-meter__track');
  const notice = document.querySelector('[data-tier-notice]');
  const milestones = tiers.slice(1).map(tier => {
    const tick = document.createElement('a');
    tick.className = 'depth-milestone';
    tick.style.top = (tier.depth / 10) + '%';
    const target = tier.depth <= 150 ? 'early-descent' : tier.id;
    tick.href = '#' + target;
    tick.setAttribute('aria-label', tier.label + ', ' + tier.depth + ' meters milestone; jump to ' + (tier.depth <= 150 ? 'early descent' : target));
    tick.title = tier.label + ' / ' + tier.depth + ' M';
    const text = document.createElement('span');
    text.textContent = tier.label + ' / ' + tier.depth + ' M';
    tick.appendChild(text);
    track.appendChild(tick);
    return tick;
  });
  let ticking = false, current = null, initialized = false;
  function update() {
    ticking = false;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const progress = maxScroll ? Math.max(0, Math.min(window.scrollY / maxScroll, 1)) : 0;
    const depth = progress * 1000;
    document.documentElement.style.setProperty('--fish-darkness', (progress * 100) + '%');
    document.documentElement.style.setProperty('--parallax-fish', Math.round(progress * 48 / 4) * 4 + 'px');
    document.documentElement.style.setProperty('--parallax-rays', Math.round(progress * 32 / 4) * 4 + 'px');
    const hero = document.querySelector('#surface');
    document.documentElement.style.setProperty('--water-screen-top', Math.max(0, Math.min(window.innerHeight, hero.offsetHeight * 0.62 - window.scrollY)) + 'px');
    let index = 0;
    while (index < tiers.length - 1 && depth >= tiers[index + 1].depth) index++;
    const tier = tiers[index], following = tiers[index + 1];
    const displayedDepth = Math.floor(depth / 10) * 10;
    readout.textContent = displayedDepth + ' M';
    label.textContent = tier.label;
    points.textContent = tier.points + ' POINTS';
    next.textContent = following ? 'NEXT: ' + following.label + ' ' + following.depth + ' M' : 'MAX DEPTH';
    marker.style.top = (progress * 100) + '%';
    milestones.forEach((tick, i) => tick.classList.toggle('is-active', i === index - 1));
    readout.setAttribute('aria-valuenow', String(displayedDepth));
    readout.setAttribute('aria-valuetext', displayedDepth + ' meters, ' + tier.label + ', ' + tier.points + ' points' + (following ? '; next: ' + following.label + ' at ' + following.depth + ' meters' : ''));
    document.body.dataset.zone = tier.id;
    if (initialized && current !== tier.id && notice) {
      notice.textContent = 'TIER: ' + tier.label + ' / ' + tier.points + ' POINTS';
      notice.classList.remove('show'); void notice.offsetWidth; notice.classList.add('show');
    }
    current = tier.id;
    initialized = true;
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  update();
})();
