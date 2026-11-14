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

  // --- 2. Modal de Documentos Legais ---
  const modalOverlay = document.getElementById("modal-legal");
  const modalTitle = document.getElementById("modal-legal-titulo");
  const modalText = document.getElementById("modal-legal-texto");
  const modalCloseBtn = document.getElementById("modal-legal-close");

  const DOCUMENTOS = {
    privacidade: {
      titulo: "Política de Privacidade",
      texto:
        "A Integridade Sergipe Consultoria trata os dados fornecidos por este site — como nome, e-mail e telefone enviados em pedidos de contato — exclusivamente para responder solicitações e elaborar propostas comerciais. Não compartilhamos dados com terceiros para fins de marketing, e você pode solicitar a correção ou a exclusão dos seus dados a qualquer momento pelo e-mail contato@integridadesergipe.com.br.",
    },
    termos: {
      titulo: "Termos de Uso",
      texto:
        "O conteúdo deste site é apresentado para fins informativos sobre os serviços de compliance e integridade corporativa da Integridade Sergipe Consultoria. Os valores dos planos podem ser ajustados mediante proposta comercial formal. Solicitações de diagnóstico e contratação são analisadas caso a caso, e a prestação dos serviços observa a legislação aplicável, em especial a Lei 8.866/2021.",
    },
  };

  function openLegalModal(tipo) {
    const doc = DOCUMENTOS[tipo];
    if (!doc || !modalOverlay) return;

    modalTitle.textContent = doc.titulo;
    modalText.textContent = doc.texto;
    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLegalModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Event listeners para abrir modal
  const legalTriggers = document.querySelectorAll("[data-legal]");
  legalTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const docType = btn.getAttribute("data-legal");
      openLegalModal(docType);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeLegalModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeLegalModal();
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("open")) {
      closeLegalModal();
    }
  });

  // --- 3. Animação Reveal ao Rolar a Página ---
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
