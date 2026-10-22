const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}
document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navigation) navigation.classList.remove("open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
  });
});
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.target || 0);
      const prefix = element.dataset.prefix || "";
      const suffix = element.dataset.suffix || "";
      const duration = 1300;
      const startTime = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        element.textContent = `${prefix}${current}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
      observer.unobserve(element);
    });
  },
  { threshold: 0.45 },
);
document
  .querySelectorAll(".counter")
  .forEach((counter) => counterObserver.observe(counter));
const header = document.querySelector(".site-header");
const updateHeader = () =>
  header?.classList.toggle("scrolled", window.scrollY > 18);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
const heroScene = document.querySelector(".clean-growth-scene");
if (heroScene) {
  const heroSceneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            heroScene.classList.add("hero-ready");
          }, 200);
          heroSceneObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.28 },
  );
  heroSceneObserver.observe(heroScene);
}

const reviewSlider = document.querySelector("[data-review-slider]");
if (reviewSlider) {
  const track = reviewSlider.querySelector(".review-track");
  const cards = [...track.querySelectorAll("blockquote")];
  const previousButton = document.querySelector("[data-review-prev]");
  const nextButton = document.querySelector("[data-review-next]");
  let reviewIndex = 0;
  let reviewTimer;

  const visibleReviews = () => {
    if (window.innerWidth <= 780) return 1;
    if (window.innerWidth <= 1020) return 2;
    return 3;
  };

  const moveReviews = () => {
    const gap = 18;
    const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
    const maximum = Math.max(0, cards.length - visibleReviews());
    reviewIndex = Math.min(reviewIndex, maximum);
    track.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;
  };

  const changeReview = (direction) => {
    const maximum = Math.max(0, cards.length - visibleReviews());
    reviewIndex =
      direction > 0
        ? reviewIndex >= maximum
          ? 0
          : reviewIndex + 1
        : reviewIndex <= 0
          ? maximum
          : reviewIndex - 1;
    moveReviews();
  };

  const startReviews = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearInterval(reviewTimer);
    reviewTimer = window.setInterval(() => changeReview(1), 4800);
  };

  previousButton?.addEventListener("click", () => {
    changeReview(-1);
    startReviews();
  });
  nextButton?.addEventListener("click", () => {
    changeReview(1);
    startReviews();
  });
  reviewSlider.addEventListener("mouseenter", () =>
    window.clearInterval(reviewTimer),
  );
  reviewSlider.addEventListener("mouseleave", startReviews);
  window.addEventListener("resize", moveReviews, { passive: true });
  moveReviews();
  startReviews();
}
