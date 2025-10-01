// BR Moto Sport - JavaScript Principal
// Arquivo: src/js/main.js

console.log('BR Moto Sport - JavaScript carregado!');

// Função para animações suaves
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Função para lazy loading de imagens
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Função para menu mobile
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  lazyLoadImages();
  initMobileMenu();
  
  // Adicionar classe 'loaded' ao body após carregamento
  document.body.classList.add('loaded');
});

// Exportar funções para uso global
window.BRMotoSport = {
  smoothScroll,
  lazyLoadImages,
  initMobileMenu
};
