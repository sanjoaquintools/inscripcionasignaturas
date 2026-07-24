# Inscripción de Asignaturas - Sede San Joaquín

Página tipo Linktree con los recursos de inscripción de asignaturas para estudiantes de la sede San Joaquín.

## 🔗 URL

**[sanjoaquintools.github.io/inscripcionasignaturas](https://sanjoaquintools.github.io/inscripcionasignaturas/)**

## 📋 Contenido

- Opciones horarias 2026 - 2
- Descarga tu horario aquí
- Mallas Curriculares
- Inscribe tus asignaturas aquí
- Sitio Web DuocUC

## ✏️ Cómo editar los enlaces

Edita el archivo `js/links.js`. Cada enlace se define así:

```javascript
{
  title: "Nombre del botón",
  url: "https://enlace-destino.com",
  icon: "web"
}
```

### Iconos disponibles

`instagram` · `facebook` · `youtube` · `linkedin` · `tiktok` · `x` · `whatsapp` · `email` · `web` · `github` · `horario` · `descarga` · `malla` · `inscripcion` · `carpeta`

### Para agregar un enlace

Copia un bloque existente y modifica `title`, `url` e `icon`.

### Para eliminar un enlace

Borra el bloque completo incluyendo las llaves `{}` y la coma.

## 🚀 Deploy

La página se publica automáticamente con GitHub Pages desde la rama `main`.

## 📁 Estructura

```
├── index.html          Página principal
├── css/styles.css      Estilos
├── js/
│   ├── links.js        ← Editar aquí los enlaces
│   ├── icons.js        Iconos SVG
│   └── app.js          Lógica de renderizado
├── logo-duoc.svg       Logo DuocUC
├── san-joaquin.jpg     Foto de perfil
├── favicon.svg         Icono de pestaña
├── og-image.png        Imagen para redes sociales
├── QR.png              Código QR de acceso
└── convertir-og.html   Generador de imágenes con QR
```

## 🎨 Identidad visual

- Negro: `#1A1A1A`
- Blanco: `#FFFFFF`
- Amarillo/Dorado: `#FFB800`
