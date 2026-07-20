/**
 * App.js - Lógica de renderizado de enlaces
 * DuocUC Sede San Joaquín - Linktree
 *
 * Lee LINKS_CONFIG (links.js) e ICON_SET (icons.js),
 * valida las entradas y renderiza Link_Cards en el DOM.
 * Soporta enlaces normales y documentos (modal con visor).
 */

/**
 * Valida una entrada de enlace.
 * @param {Object} entry - Objeto con title, url, icon
 * @returns {boolean} true si la entrada es válida
 */
function isValidEntry(entry) {
  if (entry == null || typeof entry !== 'object') {
    return false;
  }

  var title = entry.title;
  var url = entry.url;

  if (title == null || typeof title !== 'string' || title.trim() === '') {
    return false;
  }

  if (url == null || typeof url !== 'string' || url.trim() === '') {
    return false;
  }

  return true;
}

/**
 * Obtiene el SVG del icono correspondiente al identificador.
 * Búsqueda case-insensitive. Retorna icono por defecto si no existe.
 * @param {string} iconId - Identificador del icono
 * @returns {string} SVG markup del icono
 */
function getIcon(iconId) {
  if (iconId == null || typeof iconId !== 'string' || iconId.trim() === '') {
    return ICON_SET._default;
  }

  var normalizedId = iconId.toLowerCase().trim();

  var keys = Object.keys(ICON_SET);
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].toLowerCase() === normalizedId) {
      return ICON_SET[keys[i]];
    }
  }

  return ICON_SET._default;
}

/**
 * Convierte una URL de Google Drive compartida a URL de preview embebible.
 * Soporta formatos:
 *   - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   - https://drive.google.com/open?id=FILE_ID
 * @param {string} url - URL original de Drive
 * @returns {string} URL para iframe preview
 */
function getDrivePreviewUrl(url) {
  var fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return 'https://drive.google.com/file/d/' + fileIdMatch[1] + '/preview';
  }
  var idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    return 'https://drive.google.com/file/d/' + idMatch[1] + '/preview';
  }
  // Si no es Drive, devolver la URL directamente (para otros embeds)
  return url;
}

/**
 * Abre el modal de documento con la URL proporcionada.
 * @param {string} title - Título del documento
 * @param {string} url - URL del documento
 */
function openDocModal(title, url) {
  var modal = document.getElementById('doc-modal');
  var iframe = document.getElementById('doc-iframe');
  var titleEl = document.getElementById('modal-title');
  var externalLink = document.getElementById('doc-external');

  if (!modal || !iframe) return;

  titleEl.textContent = title;
  iframe.src = getDrivePreviewUrl(url);
  externalLink.href = url;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  // Focus trap: enfocar el botón cerrar
  var closeBtn = modal.querySelector('.modal__close');
  if (closeBtn) closeBtn.focus();
}

/**
 * Cierra el modal de documento.
 */
function closeDocModal() {
  var modal = document.getElementById('doc-modal');
  var iframe = document.getElementById('doc-iframe');

  if (!modal) return;

  modal.hidden = true;
  iframe.src = '';
  document.body.style.overflow = '';
}

/**
 * Crea el elemento DOM de un Link_Card.
 * Si entry.type === "document", el click abre un modal en vez de navegar.
 * @param {Object} entry - Objeto válido con title, url, icon
 * @returns {HTMLElement} Elemento con estructura de Link_Card
 */
function createLinkCard(entry) {
  var isDocument = entry.type === 'document';

  var link;
  if (isDocument) {
    link = document.createElement('button');
    link.type = 'button';
    link.className = 'link-card link-card--document';
    link.setAttribute('aria-label', entry.title + ' (ver documento)');
    link.addEventListener('click', function () {
      openDocModal(entry.title, entry.url);
    });
  } else {
    link = document.createElement('a');
    link.href = entry.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'link-card';
    link.setAttribute('aria-label', entry.title);
  }

  var iconSpan = document.createElement('span');
  iconSpan.className = 'link-card__icon';
  iconSpan.setAttribute('aria-hidden', 'true');
  iconSpan.innerHTML = getIcon(entry.icon);

  var titleSpan = document.createElement('span');
  titleSpan.className = 'link-card__title';
  titleSpan.textContent = entry.title;

  link.appendChild(iconSpan);
  link.appendChild(titleSpan);

  // Badge visual para documentos
  if (isDocument) {
    var badge = document.createElement('span');
    badge.className = 'link-card__badge';
    badge.textContent = 'PDF';
    badge.setAttribute('aria-hidden', 'true');
    link.appendChild(badge);
  }

  return link;
}

/**
 * Renderiza todas las Link_Cards válidas en el contenedor.
 * Filtra entradas inválidas y preserva el orden de las válidas.
 * @param {Array} links - Array de objetos de enlace
 */
function renderLinks(links) {
  var container = document.getElementById('links-container');
  if (!container) {
    return;
  }

  for (var i = 0; i < links.length; i++) {
    if (isValidEntry(links[i])) {
      var card = createLinkCard(links[i]);
      container.appendChild(card);
    }
  }
}

/**
 * Inicializa los eventos del modal de documentos.
 */
function initModal() {
  var modal = document.getElementById('doc-modal');
  if (!modal) return;

  var backdrop = modal.querySelector('.modal__backdrop');
  var closeBtn = modal.querySelector('.modal__close');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDocModal);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeDocModal);
  }

  // Cerrar con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) {
      closeDocModal();
    }
  });
}

/**
 * Inicializa la página renderizando los enlaces desde LINKS_CONFIG.
 * Se ejecuta cuando el DOM está listo.
 */
function initApp() {
  try {
    if (typeof LINKS_CONFIG === 'undefined' || !Array.isArray(LINKS_CONFIG)) {
      return;
    }
    renderLinks(LINKS_CONFIG);
    initModal();
  } catch (error) {
    console.error('Error inicializando enlaces:', error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
