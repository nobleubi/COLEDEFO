gsap.registerPlugin(ScrollTrigger);

/* PAGE TRANSITION */
const transition = document.getElementById("page-transition");

if (transition) {
  gsap.fromTo(
    transition,
    { y: "0%" },
    { y: "-100%", duration: 0.9, ease: "power4.inOut" }
  );

  document.querySelectorAll("a").forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        e.preventDefault();
        gsap.to(transition, {
          y: "0%",
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => (window.location.href = href)
        });
      });
    }
  });
}

/* SCROLL ANIMATIONS */
gsap.utils.toArray("[data-gsap]").forEach(el => {
  const type = el.dataset.gsap;

  const anim = {
    fade: { opacity: 0, y: 50 },
    left: { opacity: 0, x: -80 },
    right: { opacity: 0, x: 80 },
    scale: { opacity: 0, scale: 0.85 }
  };

  gsap.from(el, {
    ...anim[type],
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      once: true
    }
  });
});

/* STAGGER */
gsap.utils.toArray("[data-gsap='stagger']").forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    delay: i * 0.08,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      once: true
    }
  });
});

/* COUNTERS */
gsap.utils.toArray(".counter").forEach(counter => {
  const target = +counter.dataset.target;
  const obj = { val: 0 };

  ScrollTrigger.create({
    trigger: counter,
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power1.out",
        onUpdate: () => {
          counter.textContent = Math.floor(obj.val) + "+";
        }
      });
    }
  });
});

/* STICKY DONATE */
gsap.to("#donate-cta", {
  scrollTrigger: {
    start: "top 40%"
  },
  opacity: 1,
  y: 0,
  duration: 0.6
});

gsap.to("#donate-cta", {
  scale: 1.05,
  repeat: -1,
  yoyo: true,
  duration: 1.2
});
