# Tu Proyecto - Backend

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

2. el servicio de la base de datos esta en el docker-compose, necesitamos levantarlo, en la raiz del proyecto podemos usar el siguiente comando

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

5. con esto ya podemos correr el proyecto

   ```bash
   npm run build
   ```

   ```bash
   npm run start
   ```
