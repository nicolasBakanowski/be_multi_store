# Estrategia Next.js vs Express (MULTISTORE)

## Estado actual

- **API y Socket.IO**: Express (`be_multi_store`), JWT en cabecera, CORS explícito.
- **Frontend**: Next.js 14 (páginas cliente), Redux con token en `localStorage` (redux-persist).

## Opciones en Docker / VPS

1. **Mantener Express como BFF de dominio** (recomendado a corto plazo): sockets, colas BullMQ, workers y uploads siguen en un solo proceso Node conocido. Next solo sirve UI y llama al API por URL pública o red interna.

2. **Next Route Handlers como BFF delgado**: útil para unificar cookies HttpOnly, ocultar la URL del API o adaptar respuestas. El dominio pesado (Sequelize, jobs, Socket.IO) puede seguir en Express hasta que haya necesidad real de moverlo.

3. **Socket.IO en el mismo host que el cliente**: en producción, proxy WebSocket (nginx/Caddy) hacia el contenedor API; alinear `NEXT_PUBLIC_SOCKET_URL` con ese origen.

## Recomendación

No duplicar reglas de negocio en dos runtimes sin necesidad. Documentar variables (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SOCKET_URL`, `CORS_ORIGINS`) y, si se adopta cookie HttpOnly, migrar auth en fases (Route Handler + cookie + refresh) con pruebas E2E.
