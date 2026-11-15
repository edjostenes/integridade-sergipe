/* =====================================================================
   Integridade Sergipe Consultoria — JavaScript (Vanilla)
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Menu Mobile ---
  const mobileToggleBtn = document.getElementById("mobile-toggle-btn");
  const navMobile = document.getElementById("nav-mobile");
  const iconMenu = document.getElementById("icon-menu");
  const iconClose = document.getElementById("icon-close");

  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !navMobile.classList.contains("open");
    if (isOpen) {
      navMobile.classList.add("open");
      mobileToggleBtn.setAttribute("aria-expanded", "true");
      iconMenu.style.display = "none";
      iconClose.style.display = "block";
    } else {
      navMobile.classList.remove("open");
      mobileToggleBtn.setAttribute("aria-expanded", "false");
      iconMenu.style.display = "block";
      iconClose.style.display = "none";
    }
  }

  if (mobileToggleBtn && navMobile) {
    mobileToggleBtn.addEventListener("click", () => toggleMobileMenu());

    // Fecha o menu mobile ao clicar em qualquer link interno
    const mobileLinks = navMobile.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => toggleMobileMenu(false));
    });

    // Fecha ao redimensionar para tela desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        toggleMobileMenu(false);
      }
    });
  }

  // --- 2. Animação Reveal ao Rolar a Página ---
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback se não suportar IntersectionObserver
    revealElements.forEach((el) => el.classList.add("active"));
  }
});
