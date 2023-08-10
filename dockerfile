# Usar la imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de dependencias y de la aplicación
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Instalar las dependencias
RUN npm install

# Compilar TypeScript
RUN npm run build

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "./dist/app.js"]
