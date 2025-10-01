// BR Moto Sport - Código Comum
// Arquivo: src/js/common.js

// Inicialização comum para todas as páginas
document.addEventListener('DOMContentLoaded', function() {
  console.log('BR Moto Sport - Página carregada!');
  
  // Inicializar lazy loading
  if (window.BRMotoSport && window.BRMotoSport.lazyLoad) {
    window.BRMotoSport.lazyLoad();
  }
  
  // Adicionar classe loaded ao body
  document.body.classList.add('loaded');
  
  // Inicializar menu mobile
  initMobileMenu();
  
  // Inicializar smooth scroll para links internos
  initSmoothScroll();
});

// Menu mobile
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
}

// Smooth scroll para links internos
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      
      if (window.BRMotoSport && window.BRMotoSport.smoothScroll) {
        window.BRMotoSport.smoothScroll(target);
      }
    });
  });
}
