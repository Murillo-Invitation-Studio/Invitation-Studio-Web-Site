// Animaciones fade-in al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// Filtro de catálogo
function filterCatalog(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.catalog-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}


// Enviar por WhatsApp
function enviarWhatsApp() {
  const nombre = document.querySelector('input[type="text"]').value || 'Sin nombre';
  const tel = document.querySelector('input[type="tel"]').value || 'No indicado';
  const evento = document.querySelector('select').value || 'No seleccionado';
  const fecha = document.querySelector('input[type="date"]').value || 'No indicada';
  const mensaje = document.querySelector('textarea').value || 'Sin mensaje';

  const texto = encodeURIComponent(
    `Hola! Solicito una cotización:\n\n` +
    `👤 Nombre: ${nombre}\n` +
    `📱 Teléfono: ${tel}\n` +
    `🎉 Evento: ${evento}\n` +
    `📅 Fecha: ${fecha}\n` +
    `💬 Detalles: ${mensaje}`
  );

  // ⚠️ IMPORTANTE: Cambia este número por el tuyo real
  window.open(`https://wa.me/523310000000?text=${texto}`, '_blank');
}


// Resaltar navegación activa al hacer scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');

    const link = document.querySelector(`nav a[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < bottom) {
        link.style.color = 'var(--gold-dark)';
      } else {
        link.style.color = '';
      }
    }
  });
});