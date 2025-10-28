# Short URL Project

Este proyecto es un acortador de URLs construido con Node.js, Express y Prisma. Permite generar URLs cortas, redirigir a las originales, y llevar un seguimiento de clics.

## Estructura del proyecto
short-url-project/
- backend/ # Backend Express con Prisma
  - src/ # Rutas, controladores, servicios, repositorios
  - prisma/ # Esquema de base de datos y migraciones
  - .env # Variables de entorno
- frontend/
- .gitignore # Ignora archivos innecesarios
- README.md # Este archivo

## Endpoints principales
POST /urls → Acorta una URL

GET /:shortCode → Redirige a la URL original

GET /urls → Lista todas las URLs

DELETE /urls/:shortCode → Elimina una URL

GET /availability/:code → Verifica si un código está disponible

## Tecnologías
- Node.js + Express
- TypeScript
- Prisma + SQLite