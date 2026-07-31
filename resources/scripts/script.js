const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.classList.contains(`nav-${current}`)) {
      link.classList.add("active");
    }
  });
});

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

AOS.init();

document.addEventListener("DOMContentLoaded", function () {
  try {
    const frontendSplide = new Splide("#frontend-splide", {
      type: "loop",
      gap: "20px",
      pagination: false,
      arrows: false,
      drag: "free",
      autoWidth: true,
      autoScroll: { speed: 1, pauseOnHover: true, pauseOnFocus: false },
    });
    frontendSplide.mount({ AutoScroll: window.splide.Extensions.AutoScroll });
  } catch (e) {
    console.error("Frontend splide error:", e);
  }

  try {
    const toolsSplide = new Splide("#tools-splide", {
      type: "loop",
      gap: "20px",
      pagination: false,
      arrows: false,
      drag: "free",
      autoWidth: true,
      autoScroll: { speed: -1, pauseOnHover: true, pauseOnFocus: false },
    });
    toolsSplide.mount({ AutoScroll: window.splide.Extensions.AutoScroll });
  } catch (e) {
    console.error("Tools splide error:", e);
  }
});