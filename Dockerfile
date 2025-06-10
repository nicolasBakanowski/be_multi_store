# Usa una imagen de Node.js con soporte para TypeScript
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json tsconfig.json ./

# Instala dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Copia el entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Usa el script de entrada
ENTRYPOINT ["/entrypoint.sh"]
