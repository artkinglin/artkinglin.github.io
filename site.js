const page = document.body.dataset.page;
const pages = [
  ["Home", "index.html", "home"],
  ["Projects", "projects.html", "projects"],
  ["About", "about.html", "about"],
  ["Contact", "contact.html", "contact"]
];

const links = pages.map(([label, href, id]) =>
  `<a href="${href}"${page === id ? ' aria-current="page"' : ""}>${label}</a>`
).join("");

document.querySelector("[data-site-header]").innerHTML = `
  <a class="skip-link btn" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-inner wrap">
      <a class="logo" href="index.html" aria-label="Krillion home"><img src="assets/krillion-logo.svg" alt="Krillion"></a>
      <nav class="desktop-nav" aria-label="Primary">${links}<a class="btn" href="contact.html">Contact</a></nav>
      <button class="menu-toggle btn" type="button" aria-expanded="false" aria-controls="mobile-menu">Menu</button>
    </div>
  </header>
  <div class="menu-overlay" id="mobile-menu" aria-hidden="true">
    <button class="menu-close btn" type="button">Close</button>
    <div class="menu-panel pixel-box"><nav aria-label="Mobile">${links}</nav></div>
  </div>`;

document.querySelector("[data-site-footer]").innerHTML = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand"><img src="assets/krillion-mark.svg" alt=""><p>Small builds. Big ripple.</p></div>
        <nav class="footer-links" aria-label="Footer">${links}</nav>
        <div class="footer-links">
          <!-- TODO(owner): Replace email address. -->
          <a href="https://github.com/artkinglin">GitHub</a><a href="https://linkedin.com/in/arthur-k-lin">LinkedIn</a><a href="mailto:hello@example.com">Email</a>
        </div>
      </div>
      <div class="footer-bottom">© <span data-year></span> Arthur Lin. Built with care. Press Start to begin again.</div>
    </div>
  </footer>`;

document.querySelectorAll("[data-year]").forEach(node => node.textContent = new Date().getFullYear());
const toggle = document.querySelector(".menu-toggle");
const overlay = document.querySelector(".menu-overlay");
const close = document.querySelector(".menu-close");
const setMenu = open => {
  overlay.classList.toggle("open", open);
  overlay.setAttribute("aria-hidden", String(!open));
  toggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
  (open ? close : toggle).focus();
};
toggle.addEventListener("click", () => setMenu(true));
close.addEventListener("click", () => setMenu(false));
document.addEventListener("keydown", event => { if (event.key === "Escape" && overlay.classList.contains("open")) setMenu(false); });
