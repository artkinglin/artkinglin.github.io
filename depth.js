// depth.js: scroll-driven depth meter. Updates the readout, zone label and krill marker.
// Water darkening itself is done with banded section backgrounds in tokens.css (.zone--*).
(() => {
  const MAX_DEPTH = 2000; // meters at the very bottom of the page
  const ZONES = [
    { id: "surface",  from: 0,    label: "SURFACE" },
    { id: "shallows", from: 50,   label: "SHALLOWS" },
    { id: "twilight", from: 300,  label: "TWILIGHT" },
    { id: "midnight", from: 1000, label: "MIDNIGHT" },
    { id: "seabed",   from: 1800, label: "SEABED" },
  ];
  const meter = document.querySelector("[data-depth-meter]");
  if (!meter) return;
  const readout = meter.querySelector("[data-depth-readout]");
  const zoneLabel = meter.querySelector("[data-depth-zone]");
  const marker = meter.querySelector("[data-depth-marker]");
  const root = document.documentElement;
  let ticking = false;

  function update() {
    ticking = false;
    const scrollable = root.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
    const depth = Math.round((progress * MAX_DEPTH) / 10) * 10; // tick in 10 m steps, like a gauge
    const zone = [...ZONES].reverse().find((z) => depth >= z.from) || ZONES[0];
    readout.textContent = depth + " M";
    zoneLabel.textContent = zone.label;
    marker.style.top = progress * 100 + "%";
    if (document.body.dataset.zone !== zone.id) document.body.dataset.zone = zone.id;
    meter.setAttribute("aria-valuenow", String(depth));
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
