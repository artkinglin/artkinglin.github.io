// Scroll-driven depth meter, interpolated between real section positions.
(() => {
  const zones = [
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
  const notice = document.querySelector('[data-tier-notice]');
  let ticking = false, current = null, initialized = false;
  function update() {
    ticking = false;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const position = Math.max(0, Math.min(window.scrollY, maxScroll));
    const anchors = zones.map((zone, index) => ({ ...zone, position: Math.min(maxScroll, Math.max(0, document.getElementById(zone.id).offsetTop - (index ? 80 : 0))) }));
    let index = 0;
    while (index < anchors.length - 1 && position >= anchors[index + 1].position) index++;
    const zone = anchors[index], following = anchors[index + 1];
    const fraction = following && following.position > zone.position ? (position - zone.position) / (following.position - zone.position) : 0;
    const depth = following ? Math.round((zone.depth + fraction * (following.depth - zone.depth)) / 10) * 10 : 1000;
    readout.textContent = depth + ' M'; label.textContent = zone.label; points.textContent = zone.points + ' POINTS';
    next.textContent = following ? 'NEXT: ' + following.label + ' ' + following.depth + ' M' : 'MAX DEPTH';
    marker.style.top = (depth / 10) + '%';
    meter.setAttribute('aria-valuenow', String(depth));
    meter.setAttribute('aria-valuetext', depth + ' meters, ' + zone.label + ', ' + zone.points + ' points' + (following ? '; next: ' + following.label + ' at ' + following.depth + ' meters' : ''));
    document.body.dataset.zone = zone.id;
    if (initialized && current !== zone.id && zone.depth > 0 && notice) {
      notice.textContent = 'TIER: ' + zone.label + ' / ' + zone.points + ' POINTS';
      notice.classList.remove('show'); void notice.offsetWidth; notice.classList.add('show');
    }
    current = zone.id; initialized = true;
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  update();
})();

