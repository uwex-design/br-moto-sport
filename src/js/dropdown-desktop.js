/**
 * BR Moto Sport - Dropdown Desktop
 * Funciona apenas em desktop (>1024px)
 * Arquivo: src/js/dropdown-desktop.js
 */

document.addEventListener('DOMContentLoaded', function() {
  // Função unificada para dropdown - APENAS DESKTOP
  function initDropdownMenu() {
    // Executa apenas em desktop (>1024px)
    if (window.innerWidth <= 1024) return;

    const dropdownBtn = document.querySelector('.btn-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const header = document.querySelector('.header-main');
    
    if (dropdownBtn && dropdownMenu) {
      // Função para fechar dropdown
      function closeDropdown() {
        dropdownMenu.classList.remove('active');
        dropdownBtn.classList.remove('active');
        if (header) {
          header.classList.remove('dropdown-open');
        }
      }
      
      // Função para abrir dropdown
      function openDropdown() {
        dropdownMenu.classList.add('active');
        dropdownBtn.classList.add('active');
        if (header) {
          header.classList.add('dropdown-open');
        }
      }
      
      // Click no botão - APENAS DESKTOP
      dropdownBtn.addEventListener('click', function(e) {
        // Verifica novamente se é desktop
        if (window.innerWidth <= 1024) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle das classes
        if (dropdownMenu.classList.contains('active')) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });
      
      // Mouse leave no dropdown (fechar quando sair da área) - APENAS DESKTOP
      dropdownMenu.addEventListener('mouseleave', function() {
        if (window.innerWidth <= 1024) return;
        closeDropdown();
      });
      
      // Mouse leave no botão (fechar quando sair do botão) - APENAS DESKTOP
      dropdownBtn.addEventListener('mouseleave', function() {
        if (window.innerWidth <= 1024) return;
        
        // Pequeno delay para evitar fechamento acidental
        setTimeout(() => {
          // Verificar se o mouse não está sobre o dropdown
          if (!dropdownMenu.matches(':hover')) {
            closeDropdown();
          }
        }, 100);
      });
      
      // Fechar ao clicar fora - APENAS DESKTOP
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) return;
        
        if (!e.target.closest('.btn-dropdown') && 
            !e.target.closest('.dropdown-menu')) {
          closeDropdown();
        }
      });
    }
  }
  
  // Inicializar dropdown desktop
  initDropdownMenu();
  
  // Reinicializar no resize
  window.addEventListener('resize', function() {
    // Delay para evitar execução excessiva
    clearTimeout(window.dropdownResizeTimeout);
    window.dropdownResizeTimeout = setTimeout(initDropdownMenu, 100);
  });
});
