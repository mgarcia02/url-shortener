# Short URL Project
Este proyecto es un acortador de URLs construido con Node.js, Express, TypeScript y Prisma. Permite:
- Generar URLs cortas personalizadas o automáticas
- Redirigir a la URL original mediante el código corto
- Llevar un seguimiento de clics por URL
- Usar el sistema en modo demo (sin registro) o autenticado

## Estructura del proyecto

```plaintext
short-url-project/
├── backend/          # Backend Express con Prisma
│   ├── src/          # Rutas, controladores, servicios, repositorios
│   ├── prisma/       # Esquema de base de datos y migraciones
│   └── .env          # Variables de entorno
├── frontend/         # Interfaz web con React + Tailwind
├── .gitignore        # Archivos ignorados por Git
└── README.md         # Este archivo
```

## Endpoints principales
| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | /urls/ | Acorta una URL |
| GET | /resolve/:shortCode | Redirige a la URL original |
| GET | /urls/ | Lista todas las URLs |
| DELETE | /urls/:shortCode | Elimina una URL |

## Tecnologías utilizadas
### Backend
- Node.js + Express
- TypeScript
- Prisma + SQLite
- JWT

### Frontend
- React
- Tailwind CSS
- Vite
- Toastify para notificaciones
- LocalStorage para modo demo sin login

## Autenticación
El sistema funciona en dos modos:
- **Modo demo sin registro**
  - Las URLs se guardan localmente en localStorage.
  - No requiere backend ni base de datos.
  - Ideal para probar el sistema sin crear cuenta.

- **Modo autenticado con sesión persistente**
  - Las URLs se guardan en la base de datos y se asocian al usuario.
  - La autenticación se realiza mediante JWT almacenado en cookies HTTP-only, lo que garantiza seguridad frente a ataques XSS.
  - El backend valida el token en cada petición protegida.
  - El frontend detecta si el usuario está autenticado y adapta el comportamiento.