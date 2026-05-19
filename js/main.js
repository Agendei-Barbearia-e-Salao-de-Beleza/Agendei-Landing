// =====================
// THEME MANAGEMENT
// =====================
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (!localStorage.getItem('theme')) {
      this.currentTheme = this.prefersDark ? 'dark' : 'light';
    }
    
    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateThemeButtons();
    this.setupThemeListeners();
  }

  toggle() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.save();
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.save();
  }

  save() {
    localStorage.setItem('theme', this.currentTheme);
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateThemeButtons();
    this.updateMockupImage();
  }

  updateThemeButtons() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-theme') === this.currentTheme) {
        btn.classList.add('active');
      }
    });
  }

  updateMockupImage() {
    const mockupImg = document.querySelector('.mockup img');
    if (mockupImg) {
      const src = mockupImg.src;
      // Você pode ajustar a imagem conforme o tema aqui
      if (this.currentTheme === 'light') {
        mockupImg.style.filter = 'brightness(0.95) contrast(1.1)';
      } else {
        mockupImg.style.filter = 'brightness(1) contrast(1)';
      }
    }
  }

  setupThemeListeners() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setTheme(e.target.getAttribute('data-theme'));
      });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
      if (!localStorage.getItem('theme')) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.save();
      }
    });
  }
}

// =====================
// SMOOTH SCROLL (LENIS)
// =====================
function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// =====================
// ANIMATIONS
// =====================
class AnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    document.querySelectorAll('.reveal-item').forEach((el) => {
      observer.observe(el);
    });
  }

  setupScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    const heroElements = document.querySelectorAll('.hero-reveal > *');
    if (heroElements.length) {
      gsap.from(heroElements, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      });
    }

    // Mockup animation
    const mockup = document.querySelector('.mockup');
    if (mockup) {
      gsap.from(mockup, {
        scrollTrigger: {
          trigger: mockup,
          start: 'top 90%',
          scrub: 1,
        },
        y: 100,
        scale: 0.9,
        opacity: 0,
        duration: 2,
        ease: 'expo.out',
      });
    }

    // Stagger animations for reveal items
    document.querySelectorAll('.reveal-item').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
      });
    });
  }
}

// =====================
// NAVIGATION
// =====================
class Navigation {
  constructor() {
    this.navBar = document.querySelector('nav');
    this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    this.navMenu = document.querySelector('.nav-menu');
    this.init();
  }

  init() {
    this.setupScrollListener();
    this.setupMobileMenu();
    this.setupNavLinks();
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.navBar.classList.add('scrolled');
      } else {
        this.navBar.classList.remove('scrolled');
      }
    });
  }

  setupMobileMenu() {
    if (!this.mobileMenuBtn) return;

    this.mobileMenuBtn.addEventListener('click', () => {
      this.mobileMenuBtn.classList.toggle('active');
      this.navMenu.style.display =
        this.navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  setupNavLinks() {
    document.querySelectorAll('.nav-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        if (this.mobileMenuBtn) {
          this.mobileMenuBtn.classList.remove('active');
          this.navMenu.style.display = 'none';
        }
      });
    });
  }
}

// =====================
// INTERNATIONALIZATION (i18n)
// =====================
class i18n {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'pt';
    this.translations = {
      pt: {
        // Navigation
        nav_platform: 'Plataforma',
        nav_features: 'Funcionalidades',
        nav_pricing: 'Preços',
        nav_about: 'Sobre',
        nav_enter: 'Entrar',

        // Hero
        hero_title: 'Gerencie sua Barbearia com Precisão',
        hero_desc: 'A plataforma definitiva para barbearias que buscam excelência operacional e faturamento inteligente.',
        btn_start: 'Começar Agora',
        btn_learn: 'Saiba Mais',

        // Features
        feat_title: 'Funcionalidades Poderosas',
        feat_desc: 'Tudo que você precisa para gerenciar sua barbearia de forma eficiente.',
        
        feat_1_title: 'Agenda Dinâmica',
        feat_1_desc: 'Sincronização em tempo real para evitar conflitos e otimizar a produtividade.',
        
        feat_2_title: 'Gestão Financeira',
        feat_2_desc: 'Controle de caixa, despesas e metas com dashboards visuais precisos.',
        
        feat_3_title: 'CRM de Clientes',
        feat_3_desc: 'Histórico completo de serviços para fidelização inteligente.',
        
        feat_4_title: 'Notificações',
        feat_4_desc: 'Alertas em tempo real para não perder nenhum compromisso importante.',
        
        feat_5_title: 'Relatórios',
        feat_5_desc: 'Análises detalhadas do negócio para tomar melhores decisões.',
        
        feat_6_title: 'App Mobile',
        feat_6_desc: 'Gerencie sua barbearia de qualquer lugar com o aplicativo mobile.',

        // Ecosystem
        eco_title: 'Stack de Alta Performance',
        eco_desc: 'Tecnologias que sustentam as maiores plataformas do mundo.',

        // Pricing
        pricing_title: 'Planos e Preços',
        pricing_desc: 'Escolha o plano perfeito para sua barbearia.',
        
        plan_basic: 'Básico',
        plan_pro: 'Profissional',
        plan_enterprise: 'Enterprise',
        
        plan_basic_price: 'Grátis',
        plan_pro_price: 'R$ 99/mês',
        plan_enterprise_price: 'Customizado',
        
        plan_basic_desc: 'Perfeito para começar',
        plan_pro_desc: 'Para barbearias em crescimento',
        plan_enterprise_desc: 'Para grandes operações',

        // FAQ
        faq_title: 'Dúvidas Frequentes',
        faq_q1: 'O sistema é gratuito?',
        faq_a1: 'Sim, temos um plano gratuito com funcionalidades essenciais.',
        faq_q2: 'Posso usar em múltiplos dispositivos?',
        faq_a2: 'Sim, sincronizamos tudo em tempo real em todos os seus dispositivos.',
        faq_q3: 'Há suporte ao cliente?',
        faq_a3: 'Sim, oferecemos suporte 24/7 para todos os nossos clientes.',

        // Footer
        footer_rights: '© 2026 Agendei. Todos os direitos reservados.',
      },
      en: {
        // Navigation
        nav_platform: 'Platform',
        nav_features: 'Features',
        nav_pricing: 'Pricing',
        nav_about: 'About',
        nav_enter: 'Enter',

        // Hero
        hero_title: 'Manage Your Barbershop with Precision',
        hero_desc: 'The ultimate platform for barbershops seeking operational excellence and intelligent revenue.',
        btn_start: 'Get Started',
        btn_learn: 'Learn More',

        // Features
        feat_title: 'Powerful Features',
        feat_desc: 'Everything you need to efficiently manage your barbershop.',
        
        feat_1_title: 'Dynamic Schedule',
        feat_1_desc: 'Real-time sync to prevent conflicts and boost productivity.',
        
        feat_2_title: 'Financial Management',
        feat_2_desc: 'Cash control, expenses, and goals with precise visual dashboards.',
        
        feat_3_title: 'Customer CRM',
        feat_3_desc: 'Complete service history for intelligent loyalty campaigns.',
        
        feat_4_title: 'Notifications',
        feat_4_desc: 'Real-time alerts to never miss an important appointment.',
        
        feat_5_title: 'Reports',
        feat_5_desc: 'Detailed business analytics to make better decisions.',
        
        feat_6_title: 'Mobile App',
        feat_6_desc: 'Manage your barbershop from anywhere with our mobile app.',

        // Ecosystem
        eco_title: 'High Performance Stack',
        eco_desc: 'Technologies that power the world\'s largest platforms.',

        // Pricing
        pricing_title: 'Plans and Pricing',
        pricing_desc: 'Choose the perfect plan for your barbershop.',
        
        plan_basic: 'Basic',
        plan_pro: 'Professional',
        plan_enterprise: 'Enterprise',
        
        plan_basic_price: 'Free',
        plan_pro_price: '$39/month',
        plan_enterprise_price: 'Custom',
        
        plan_basic_desc: 'Perfect for getting started',
        plan_pro_desc: 'For growing barbershops',
        plan_enterprise_desc: 'For large operations',

        // FAQ
        faq_title: 'Frequently Asked Questions',
        faq_q1: 'Is the system free?',
        faq_a1: 'Yes, we have a free plan with essential features.',
        faq_q2: 'Can I use it on multiple devices?',
        faq_a2: 'Yes, we sync everything in real-time across all your devices.',
        faq_q3: 'Is there customer support?',
        faq_a3: 'Yes, we offer 24/7 support for all our customers.',

        // Footer
        footer_rights: '© 2026 Agendei. All rights reserved.',
      },
      es: {
        // Navigation
        nav_platform: 'Plataforma',
        nav_features: 'Características',
        nav_pricing: 'Precios',
        nav_about: 'Acerca de',
        nav_enter: 'Entrar',

        // Hero
        hero_title: 'Gestiona tu Barbería con Precisión',
        hero_desc: 'La plataforma definitiva para barberías que buscan excelencia operativa e ingresos inteligentes.',
        btn_start: 'Comenzar',
        btn_learn: 'Más Información',

        // Features
        feat_title: 'Características Poderosas',
        feat_desc: 'Todo lo que necesitas para gestionar eficientemente tu barbería.',
        
        feat_1_title: 'Agenda Dinámica',
        feat_1_desc: 'Sincronización en tiempo real para evitar conflictos y aumentar productividad.',
        
        feat_2_title: 'Gestión Financiera',
        feat_2_desc: 'Control de caja, gastos y metas con paneles visuales precisos.',
        
        feat_3_title: 'CRM de Clientes',
        feat_3_desc: 'Historial completo de servicios para campañas de lealtad inteligentes.',
        
        feat_4_title: 'Notificaciones',
        feat_4_desc: 'Alertas en tiempo real para no perder citas importantes.',
        
        feat_5_title: 'Reportes',
        feat_5_desc: 'Análisis detallados del negocio para tomar mejores decisiones.',
        
        feat_6_title: 'App Móvil',
        feat_6_desc: 'Gestiona tu barbería desde cualquier lugar con nuestra app móvil.',

        // Ecosystem
        eco_title: 'Stack de Alto Rendimiento',
        eco_desc: 'Tecnologías que impulsan las plataformas más grandes del mundo.',

        // Pricing
        pricing_title: 'Planes y Precios',
        pricing_desc: 'Elige el plan perfecto para tu barbería.',
        
        plan_basic: 'Básico',
        plan_pro: 'Profesional',
        plan_enterprise: 'Empresa',
        
        plan_basic_price: 'Gratis',
        plan_pro_price: '€39/mes',
        plan_enterprise_price: 'Personalizado',
        
        plan_basic_desc: 'Perfecto para comenzar',
        plan_pro_desc: 'Para barberías en crecimiento',
        plan_enterprise_desc: 'Para grandes operaciones',

        // FAQ
        faq_title: 'Preguntas Frecuentes',
        faq_q1: '¿El sistema es gratuito?',
        faq_a1: 'Sí, tenemos un plan gratuito con características esenciales.',
        faq_q2: '¿Puedo usarlo en múltiples dispositivos?',
        faq_a2: 'Sí, sincronizamos todo en tiempo real en todos tus dispositivos.',
        faq_q3: '¿Hay soporte al cliente?',
        faq_a3: 'Sí, ofrecemos soporte 24/7 para todos nuestros clientes.',

        // Footer
        footer_rights: '© 2026 Agendei. Todos los derechos reservados.',
      },
    };
    
    this.init();
  }

  init() {
    this.updatePageLanguage();
    this.setupLanguageButtons();
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.updatePageLanguage();
  }

  updatePageLanguage() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (this.translations[this.currentLang][key]) {
        el.textContent = this.translations[this.currentLang][key];
      }
    });
  }

  setupLanguageButtons() {
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.setLanguage(e.target.getAttribute('data-lang'));
      });
    });
  }

  t(key) {
    return this.translations[this.currentLang][key] || key;
  }
}

// =====================
// FAQ ACCORDION
// =====================
class FAQAccordion {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.faq-item').forEach((i) => {
          if (i !== item) i.classList.remove('active');
        });
        item.classList.toggle('active');
      });
    });
  }
}

// =====================
// INITIALIZATION
// =====================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  const themeManager = new ThemeManager();

  // Initialize smooth scroll
  if (window.Lenis) {
    initSmoothScroll();
  }

  // Initialize animations
  const animationManager = new AnimationManager();

  // Initialize navigation
  const navigation = new Navigation();

  // Initialize i18n
  const i18nManager = new i18n();

  // Initialize FAQ
  const faqAccordion = new FAQAccordion();

  // Initialize Feather Icons
  if (window.feather) {
    window.feather.replace();
  }

  // Add animation class to elements
  document.querySelectorAll('.feature-card, .tech-item, .team-member').forEach((el) => {
    el.classList.add('reveal-item');
  });
});

// Handle responsive nav menu display
window.addEventListener('resize', () => {
  const navMenu = document.querySelector('.nav-menu');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  
  if (window.innerWidth >= 1024) {
    navMenu.style.display = 'flex';
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
  } else if (mobileMenuBtn && !mobileMenuBtn.classList.contains('active')) {
    navMenu.style.display = 'none';
  }
});
