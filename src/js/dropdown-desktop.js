/**
 * BR Moto Sport - Dropdown Desktop
 * Funcionalidade de dropdown para desktop (>1024px)
 * Arquivo: src/js/dropdown-desktop.js
 */

(() => {
  'use strict';

  // Configurações
  const CONFIG = {
    BREAKPOINT: 1024,
    SELECTORS: {
      dropdownBtn: '.btn-dropdown',
      dropdownMenu: '.dropdown-menu',
      header: '.header-main'
    },
    CLASSES: {
      active: 'active',
      headerOpen: 'dropdown-open'
    },
    TIMING: {
      hoverDelay: 100,
      resizeDelay: 150
    }
  };

  // Cache de elementos
  let elements = {};
  let isInitialized = false;
  let hoverTimeout = null;

  /**
   * Verifica se está em desktop
   */
  function isDesktop() {
    return window.innerWidth > CONFIG.BREAKPOINT;
  }

  /**
   * Cache de elementos DOM
   */
  function cacheElements() {
    elements = {
      dropdownBtn: document.querySelector(CONFIG.SELECTORS.dropdownBtn),
      dropdownMenu: document.querySelector(CONFIG.SELECTORS.dropdownMenu),
      header: document.querySelector(CONFIG.SELECTORS.header)
    };
  }

  /**
   * Fecha o dropdown
   */
  function closeDropdown() {
    if (!elements.dropdownMenu || !elements.dropdownBtn) return;

    elements.dropdownMenu.classList.remove(CONFIG.CLASSES.active);
    elements.dropdownBtn.classList.remove(CONFIG.CLASSES.active);
    
    if (elements.header) {
      elements.header.classList.remove(CONFIG.CLASSES.headerOpen);
    }
  }

  /**
   * Abre o dropdown
   */
  function openDropdown() {
    if (!elements.dropdownMenu || !elements.dropdownBtn) return;

    elements.dropdownMenu.classList.add(CONFIG.CLASSES.active);
    elements.dropdownBtn.classList.add(CONFIG.CLASSES.active);
    
    if (elements.header) {
      elements.header.classList.add(CONFIG.CLASSES.headerOpen);
    }
  }

  /**
   * Toggle do dropdown
   */
  function toggleDropdown() {
    if (!elements.dropdownMenu) return;

    const isActive = elements.dropdownMenu.classList.contains(CONFIG.CLASSES.active);
    
    if (isActive) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  /**
   * Handler para clique no botão
   */
  function handleButtonClick(e) {
    if (!isDesktop()) return;
    
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown();
  }

  /**
   * Handler para mouse leave do dropdown
   */
  function handleDropdownLeave() {
    if (!isDesktop()) return;
    closeDropdown();
  }

  /**
   * Handler para mouse leave do botão
   */
  function handleButtonLeave() {
    if (!isDesktop()) return;
    
    hoverTimeout = setTimeout(() => {
      if (!elements.dropdownMenu.matches(':hover')) {
        closeDropdown();
      }
    }, CONFIG.TIMING.hoverDelay);
  }

  /**
   * Handler para mouse enter do dropdown
   */
  function handleDropdownEnter() {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
  }

  /**
   * Handler para cliques fora
   */
  function handleOutsideClick(e) {
    if (!isDesktop()) return;
    
    if (!e.target.closest(CONFIG.SELECTORS.dropdownBtn) && 
        !e.target.closest(CONFIG.SELECTORS.dropdownMenu)) {
      closeDropdown();
    }
  }

  /**
   * Configura event listeners
   */
  function setupEventListeners() {
    if (!elements.dropdownBtn || !elements.dropdownMenu) return;

    // Remove listeners antigos se existirem
    elements.dropdownBtn.removeEventListener('click', handleButtonClick);
    elements.dropdownMenu.removeEventListener('mouseleave', handleDropdownLeave);
    elements.dropdownBtn.removeEventListener('mouseleave', handleButtonLeave);
    elements.dropdownMenu.removeEventListener('mouseenter', handleDropdownEnter);

    // Adiciona novos listeners
    elements.dropdownBtn.addEventListener('click', handleButtonClick);
    elements.dropdownMenu.addEventListener('mouseleave', handleDropdownLeave);
    elements.dropdownBtn.addEventListener('mouseleave', handleButtonLeave);
    elements.dropdownMenu.addEventListener('mouseenter', handleDropdownEnter);
  }

  /**
   * Inicializa o dropdown desktop
   */
  function initDropdownDesktop() {
    if (!isDesktop() || isInitialized) return;
    
    cacheElements();
    setupEventListeners();
    isInitialized = true;
  }

  /**
   * Handler debounced para resize
   */
  function handleResize() {
    clearTimeout(window.desktopDropdownResizeTimeout);
    window.desktopDropdownResizeTimeout = setTimeout(() => {
      if (isDesktop()) {
        initDropdownDesktop();
      } else {
        // Limpa estado quando vai para mobile
        isInitialized = false;
        elements = {};
        closeDropdown();
      }
    }, CONFIG.TIMING.resizeDelay);
  }

  /**
   * Inicialização
   */
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initDropdownDesktop);
    } else {
      setTimeout(initDropdownDesktop, 100);
    }

    // Event listeners globais
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleOutsideClick);
  }

  // Inicializa
  init();
})();
