# Nexo Diario - Entrega 2, Semana 5

Prototipo funcional de la aplicación Front-end definida en la entrega de la semana 3.

## Funcionalidades
- Home con noticias destacadas.
- Catálogo renderizado dinámicamente desde `data/noticias.json`.
- Búsqueda y filtros por categoría.
- Vista de detalle por parámetro `id`.
- Favoritos persistidos en `localStorage`.
- Formulario de contacto con validación de campos y correo.
- Mini CRUD para crear y eliminar noticias usando `localStorage`.
- Diseño responsive.

## Ejecución local
Por seguridad de los navegadores, `fetch()` puede bloquear el archivo JSON si se abre directamente con `file://`. Ejecute un servidor local desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Luego abra `http://localhost:8000`.

## Publicación
El proyecto está listo para alojarse en GitHub Pages, Netlify o Vercel. Para la entrega académica se debe crear el repositorio de GitHub y reemplazar en el informe el campo de URL pendiente con la dirección pública correspondiente.
