# Multi-Store - Backend

Este es el backend de la aplicación Tu Proyecto. Este README te guiará a través de los pasos para configurar y ejecutar el backend de la aplicación.

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos antes de continuar:

- [Node.js](https://nodejs.org/): Se recomienda la versión LTS.
- [Docker](https://www.docker.com/): Para ejecutar la base de datos MySQL en un contenedor Docker.

## Configuración Inicial

1. Clone este repositorio en tu máquina local.

   ```bash
   git clone git@github.com:nicolasBakanowski/be_multi_store.git
   ```

2. El servicio de la base de datos está en el `docker-compose.yml`. Para levantarlo puedes ejecutar el siguiente comando:

   ```bash
   docker-compose up
   ```

3. una vez que tenemos el servicio de mysql corriendo necesitamos las tablas, estas estan en las migraciones, para eso necesitamos estar parado en la carpeta src

   ```bash
    npx sequelize-cli db:migrate
   ```

4. de la misma manera que las migraciones necesitamos insertar la data indipensable para el correcto funcionamiento.para eso corremos los seeds con el siguiente comando

   ```bash
   npx sequelize-cli db:seed:all
   ```

5. Con esto ya podemos correr el proyecto

   ```bash
   npm run build
   ```

```bash
npm run start
```

## Linting

Ejecuta ESLint para verificar la calidad del código:

```bash
npm run lint
```

## Ejecución con Docker

Si prefieres utilizar contenedores para todo el entorno ejecuta:

```bash
docker-compose up --build
```

El `entrypoint.sh` instalará las dependencias si es necesario, compilará el código y aplicará las migraciones y seeds automáticamente antes de iniciar la aplicación.
