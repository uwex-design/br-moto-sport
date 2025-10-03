/**
 * BR Moto Sport - Dropdown Mobile
 * Funcionalidade de dropdown para mobile/tablet (≤1024px)
 * Arquivo: src/js/dropdown-mobile.js
 */

(() => {
  'use strict';

  // Configurações
  const CONFIG = {
    BREAKPOINT: 1024,
    SELECTORS: {
      triggerClass: ".btn-dropdown",
      submenuId: "mega-menu",
      headerSelector: ".header-main",
      menuToggleSelector: ".menu-hamburger",
    },
    CLASSES: {
      active: "w--open",
      headerActive: "mobile-menu-active",
      dropdownActive: "active"
    }
  };

  // Cache de elementos DOM
  let elements = {};
  let isInitialized = false;

  /**
   * Verifica se está em mobile/tablet
   */
  function isMobile() {
    return window.innerWidth <= CONFIG.BREAKPOINT;
  }

  /**
   * Cache de elementos DOM
   */
  function cacheElements() {
    elements = {
      header: document.querySelector(CONFIG.SELECTORS.headerSelector),
      menuToggle: document.querySelector(CONFIG.SELECTORS.menuToggleSelector),
      triggerLi: document.querySelector(`li:has(${CONFIG.SELECTORS.triggerClass})`),
      submenu: document.querySelector(`#${CONFIG.SELECTORS.submenuId} .dropdown-menu-list`)
    };
  }

  /**
   * Configura o monitoramento do header mobile
   */
  function setupMobileHeader() {
    if (!elements.header || !elements.menuToggle) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isMenuOpen = elements.menuToggle.classList.contains(CONFIG.CLASSES.active);
          
          if (isMenuOpen) {
            elements.header.classList.add(CONFIG.CLASSES.headerActive);
          } else {
            elements.header.classList.remove(CONFIG.CLASSES.headerActive);
          }
        }
      });
    });

    observer.observe(elements.menuToggle, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Estado inicial
    if (elements.menuToggle.classList.contains(CONFIG.CLASSES.active)) {
      elements.header.classList.add(CONFIG.CLASSES.headerActive);
    }
  }

  /**
   * Configura o dropdown de marcas
   */
  function setupMarcaDropdown() {
    if (!isMobile() || !elements.triggerLi || !elements.submenu) return;

    // Move submenu para dentro do item de menu
    elements.triggerLi.appendChild(elements.submenu);
    
    // Remove listeners antigos se existirem
    elements.triggerLi.removeEventListener("click", handleMarcaClick);

    // Adiciona novo handler
    elements.triggerLi.addEventListener("click", handleMarcaClick);

    // Previne fechamento em cliques nos links
    elements.submenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", (e) => e.stopPropagation());
    });
  }

  /**
   * Gerencia clique no dropdown de marcas
   */
  function handleMarcaClick(e) {
    if (!isMobile() || e.target.closest(".dropdown-menu-list a")) return;
    
    e.preventDefault();
    e.stopPropagation();

    const isActive = elements.submenu.classList.contains(CONFIG.CLASSES.dropdownActive);

    if (isActive) {
      closeMarcaDropdown();
      elements.triggerLi.classList.remove(CONFIG.CLASSES.dropdownActive);
    } else {
      openMarcaDropdown();
      elements.triggerLi.classList.add(CONFIG.CLASSES.dropdownActive);
    }
  }

  /**
   * Abre o dropdown de marcas
   */
  function openMarcaDropdown() {
    if (!elements.submenu) return;
    
    elements.submenu.setAttribute("aria-hidden", "false");
    elements.submenu.classList.add(CONFIG.CLASSES.dropdownActive);
  }

  /**
   * Fecha o dropdown de marcas
   */
  function closeMarcaDropdown() {
    if (!elements.submenu) return;
    
    elements.submenu.style.cssText = `
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    `;
    
    elements.submenu.classList.remove(CONFIG.CLASSES.dropdownActive);
    elements.submenu.setAttribute("aria-hidden", "true");
  }

  /**
   * Inicializa todas as funcionalidades mobile
   */
  function initMobileFeatures() {
    if (isInitialized) return;
    
    cacheElements();
    setupMobileHeader();
    setupMarcaDropdown();
    isInitialized = true;
  }

  /**
   * Debounced resize handler
   */
  function handleResize() {
    clearTimeout(window.mobileDropdownResizeTimeout);
    window.mobileDropdownResizeTimeout = setTimeout(() => {
      if (isMobile()) {
        initMobileFeatures();
      } else {
        // Limpa estado quando volta para desktop
        isInitialized = false;
        elements = {};
      }
    }, 150);
  }

  /**
   * Handler para cliques fora do dropdown
   */
  function handleOutsideClick(e) {
    if (!isMobile() || !elements.triggerLi) return;
    
    if (!e.target.closest(`li:has(${CONFIG.SELECTORS.triggerClass})`)) {
      closeMarcaDropdown();
    }
  }

  // Inicialização
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initMobileFeatures);
    } else {
      setTimeout(initMobileFeatures, 100);
    }

    // Event listeners
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleOutsideClick);
  }

  // Funções globais para compatibilidade
  window.openMarcaDropdown = openMarcaDropdown;
  window.closeMarcaDropdown = closeMarcaDropdown;

  // Inicializa
  init();
})();
