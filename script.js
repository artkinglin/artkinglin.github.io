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
const contactBurst = document.querySelector(".contact-burst");

if (stadiumScroll && scene && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;

  const renderStadium = () => {
    const rect = stadiumScroll.getBoundingClientRect();
    const travel = stadiumScroll.offsetHeight - innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / travel));
    const eased = progress * progress * (3 - 2 * progress);

    scene.style.transform = `scale(${1 + eased * 2.35}) translateY(${eased * 1.5}%)`;
    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 0);
      let exitX = 0;
      let exitY = eased * depth * 18;
      let layerScale = 1 + eased * depth * 0.05;

      if (layer.classList.contains("layer-umpire")) {
        exitY = eased * 270;
        layerScale = 1 + eased * 0.55;
      } else if (layer.classList.contains("layer-catcher")) {
        exitX = eased * -115;
        exitY = eased * 205;
        layerScale = 1 + eased * 0.36;
      } else if (layer.classList.contains("layer-batter")) {
        exitX = eased * 145;
        exitY = eased * 120;
        layerScale = 1 + eased * 0.22;
      } else if (layer.classList.contains("layer-plate")) {
        exitY = eased * 155;
      }

      layer.style.transform = `translate(${exitX}px, ${exitY}px) scale(${layerScale})`;

      if (depth > 1) {
        const fadeStart = depth > 1.4 ? 0.18 : 0.38;
        layer.style.opacity = String(Math.max(0, 1 - Math.max(0, progress - fadeStart) * 1.8));
      }
    });

    if (contactBurst) {
      const ballFlight = Math.max(0, (progress - 0.18) / 0.82);
      contactBurst.setAttribute(
        "transform",
        `translate(${1008 - ballFlight * 208} ${646 - ballFlight * 124}) scale(${1 - ballFlight * 0.36})`
      );
    }

    heroContent.style.opacity = String(Math.max(0, 1 - progress * 2.4));
    heroContent.style.transform = `translateY(${progress * -70}px)`;
    ticking = false;
  };

  addEventListener("scroll", () => {
    if (ticking) return;
    requestAnimationFrame(renderStadium);
    ticking = true;
  }, { passive: true });

  renderStadium();
}
