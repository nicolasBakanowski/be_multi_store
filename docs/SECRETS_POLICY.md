# Política de secretos (git)

- No commitear: `.env`, `.env.local`, `.env.development`, `.env.production`, claves privadas, `SECRET_KEY` reales, URLs con credenciales embebidas.
- Mantener actualizados los archivos `*.example` sin valores sensibles.
- Si un secreto llegó al historial: rotar credencial y considerar `git filter-repo` (fuera del alcance rutinario de este repo).
