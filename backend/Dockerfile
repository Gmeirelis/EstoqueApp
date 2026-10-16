# 1. Usa uma imagem oficial do Node.js leve
FROM node:20-alpine

# 2. Define onde os arquivos vão ficar dentro do container
WORKDIR /app

# 3. Copia o arquivo de dependências para o container
COPY package*.json ./

# 4. Instala as dependências do Node.js
RUN npm install

# 5. Copia todo o código da pasta backend para dentro do container
COPY . .

# 6. Informa que o backend utiliza a porta 1050
EXPOSE 1050

# 7. Comando para iniciar seu servidor Node
CMD ["node", "server.js"]