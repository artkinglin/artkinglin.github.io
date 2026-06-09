const menuButton = document.querySelector(".menu-toggle");
const siteLinks = document.querySelector(".site-links");

if (menuButton && siteLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  siteLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const pageKey = `arthur-portfolio:page:${location.pathname.split("/").pop() || "index.html"}`;
const siteKey = "arthur-portfolio:site-visits";
const sessionKey = "arthur-portfolio:session-counted";
const pageViews = Number(localStorage.getItem(pageKey) || 0) + 1;
localStorage.setItem(pageKey, String(pageViews));

let siteViews = Number(localStorage.getItem(siteKey) || 0);
if (!sessionStorage.getItem(sessionKey)) {
  siteViews += 1;
  localStorage.setItem(siteKey, String(siteViews));
  sessionStorage.setItem(sessionKey, "true");
}

document.querySelectorAll("[data-page-views]").forEach((element) => {
  element.textContent = String(pageViews).padStart(4, "0");
});
document.querySelectorAll("[data-site-views]").forEach((element) => {
  element.textContent = String(siteViews).padStart(4, "0");
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    entry.target.querySelectorAll(".skill-fill").forEach((bar) => {
      bar.style.width = `${bar.dataset.level}%`;
    });
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const stadiumScroll = document.querySelector(".stadium-scroll");
const scene = document.querySelector(".fenway-scene");
const heroContent = document.querySelector(".hero-content");
const layers = document.querySelectorAll(".parallax-layer");

if (stadiumScroll && scene && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;

  const renderStadium = () => {
    const rect = stadiumScroll.getBoundingClientRect();
    const travel = stadiumScroll.offsetHeight - innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / travel));
    const eased = progress * progress * (3 - 2 * progress);

    scene.style.transform = `translateY(${eased * 20}%) scale(${0.9 + eased * 1.18})`;
    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 0);
      const rise = eased * depth * 205;
      const spread = layer.classList.contains("layer-ground") ? 1 + eased * 0.42 : 1 + eased * depth * 0.08;
      layer.style.transform = `translateY(${rise}px) scale(${spread})`;

      if (layer.classList.contains("layer-ground")) {
        layer.style.opacity = String(Math.max(0, 1 - progress * 1.45));
      } else if (layer.classList.contains("layer-warning-track")) {
        layer.style.opacity = String(Math.max(0.15, 1 - progress * 1.08));
      }
    });

    heroContent.style.opacity = String(Math.max(0, 1 - progress * 2.15));
    heroContent.style.transform = `translateY(${progress * -80}px)`;
    ticking = false;
  };

  addEventListener("scroll", () => {
    if (ticking) return;
    requestAnimationFrame(renderStadium);
    ticking = true;
  }, { passive: true });

  renderStadium();
}
