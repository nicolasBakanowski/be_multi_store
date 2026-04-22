# Inventario API (MULTISTORE backend)

Rutas HTTP: mismos routers montados en la raíz y bajo **`/api/v1`** (alias versionado). Autenticación: header `Authorization: Bearer <jwt>` salvo donde se indica.

| Prefijo | Método | Ruta | Auth | Notas |
|---------|--------|------|------|--------|
| `/user` | POST | `/login` | No | Rate limit estricto |
| `/user` | POST | `/register` | No | Rate limit estricto |
| `/user` | POST | `/authGoogle` | No | Requiere `credential` (JWT de Google) si `GOOGLE_CLIENT_ID` está definido |
| `/order` | GET | `/` | Admin | Lista pedidos (paginación `?limit=&offset=`) |
| `/order` | POST | `/new` | No | Checkout / invitado |
| `/order` | PUT | `/:id` | Admin | Cambio de estado |
| `/category` | * | * | Mixto | Ver `categoryRoute.ts` |
| `/product` | * | * | Mixto | Ver `productRoute.ts` |
| `/status` | GET | * | Público | Catálogo de estados |
| `/earning` | * | * | Admin | Ver `earningRoute.ts` |
| `/lotery` | * | * | Mixto | Alias corregido: `/lottery` |
| `/api-docs` | GET | * | Deshabilitado en `NODE_ENV=production` salvo `SWAGGER_ENABLED=true` | Swagger UI |

## Flujos principales

1. **Login/registro** → JWT en cliente (Redux persist).
2. **Checkout** → `POST /order/new` → Socket `newOrder` a admins.
3. **Admin pedidos** → `GET /order` con Bearer + `roleId=1` → acciones PUT estado.
4. **Cola (BullMQ)** → Tras crear pedido se encola job `order:created` (worker opcional).

## Secretos y `.env`

No versionar `.env`, `.env.development`, `.env.production`. Usar `*.example`. Ver [SECRETS_POLICY.md](./SECRETS_POLICY.md).
