# Nexo Diario - Entrega 3, Semana 7

Versión final del proyecto del módulo Desarrollo de Front-end. La aplicación migra el prototipo de la semana 5 a Angular mediante componentes standalone, enrutamiento y binding de datos.

## Funcionalidades implementadas
- Home con noticias destacadas.
- Catálogo dinámico cargado desde JSON local.
- Búsqueda y filtros por categoría.
- Vista de detalle mediante rutas con parámetro `id`.
- Favoritos persistentes con `localStorage`.
- Formulario reactivo con validaciones.
- Mini CRUD: creación y eliminación de noticias.
- Componentes reutilizables para header, footer y tarjetas.
- Diseño responsive.

## Estructura Angular
- `src/app/components`: componentes reutilizables.
- `src/app/pages`: vistas del aplicativo.
- `src/app/services/news.service.ts`: datos, favoritos y CRUD.
- `src/assets/data/noticias.json`: información inicial.
- `src/app/app.routes.ts`: navegación.

## Ejecución local
1. Instalar Node.js 18 o superior.
2. Ejecutar `npm install`.
3. Ejecutar `npm start`.
4. Abrir `http://localhost:4200`.

## Compilación
Ejecutar `npm run build`. El resultado queda en `dist/nexo-diario`.

## Publicación
El código queda preparado para GitHub y para despliegue en Netlify, Vercel o GitHub Pages. Para la entrega académica final se deben reemplazar en el informe los campos de URL del repositorio, URL de despliegue y URL del video después de publicarlos desde la cuenta del estudiante.
