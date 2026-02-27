/* ================================================================
   MAIN.JS — Interacciones del portfolio
   Federico Ariel Casado · 2025
================================================================ */

/* ——— Año automático en el footer ——— */
document.getElementById('year').textContent = new Date().getFullYear();

/* ——— Navbar: clase al scrollear ——— */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ——— Menú hamburguesa ——— */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

/* Cerrar menú al navegar */
navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-label', 'Abrir menú');
  });
});

/* Cerrar menú al hacer click fuera */
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && navMenu.classList.contains('open')) {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  }
});

/* ——— Scroll Reveal (IntersectionObserver) ——— */
function initReveal() {
  const items = document.querySelectorAll('[data-reveal]:not(.revealed)');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

/* ——— Renderizar tarjetas de proyectos ——— */
const grid       = document.getElementById('projectsGrid');
const emptyMsg   = document.getElementById('projectsEmpty');
const filterBtns = document.querySelectorAll('.filter-btn');

function buildCard(project, index) {
  const card = document.createElement('article');
  card.className = 'project-card';
  card.setAttribute('data-reveal', '');
  card.style.transitionDelay = `${index * 75}ms`;

  /* Tags */
  const tagsHtml = (project.tags || [])
    .map(t => `<span class="project-card__tag">${escHtml(t)}</span>`)
    .join('');

  /* Imagen o placeholder */
  const imgHtml = project.image
    ? `<img src="${escHtml(project.image)}" alt="${escHtml(project.title)}" loading="lazy">`
    : '';
  const placeholderClass = project.image ? '' : ' project-card__img--placeholder';
  const placeholderLabel = project.image ? '' : 'SIN IMAGEN';

  /* Botones */
  const linkHtml = project.link
    ? `<a href="${escHtml(project.link)}" target="_blank" rel="noopener noreferrer" class="project-card__link">
         ${escHtml(project.linkLabel || 'Ver más')}
       </a>`
    : '';

  const linkAltHtml = project.linkAlt
    ? `<a href="${escHtml(project.linkAlt)}" target="_blank" rel="noopener noreferrer" class="project-card__link project-card__link--ghost">
         ${escHtml(project.linkAltLabel || 'Demo')}
       </a>`
    : '';

  card.innerHTML = `
    <div class="project-card__img${placeholderClass}">${imgHtml}${placeholderClass ? `<span>${placeholderLabel}</span>` : ''}</div>
    <div class="project-card__body">
      <div class="project-card__tags">${tagsHtml}</div>
      <h3 class="project-card__title">${escHtml(project.title)}</h3>
      <p class="project-card__desc">${escHtml(project.description)}</p>
      <div class="project-card__footer">
        ${linkHtml}
        ${linkAltHtml}
      </div>
    </div>
  `;

  return card;
}

function renderProjects(filter) {
  grid.innerHTML = '';

  const list = (filter === 'all')
    ? PROJECTS
    : PROJECTS.filter(p => {
        const cats = Array.isArray(p.category) ? p.category : [p.category];
        return cats.includes(filter);
      });

  if (list.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }

  emptyMsg.style.display = 'none';

  const fragment = document.createDocumentFragment();
  list.forEach((project, i) => {
    fragment.appendChild(buildCard(project, i));
  });
  grid.appendChild(fragment);

  /* Lanzar reveal para las nuevas tarjetas */
  initReveal();
}

/* Filtros */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

/* ——— Utilidad: escapar HTML para prevenir XSS ——— */
function escHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ——— Inicialización ——— */
renderProjects('all');
initReveal();
