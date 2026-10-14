const STORAGE = {
  favorites: 'nexo_favoritos',
  created: 'nexo_noticias_creadas',
  deleted: 'nexo_noticias_eliminadas'
};

async function loadBaseNews() {
  try {
    const res = await fetch('data/noticias.json');
    if (!res.ok) throw new Error('No fue posible cargar el JSON');
    return await res.json();
  } catch (error) {
    console.warn('Ejecute el proyecto desde un servidor local para cargar data/noticias.json.', error);
    return [];
  }
}

function readJSON(key, fallback = []) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function writeJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

async function getAllNews() {
  const base = await loadBaseNews();
  const created = readJSON(STORAGE.created);
  const deleted = readJSON(STORAGE.deleted);
  return [...base, ...created].filter(n => !deleted.includes(n.id));
}

function cardTemplate(n) {
  return `
    <article class="card">
      <div class="card-media"><img src="${n.imagen}" alt="Imagen relacionada con ${escapeHtml(n.titulo)}"></div>
      <div class="card-body">
        <span class="category">${escapeHtml(n.categoria)}</span>
        <h3>${escapeHtml(n.titulo)}</h3>
        <p>${escapeHtml(n.descripcion)}</p>
        <a class="btn" href="detalle.html?id=${encodeURIComponent(n.id)}">Ver más</a>
      </div>
    </article>`;
}

function escapeHtml(text='') {
  return String(text).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

async function renderHome() {
  const target = document.querySelector('#featured-news');
  if (!target) return;
  const news = await getAllNews();
  target.innerHTML = news.slice(0, 3).map(cardTemplate).join('') || '<div class="empty">No hay noticias disponibles.</div>';
}

async function renderNews() {
  const target = document.querySelector('#news-grid');
  if (!target) return;
  const search = document.querySelector('#search');
  const buttons = [...document.querySelectorAll('[data-category]')];
  const all = await getAllNews();
  let category = 'Todas';
  const paint = () => {
    const term = (search?.value || '').trim().toLowerCase();
    const filtered = all.filter(n => {
      const matchesCategory = category === 'Todas' || n.categoria === category;
      const haystack = `${n.titulo} ${n.descripcion} ${n.categoria}`.toLowerCase();
      return matchesCategory && haystack.includes(term);
    });
    target.innerHTML = filtered.map(cardTemplate).join('') || '<div class="empty">No se encontraron noticias con esos criterios.</div>';
  };
  search?.addEventListener('input', paint);
  buttons.forEach(btn => btn.addEventListener('click', () => {
    category = btn.dataset.category;
    buttons.forEach(b => b.classList.toggle('active', b === btn));
    paint();
  }));
  paint();
}

async function renderDetail() {
  const root = document.querySelector('#detail-root');
  if (!root) return;
  const id = Number(new URLSearchParams(location.search).get('id'));
  const news = await getAllNews();
  const n = news.find(item => Number(item.id) === id) || news[0];
  if (!n) { root.innerHTML = '<div class="empty">No fue posible encontrar la noticia.</div>'; return; }
  root.innerHTML = `
    <div class="detail-meta">${escapeHtml(n.categoria)} · ${escapeHtml(n.fecha || '29 de septiembre de 2026')}</div>
    <h1 class="detail-title">${escapeHtml(n.titulo)}</h1>
    <p class="detail-summary">${escapeHtml(n.descripcion)}</p>
    <div class="detail-layout">
      <img class="detail-image" src="${n.imagen}" alt="Imagen principal de ${escapeHtml(n.titulo)}">
      <aside class="action-panel">
        <h3 style="margin:0">Acciones</h3>
        <button class="btn" id="favorite-btn">Agregar a favoritos</button>
        <a class="btn secondary" href="contacto.html">Contactar</a>
      </aside>
    </div>
    <article class="article"><h2>Resumen de la noticia</h2><p>${escapeHtml(n.contenido || n.descripcion)}</p></article>
    <p style="margin-top:20px"><a class="btn secondary" href="noticias.html">← Volver al listado</a></p>`;
  const button = document.querySelector('#favorite-btn');
  const updateLabel = () => {
    const favs = readJSON(STORAGE.favorites);
    button.textContent = favs.includes(n.id) ? 'Quitar de favoritos' : 'Agregar a favoritos';
  };
  button.addEventListener('click', () => {
    let favs = readJSON(STORAGE.favorites);
    favs = favs.includes(n.id) ? favs.filter(x => x !== n.id) : [...favs, n.id];
    writeJSON(STORAGE.favorites, favs);
    updateLabel();
  });
  updateLabel();
}

async function renderFavorites() {
  const target = document.querySelector('#favorites-grid');
  if (!target) return;
  const all = await getAllNews();
  const favs = readJSON(STORAGE.favorites);
  const selected = all.filter(n => favs.includes(n.id));
  if (!selected.length) {
    target.innerHTML = '<div class="empty"><h3>Sin favoritos todavía</h3><p>Guarda una noticia desde su vista de detalle para consultarla más tarde.</p><a class="btn" href="noticias.html">Explorar noticias</a></div>';
  } else {
    target.innerHTML = selected.map(cardTemplate).join('');
  }
}

function initContact() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const msg = document.querySelector('#form-message');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim();
    const required = ['nombre','email','asunto','mensaje'].every(k => String(data.get(k) || '').trim());
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    msg.className = 'message show ' + (required && validEmail ? 'success' : 'error');
    msg.textContent = required && validEmail
      ? 'Mensaje enviado correctamente. Gracias por contactar a Nexo Diario.'
      : 'Revisa los campos obligatorios y escribe un correo electrónico válido.';
    if (required && validEmail) form.reset();
  });
}

async function initAdmin() {
  const list = document.querySelector('#admin-list');
  const form = document.querySelector('#admin-form');
  if (!list || !form) return;
  const paint = async () => {
    const all = await getAllNews();
    list.innerHTML = all.map(n => `
      <div class="admin-item">
        <div><strong>${escapeHtml(n.titulo)}</strong><span>${escapeHtml(n.categoria)}</span></div>
        <button class="btn danger" data-delete="${n.id}">Eliminar</button>
      </div>`).join('') || '<div class="empty">No hay noticias.</div>';
    list.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', () => deleteNews(Number(btn.dataset.delete))));
  };
  async function deleteNews(id) {
    const created = readJSON(STORAGE.created);
    if (created.some(n => n.id === id)) writeJSON(STORAGE.created, created.filter(n => n.id !== id));
    else {
      const deleted = readJSON(STORAGE.deleted);
      if (!deleted.includes(id)) writeJSON(STORAGE.deleted, [...deleted, id]);
    }
    const favs = readJSON(STORAGE.favorites).filter(x => x !== id);
    writeJSON(STORAGE.favorites, favs);
    await paint();
  }
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(form);
    const title = String(data.get('titulo') || '').trim();
    const category = String(data.get('categoria') || '').trim();
    const description = String(data.get('descripcion') || '').trim();
    const image = String(data.get('imagen') || '').trim();
    if (!title || !category || !description || !image) return;
    const created = readJSON(STORAGE.created);
    created.push({
      id: Date.now(), titulo: title, categoria: category, descripcion: description,
      imagen: image, fecha: '29 de septiembre de 2026',
      contenido: `${description} Esta noticia fue creada desde el mini CRUD del prototipo funcional.`
    });
    writeJSON(STORAGE.created, created);
    form.reset();
    document.querySelector('#admin-message').className = 'message show success';
    document.querySelector('#admin-message').textContent = 'La noticia fue creada y almacenada en el navegador.';
    await paint();
  });
  await paint();
}

document.addEventListener('DOMContentLoaded', () => {
  renderHome(); renderNews(); renderDetail(); renderFavorites(); initContact(); initAdmin();
});
