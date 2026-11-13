// MOOYAM Advanced SCAR GEL — configurações principais
const WHATSAPP_NUMBER = "258852703093";
const WHATSAPP_MESSAGE = "Olá! Tenho interesse no MOOYAM Advanced SCAR GEL. Gostaria de saber o preço e como posso fazer a minha encomenda.";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.href = whatsappUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.getElementById("year").textContent = new Date().getFullYear();

// Menu adaptado para telemóveis
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Animações discretas ao entrar no ecrã
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Galeria: quando a fotografia existir, substitui o espaço reservado.
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

document.querySelectorAll(".gallery-item").forEach((item) => {
  const imagePath = item.dataset.gallery;
  const image = new Image();
  image.onload = () => {
    item.style.backgroundImage = `url("${imagePath}")`;
    item.style.backgroundSize = "cover";
    item.style.backgroundPosition = "center";
    item.querySelector(".gallery-placeholder").style.display = "none";
    item.querySelector("strong").style.background = "rgba(255,255,255,.88)";
    item.querySelector("strong").style.padding = "7px 12px";
  };
  image.src = imagePath;

  item.addEventListener("click", () => {
    if (!image.complete || !image.naturalWidth) return;
    lightboxImage.src = imagePath;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
