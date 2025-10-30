(function(){
  const navbar = document.getElementById('navbar');
  const mainNav = document.getElementById('mainNav');
  const toggler = document.querySelector('#navbar .navbar-toggler');
  const togglerIcon = toggler ? toggler.querySelector('i') : null;

  // Navbar background on scroll
  function onScroll(){
    const scrolled = window.scrollY > 20;
    if(scrolled){ navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // Toggle navbar icon on collapse events
  if(mainNav && togglerIcon){
    mainNav.addEventListener('show.bs.collapse', () => {
      togglerIcon.classList.remove('bi-list');
      togglerIcon.classList.add('bi-x');
      // Ensure navbar has background when menu is open (no need to scroll)
      if(navbar){ navbar.classList.add('scrolled'); }
    });
    mainNav.addEventListener('hide.bs.collapse', () => {
      togglerIcon.classList.remove('bi-x');
      togglerIcon.classList.add('bi-list');
      // Remove forced background only if user is at top
      if(navbar && window.scrollY <= 20){ navbar.classList.remove('scrolled'); }
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href') || '';
      if(targetId.length > 1){
        const el = document.querySelector(targetId);
        if(el){
          e.preventDefault();
          const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
          // collapse mobile nav if open
          if(mainNav && mainNav.classList.contains('show')){
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(mainNav);
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // Hero parallax for floating character (desktop)
  const floating = document.querySelector('.floating-char');
  if(floating){
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      floating.style.transform = `translate(${x}px, calc(-50% + ${y}px))`;
    });
  }

  // Servicios expand/collapse
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card) => {
    const full = card.querySelector('.service-full');
    const toggle = card.querySelector('.service-toggle');
    const color = card.getAttribute('data-color') || '#fff';
    card.style.backgroundColor = color;
    if(toggle){
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if(full){ full.classList.toggle('d-none'); }
        toggle.style.transform = expanded ? 'rotate(0deg)' : 'rotate(45deg)';
      });
    }
    card.addEventListener('click', () => {
      const expanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if(full){ full.classList.toggle('d-none'); }
      if(toggle){ toggle.style.transform = expanded ? 'rotate(0deg)' : 'rotate(45deg)'; }
    });
  });

  // Contact form -> WhatsApp
  const contactForm = document.getElementById('contact-form');
  const waDirect = document.getElementById('whatsapp-direct');
  const WA_NUMBER = '50247266960'; // Cambia este número a tu WhatsApp en formato internacional

  function buildWhatsAppUrl(){
    const name = /** @type {HTMLInputElement|null} */(document.getElementById('contact-name'))?.value?.trim() || '';
    const email = /** @type {HTMLInputElement|null} */(document.getElementById('contact-email'))?.value?.trim() || '';
    const company = /** @type {HTMLInputElement|null} */(document.getElementById('contact-company'))?.value?.trim() || '';
    const message = /** @type {HTMLTextAreaElement|null} */(document.getElementById('contact-message'))?.value?.trim() || '';
    const text = `Hola VenWeb!%0A%0A`+
      `Nombre: ${encodeURIComponent(name)}%0A`+
      `Email: ${encodeURIComponent(email)}%0A`+
      `Empresa: ${encodeURIComponent(company)}%0A`+
      `Proyecto: ${encodeURIComponent(message)}`;
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  }

  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = buildWhatsAppUrl();
      window.open(url, '_blank');
    });
  }

  if(waDirect){
    waDirect.addEventListener('click', (e) => {
      // Si hay datos en el formulario, usamos el mensaje construido
      const hasValues = (
        (document.getElementById('contact-name')?.value || '').trim() !== '' ||
        (document.getElementById('contact-email')?.value || '').trim() !== '' ||
        (document.getElementById('contact-message')?.value || '').trim() !== ''
      );
      if(hasValues){
        e.preventDefault();
        const url = buildWhatsAppUrl();
        window.open(url, '_blank');
      }
    });
  }
})();
