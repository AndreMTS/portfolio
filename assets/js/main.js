/**
* Template Name: iPortfolio
* Updated: Jan 09 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Função para abrir o modal de projeto
   */
  window.openProjectModal = function(button) {
    const projectCard = button.closest('.project-card');
    const modal = document.getElementById('projectModal');
    
    // Preencher o conteúdo do modal
    modal.querySelector('.modal-title').textContent = projectCard.dataset.title;
    modal.querySelector('.modal-body img').src = projectCard.dataset.image;
    modal.querySelector('.modal-body img').alt = projectCard.dataset.title;
    modal.querySelector('#projectDescription').textContent = projectCard.dataset.description;
    
    // Preencher a lista de características
    const featuresList = modal.querySelector('#projectFeatures');
    featuresList.innerHTML = '';
    JSON.parse(projectCard.dataset.features).forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });
    
    // Atualizar o link do projeto
    modal.querySelector('#projectLink').href = projectCard.dataset.link;
    
    // Abrir o modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  };
  
})()

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar AOS
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Inicializar Swiper para as habilidades
  loadSkills();
  
  // Inicializar o rastreamento ocular
  initEyeTracking();

  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    });
  }

  // Verificar tema escuro
  const checkbox = document.getElementById('checkbox');
  if (checkbox) {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    checkbox.checked = darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
  }

  // Back to top button
  const backtotop = document.querySelector('.back-to-top');
  if (backtotop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    });
  }

  // Header scroll class
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    });
  }

  // Navbar links active state on scroll
  const navbarlinks = document.querySelectorAll('.scrollto');
  function navbarlinksActive() {
    const position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      const section = document.querySelector(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navbarlinksActive);
  window.addEventListener('scroll', navbarlinksActive);

  // Smooth scroll para links com classe .scrollto
  document.querySelectorAll('.scrollto').forEach(link => {
    link.addEventListener('click', function(e) {
      if (document.querySelector(this.hash)) {
        e.preventDefault();
        
        // Se menu mobile estiver aberto, feche-o
        const navbar = document.querySelector('.navbar');
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          const navbarToggle = document.querySelector('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
        
        const targetElement = document.querySelector(this.hash);
        const offsetTop = targetElement.offsetTop;
        
        window.scrollTo({
          top: offsetTop - 80, // Ajuste para o header fixo
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile nav toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      document.querySelector('#header').classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  // Função para ajustar a altura dos cards de projetos
  function equalizeProjectCardHeights() {
    const projectCards = document.querySelectorAll('.project-card');
    let maxHeight = 0;
    
    // Resetar alturas
    projectCards.forEach(card => {
      card.style.height = 'auto';
    });
    
    // Encontrar a altura máxima
    projectCards.forEach(card => {
      const height = card.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    
    // Aplicar altura máxima a todos os cards
    projectCards.forEach(card => {
      card.style.height = `${maxHeight}px`;
    });
  }

  // Chamar a função quando a página carregar e quando redimensionar
  window.addEventListener('load', equalizeProjectCardHeights);
  window.addEventListener('resize', equalizeProjectCardHeights);
});

function loadSkills() {
  fetch('assets/skills.json')
    .then(response => response.json())
    .then(data => {
      // Carregar o carrossel
      loadSkillsCarousel(data.skills);
      
      // Carregar a grade
      loadSkillsGrid(data.skills);
    })
    .catch(error => console.error('Erro ao carregar as habilidades:', error));
}

function loadSkillsCarousel(skills) {
  const skillIconsContainer = document.getElementById('skill-icons');
  if (!skillIconsContainer) return;
  
  // Limpar o container primeiro
  skillIconsContainer.innerHTML = '';
  
  // Criar uma quantidade suficiente de cópias para garantir um loop contínuo
  const repeatedSkills = [];
  for (let i = 0; i < 4; i++) {
    repeatedSkills.push(...skills);
  }
  
  repeatedSkills.forEach(skill => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    
    const img = document.createElement('img');
    img.src = `assets/img/skills/${skill}`;
    img.alt = skill.replace('.png', '').replace('.svg', '');
    img.title = skill.replace('.png', '').replace('.svg', '');
    img.className = 'skill-icon';
    img.loading = 'lazy';
    
    slide.appendChild(img);
    skillIconsContainer.appendChild(slide);
  });
  
  // Substituir o Swiper por uma solução CSS pura para animação contínua
  const skillsSlider = document.querySelector('.skills-slider');
  skillsSlider.classList.add('skills-marquee');
  
  // Ajustar a velocidade da animação com base na quantidade de skills
  const marqueeWrapper = document.querySelector('.skills-marquee .swiper-wrapper');
  if (marqueeWrapper) {
    const duration = Math.max(20, skills.length * 1.5);
    marqueeWrapper.style.animationDuration = `${duration}s`;
  }
}

function loadSkillsGrid(skills) {
  const skillsGridContainer = document.getElementById('skills-grid-container');
  if (!skillsGridContainer) return;
  
  // Limpar o container primeiro
  skillsGridContainer.innerHTML = '';
  
  // Ordenar habilidades alfabeticamente para a visualização em grade
  const sortedSkills = [...skills].sort();
  
  sortedSkills.forEach(skill => {
    const skillName = skill.replace('.png', '').replace('.svg', '');
    
    // Criar coluna
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3 skill-grid-item';
    
    // Criar imagem
    const img = document.createElement('img');
    img.src = `assets/img/skills/${skill}`;
    img.alt = skillName;
    img.title = skillName;
    img.loading = 'lazy';
    
    // Criar nome da habilidade
    const name = document.createElement('p');
    name.textContent = formatSkillName(skillName);
    
    // Adicionar elementos
    col.appendChild(img);
    col.appendChild(name);
    skillsGridContainer.appendChild(col);
  });
}

function formatSkillName(name) {
  // Formatar o nome da habilidade para exibição
  // Exemplo: "javascript" -> "JavaScript"
  const specialCases = {
    'html5': 'HTML5',
    'css3': 'CSS3',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'nodejs': 'Node.js',
    'vuejs': 'Vue.js',
    'reactjs': 'React',
    'nextjs': 'Next.js',
    'nuxtjs': 'Nuxt.js',
    'mongodb': 'MongoDB',
    'mysql': 'MySQL',
    'postgresql': 'PostgreSQL',
    'aws': 'AWS',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'git': 'Git',
    'github': 'GitHub',
    'php': 'PHP',
    'laravel': 'Laravel',
    'python': 'Python',
    'django': 'Django',
    'flask': 'Flask',
    'java': 'Java',
    'spring': 'Spring',
    'csharp': 'C#',
    'dotnet': '.NET',
    'angular': 'Angular',
    'vue': 'Vue.js',
    'react': 'React',
    'node': 'Node.js'
  };
  
  return specialCases[name.toLowerCase()] || 
         name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Projects isotope and filter
 */
window.addEventListener('load', () => {
  let projectsContainer = select('.projects-container');
  if (projectsContainer) {
    let projectsIsotope = new Isotope(projectsContainer, {
      itemSelector: '.projects-item',
      layoutMode: 'fitRows'
    });

    let projectsFilters = select('#projects-flters li', true);

    on('click', '#projects-flters li', function(e) {
      e.preventDefault();
      projectsFilters.forEach(function(el) {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      projectsIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
      projectsIsotope.on('arrangeComplete', function() {
        AOS.refresh()
      });
    }, true);
  }
});

/**
 * Skills animation with intersection observer
 */
function setupSkillsAnimation() {
  const skillIcons = document.querySelectorAll('.skill-icon');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillIcons.forEach(icon => {
    observer.observe(icon);
  });
}

function setupDarkModeToggle() {
  // Implementation of setupDarkModeToggle function
}

// Função para rastreamento ocular - com ajustes para movimento mais suave
function initEyeTracking() {
  const leftEye = document.getElementById('leftEye');
  const rightEye = document.getElementById('rightEye');
  
  if (!leftEye || !rightEye) return;

  function moveEyes(e) {
    function calculateEyeMovement(eyeElement, sensitivity = 0.25) {
      const eyeRect = eyeElement.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const maxMoveX = eyeRect.width * sensitivity;
      const maxMoveY = eyeRect.height * sensitivity;
      
      let moveX = Math.cos(angle) * maxMoveX;
      let moveY = Math.sin(angle) * maxMoveY;

      moveX = Math.max(-maxMoveX, Math.min(maxMoveX, moveX));
      moveY = Math.max(-maxMoveY, Math.min(maxMoveY, moveY));

      return { moveX, moveY };
    }

    // Calcular movimento para cada olho
    const rightEyeMovement = calculateEyeMovement(rightEye);
    const leftEyeMovement = calculateEyeMovement(leftEye);
    
    // Aplicar movimento com transição suave
    rightEye.querySelector('.pupil').style.transform = 
      `translate(${rightEyeMovement.moveX}px, ${rightEyeMovement.moveY}px)`;
    leftEye.querySelector('.pupil').style.transform = 
      `translate(${leftEyeMovement.moveX}px, ${leftEyeMovement.moveY}px)`;
  }

  // Adicionar evento de movimento do mouse
  document.addEventListener('mousemove', moveEyes);
  
  // Adicionar suporte para dispositivos móveis
  document.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    moveEyes(touch);
  });
  
  // Animação de piscar ocasionalmente
  function blinkEyes() {
    if (!document.hidden) {
      const originalLeftHeight = leftEye.style.height;
      const originalRightHeight = rightEye.style.height;
      
      leftEye.style.height = '0px';
      rightEye.style.height = '0px';
      
      setTimeout(() => {
        leftEye.style.height = originalLeftHeight;
        rightEye.style.height = originalRightHeight;
      }, 200);
    }
    
    // Piscar a cada 3-8 segundos
    const nextBlink = 3000 + Math.random() * 5000;
    setTimeout(blinkEyes, nextBlink);
  }
  
  // Iniciar a animação de piscar após um pequeno atraso
  setTimeout(blinkEyes, 2000);
}