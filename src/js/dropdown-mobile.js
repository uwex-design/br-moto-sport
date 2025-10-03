/**
 * BR Moto Sport - Solução Dropdown Marcas
 * Baseado no código funcional do projeto uroman
 * Arquivo: src/js/dropdown-mobile.js
 */

(() => {
  const marcaConfig = {
    triggerClass: ".btn-dropdown",
    submenuId: "mega-menu",
    name: "Marcas",
  };

  // Configuração do header mobile
  const headerConfig = {
    headerSelector: ".header-main",
    menuToggleSelector: ".menu-hamburger",
    activeClass: "w--open",
    headerActiveClass: "mobile-menu-active"
  };

  /**
   * Configura o monitoramento do header mobile
   */
  function setupMobileHeader() {
    const header = document.querySelector(headerConfig.headerSelector);
    const menuToggle = document.querySelector(headerConfig.menuToggleSelector);

    if (!header || !menuToggle) {
      console.log('Elementos do header mobile não encontrados');
      return;
    }

    // Observer para detectar mudanças na classe do menu toggle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isMenuOpen = menuToggle.classList.contains(headerConfig.activeClass);
          
          if (isMenuOpen) {
            header.classList.add(headerConfig.headerActiveClass);
            console.log('Menu mobile ativo - classe adicionada ao header');
          } else {
            header.classList.remove(headerConfig.headerActiveClass);
            console.log('Menu mobile fechado - classe removida do header');
          }
        }
      });
    });

    // Inicia a observação
    observer.observe(menuToggle, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Verifica estado inicial
    const isInitiallyOpen = menuToggle.classList.contains(headerConfig.activeClass);
    if (isInitiallyOpen) {
      header.classList.add(headerConfig.headerActiveClass);
    }

    console.log('Monitoramento do header mobile configurado!');
  }

  /**
   * Configura o dropdown de marcas
   */
  function setupMarcaDropdown() {
    // Executa apenas em tablet e mobile (até 1024px)
    if (window.innerWidth > 1024) return;

    const triggerLi = document.querySelector(
      `li:has(${marcaConfig.triggerClass})`
    );
    const submenu = document.querySelector(
      `#${marcaConfig.submenuId} .dropdown-menu-list`
    );

    if (!triggerLi || !submenu) {
      console.log("Elementos do dropdown não encontrados");
      return;
    }

    // Move submenu para dentro do item de menu
    triggerLi.appendChild(submenu);
    addSubmenuEvents(submenu);

    // Remove listeners antigos
    triggerLi.removeEventListener("click", handleMarcaClick);

    // Adiciona novo handler
    triggerLi.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown-menu-list a")) {
        e.preventDefault();
        e.stopPropagation();
        handleMarcaClick(e);
      }
    });

    // Previne fechamento em cliques nos links
    const submenuLinks = submenu.querySelectorAll("a");
    submenuLinks.forEach((link) => {
      link.addEventListener("click", (e) => e.stopPropagation());
    });

    console.log("Dropdown Marcas configurado com sucesso!");
  }

  /**
   * Adiciona eventos específicos do submenu
   */
  function addSubmenuEvents(submenu) {
    const listLinks = submenu.querySelectorAll(".dropdown-item-marca");
    listLinks.forEach((link) => {
      link.addEventListener("click", (e) => e.stopPropagation());
    });

    if (submenu) {
      submenu.addEventListener("click", (e) => e.stopPropagation());
    }
  }

  /**
   * Gerencia clique no dropdown de marcas
   */
  function handleMarcaClick(e) {
    // Executa apenas em tablet e mobile
    if (window.innerWidth > 1024) return;

    const submenu = document.querySelector(
      `li:has(${marcaConfig.triggerClass}) .dropdown-menu-list`
    );

    if (!submenu) return;

    const triggerLi = e.currentTarget;
    const isActive = submenu.classList.contains("active");

    if (isActive) {
      closeMarcaDropdown();
      triggerLi.classList.remove("active");
    } else {
      openMarcaDropdown();
      triggerLi.classList.add("active");
    }
  }

  /**
   * Abre o dropdown de marcas
   */
  function openMarcaDropdown() {
    const submenu = document.querySelector(
      `li:has(${marcaConfig.triggerClass}) .dropdown-menu-list`
    );

    if (submenu) {
      // Aplica estilos inline para mostrar o dropdown
      submenu.style.cssText = `
        
      `;

      // Aplica estilos aos itens
      const dropdownItems = submenu.querySelectorAll(".dropdown-item-marca");
      dropdownItems.forEach((item) => {
        item.style.cssText = `
        `;
      });

      submenu.setAttribute("aria-hidden", "false");
      submenu.classList.add("active");
    }
  }

  /**
   * Fecha o dropdown de marcas
   */
  function closeMarcaDropdown() {
    const submenu = document.querySelector(
      `li:has(${marcaConfig.triggerClass}) .dropdown-menu-list`
    );

    if (submenu) {
      submenu.style.cssText = `
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      `;

      submenu.classList.remove("active");
      submenu.setAttribute("aria-hidden", "true");
    }
  }

  // Inicialização
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setupMobileHeader();
      setupMarcaDropdown();
    });
  } else {
    setTimeout(() => {
      setupMobileHeader();
      setupMarcaDropdown();
    }, 100);
  }

  // Reinicializa no resize
  window.addEventListener("resize", () => {
    setTimeout(() => {
      setupMobileHeader();
      setupMarcaDropdown();
    }, 100);
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    // Executa apenas em tablet e mobile
    if (window.innerWidth > 1024) return;

    if (!e.target.closest(`li:has(${marcaConfig.triggerClass})`)) {
      closeMarcaDropdown();
    }
  });

  // Funções globais para compatibilidade
  window.openMarcaDropdown = openMarcaDropdown;
  window.closeMarcaDropdown = closeMarcaDropdown;
})();
