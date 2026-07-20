/**
 * Configuración de enlaces - DuocUC Sede San Joaquín
 *
 * Cada enlace tiene las siguientes propiedades:
 * - title: Texto visible del enlace (máximo 60 caracteres)
 * - url: Dirección web de destino (máximo 2048 caracteres)
 * - icon: Identificador del icono (ver lista abajo)
 * - type: (opcional) Si es "document", se abre en un visor modal
 *
 * Iconos disponibles:
 * instagram, facebook, youtube, linkedin, tiktok,
 * x, whatsapp, email, web, github
 *
 * Tipos de enlace:
 * - (sin type): Enlace normal, abre en nueva pestaña
 * - type: "document": Abre un visor PDF en modal (ideal para Google Drive)
 *
 * Para documentos de Google Drive:
 * 1. Suba el PDF a Google Drive
 * 2. Clic derecho > Compartir > "Cualquiera con el enlace puede ver"
 * 3. Copie el enlace y péguelo en la propiedad "url"
 *
 * Para agregar un enlace, copie un bloque existente y modifique los valores.
 * Para eliminar un enlace, borre el bloque completo incluyendo las llaves {}.
 */
var LINKS_CONFIG = [
  {
    title: "Opciones horarias 2025",
    url: "https://drive.google.com/drive/folders/1O92TBFfV6MF_jo55GvEIuVQdwPfsfVUY",
    icon: "web",
  },
  {
    title: "Descarga tu horario aquí",
    url: "https://portalinsc.duoc.cl/webdynpro/resources/duoc.com.student/sicol/StudentSicol?inportal=xi#",
    icon: "web",
  },
  {
    title: "Mallas Curriculares",
    url: "https://drive.google.com/drive/folders/1g2s0PJVOc955NFEXekVegn7PzNGSItVn?usp=sharing",
    icon: "web",
  },
  {
    title: "Sitio Web DuocUC",
    url: "https://www.duoc.cl/",
    icon: "web",
  },
];
