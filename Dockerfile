FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY scripts/ ./scripts/
RUN npm install

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
