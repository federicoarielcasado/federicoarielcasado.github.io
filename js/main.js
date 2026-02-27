/* ================================================================
   MAIN.JS — Interacciones del portfolio
   Federico Ariel Casado · 2026
================================================================ */

/* ——— Año automático en el footer ——— */
document.getElementById('year').textContent = new Date().getFullYear();

/* ——— Contador de proyectos dinámico ——— */
const statProjects = document.getElementById('statProjects');
if (statProjects) statProjects.textContent = PROJECTS.length;

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
});

navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && navMenu.classList.contains('open')) {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  }
});

/* ================================================================
   INTERNACIONALIZACIÓN (ES / EN)
================================================================ */
let currentLang = localStorage.getItem('lang') || 'es';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang]?.[key] !== undefined) el.textContent = I18N[lang][key];
  });

  /* Re-renderizar proyectos con el idioma activo */
  const activeBtn = document.querySelector('.filter-btn.active');
  renderProjects(activeBtn ? activeBtn.dataset.filter : 'all');
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(currentLang === 'es' ? 'en' : 'es');
});

/* ================================================================
   MODAL DE DETALLE
================================================================ */
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalGallery = document.getElementById('modalGallery');
const modalImg     = document.getElementById('modalImg');
const modalPrev    = document.getElementById('modalPrev');
const modalNext    = document.getElementById('modalNext');
const modalDots    = document.getElementById('modalDots');
const modalTitle   = document.getElementById('modalTitle');
const modalDesc    = document.getElementById('modalDesc');
const modalTags    = document.getElementById('modalTags');
const modalLinks   = document.getElementById('modalLinks');

let modalImages     = [];
let modalCurrentImg = 0;

function updateModalImage() {
  if (!modalImages.length) return;
  modalImg.src = modalImages[modalCurrentImg];
  modalImg.alt = `Captura ${modalCurrentImg + 1}`;
  modalDots.querySelectorAll('.modal__dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === modalCurrentImg);
  });
}

function openModal(project) {
  /* Imágenes para la galería */
  modalImages = (project.images && project.images.length > 0)
    ? project.images
    : (project.image ? [project.image] : []);

  if (modalImages.length > 0) {
    modalGallery.classList.remove('hidden');
    modalCurrentImg = 0;
    updateModalImage();

    /* Puntos de navegación */
    modalDots.innerHTML = modalImages.map((_, i) =>
      `<button class="modal__dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="Imagen ${i + 1}"></button>`
    ).join('');
    modalDots.querySelectorAll('.modal__dot').forEach(dot => {
      dot.addEventListener('click', () => {
        modalCurrentImg = parseInt(dot.dataset.i);
        updateModalImage();
      });
    });

    /* Ocultar flechas si hay solo una imagen */
    modalPrev.classList.toggle('hidden', modalImages.length <= 1);
    modalNext.classList.toggle('hidden', modalImages.length <= 1);
  } else {
    modalGallery.classList.add('hidden');
  }

  /* Tags */
  modalTags.innerHTML = (project.tags || [])
    .map(t => `<span class="project-card__tag">${escHtml(t)}</span>`)
    .join('');

  /* Título */
  modalTitle.textContent = project.title;

  /* Descripción completa (párrafos separados con \n\n) */
  const fullDesc = project.descriptionFull || project.description || '';
  modalDesc.innerHTML = fullDesc.split('\n\n')
    .filter(p => p.trim())
    .map(p => `<p>${escHtml(p.trim())}</p>`)
    .join('');

  /* Botones de enlace */
  let linksHtml = '';
  if (project.link)
    linksHtml += `<a href="${escHtml(project.link)}" target="_blank" rel="noopener noreferrer" class="project-card__link">${escHtml(project.linkLabel || getLang('project.btn.view'))}</a>`;
  if (project.linkAlt)
    linksHtml += `<a href="${escHtml(project.linkAlt)}" target="_blank" rel="noopener noreferrer" class="project-card__link project-card__link--ghost">${escHtml(project.linkAltLabel || getLang('project.btn.demo'))}</a>`;
  modalLinks.innerHTML = linksHtml;
  modalLinks.style.display = linksHtml ? '' : 'none';

  /* Abrir */
  modalOverlay.classList.add('open');
  modalOverlay.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* Navegación de galería */
modalPrev.addEventListener('click', () => {
  modalCurrentImg = (modalCurrentImg - 1 + modalImages.length) % modalImages.length;
  updateModalImage();
});
modalNext.addEventListener('click', () => {
  modalCurrentImg = (modalCurrentImg + 1) % modalImages.length;
  updateModalImage();
});

/* Cerrar modal */
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => {
  if (!modalOverlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft')  { modalCurrentImg = (modalCurrentImg - 1 + modalImages.length) % modalImages.length; updateModalImage(); }
  if (e.key === 'ArrowRight') { modalCurrentImg = (modalCurrentImg + 1) % modalImages.length; updateModalImage(); }
});

/* ================================================================
   PROYECTOS: renderizar y filtrar
================================================================ */
const grid       = document.getElementById('projectsGrid');
const emptyMsg   = document.getElementById('projectsEmpty');
const filterBtns = document.querySelectorAll('.filter-btn');

function getLang(key) {
  return I18N[currentLang]?.[key] || key;
}

function buildCard(project, index) {
  const card = document.createElement('article');
  card.className = 'project-card';
  card.setAttribute('data-reveal', '');
  card.style.transitionDelay = `${index * 75}ms`;

  const tagsHtml = (project.tags || [])
    .map(t => `<span class="project-card__tag">${escHtml(t)}</span>`)
    .join('');

  const imgHtml = project.image
    ? `<img src="${escHtml(project.image)}" alt="${escHtml(project.title)}" loading="lazy">`
    : '';
  const placeholderClass = project.image ? '' : ' project-card__img--placeholder';

  /* Botón "Ver detalles" siempre presente */
  const detailBtnLabel = getLang('project.btn.details');
  const detailBtn = `<button class="project-card__detail-btn" data-action="detail">${detailBtnLabel}</button>`;

  /* Botones externos (opcionales) */
  const linkHtml = project.link
    ? `<a href="${escHtml(project.link)}" target="_blank" rel="noopener noreferrer" class="project-card__link">${escHtml(project.linkLabel || getLang('project.btn.view'))}</a>`
    : '';
  const linkAltHtml = project.linkAlt
    ? `<a href="${escHtml(project.linkAlt)}" target="_blank" rel="noopener noreferrer" class="project-card__link project-card__link--ghost">${escHtml(project.linkAltLabel || getLang('project.btn.demo'))}</a>`
    : '';

  card.innerHTML = `
    <div class="project-card__img${placeholderClass}">${imgHtml}</div>
    <div class="project-card__body">
      <div class="project-card__tags">${tagsHtml}</div>
      <h3 class="project-card__title">${escHtml(project.title)}</h3>
      <p class="project-card__desc">${escHtml(project.description)}</p>
      <div class="project-card__footer">
        ${detailBtn}
        ${linkHtml}
        ${linkAltHtml}
      </div>
    </div>
  `;

  /* Abrir modal al hacer click en "Ver detalles" */
  card.querySelector('[data-action="detail"]').addEventListener('click', () => openModal(project));

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

  if (list.length === 0) { emptyMsg.style.display = 'block'; return; }
  emptyMsg.style.display = 'none';

  const fragment = document.createDocumentFragment();
  list.forEach((project, i) => fragment.appendChild(buildCard(project, i)));
  grid.appendChild(fragment);
  initReveal();
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

/* ================================================================
   SCROLL REVEAL
================================================================ */
function initReveal() {
  const items = document.querySelectorAll('[data-reveal]:not(.revealed)');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => observer.observe(el));
}

/* ——— Utilidad: escapar HTML ——— */
function escHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

/* ——— Init ——— */
applyLang(currentLang);
renderProjects('all');
initReveal();
