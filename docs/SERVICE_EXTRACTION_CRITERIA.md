# Cuándo extraer servicios (monolito → servicios)

Criterios sugeridos antes de partir el backend en servicios independientes:

1. **Equipos y límites de despliegue**: varios equipos necesitan publicar por separado o el monolito genera cuellos de botella en release.
2. **Escalado desacoplado**: un dominio (p. ej. notificaciones o informes) requiere réplicas u orden de magnitud de CPU/memoria distinto al API principal.
3. **Aislamiento de fallos**: un módulo inestable debe poder caer sin tumbar checkout ni autenticación.
4. **Datos y límites de transacción**: límites claros de bounded context y poca necesidad de joins transversales en caliente.
5. **Métricas**: latencia p95/p99 o uso de recursos por ruta/job justifica el coste operativo de red, observabilidad y versionado entre servicios.

Hasta que varios de estos puntos se cumplan con evidencia, mantener el monolito modular (capas + colas + workers) suele ser más rentable.
