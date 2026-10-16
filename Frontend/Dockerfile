# ESTÁGIO 1: Compilar o projeto React (Vite)
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Gera a versão final otimizada para produção (pasta /dist)
RUN npm run build

# ESTÁGIO 2: Servir o site compilado usando o Nginx (servidor web rápido)
FROM nginx:alpine

# Copia os arquivos gerados no build para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configura o Nginx para rodar na porta 5170 e suportar rotas do React (SPA)
RUN echo 'server { \
    listen 5170; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expõe a porta 5170 do Frontend
EXPOSE 5170

CMD ["nginx", "-g", "daemon off;"]