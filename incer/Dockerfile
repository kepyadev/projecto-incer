
# Etapa 1: Build da aplicação
FROM node:16.9.1-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Etapa 2: Servir arquivos estáticos com Nginx
FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copia o script de entrypoint e o torna executável
COPY ./docker/nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
