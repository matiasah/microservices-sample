# Debian 9
FROM debian:9

# Node 10.16.0
COPY --from=node:10.16.0 / /

# Angular CLI
RUN npm install -g @angular/cli@8.3.19

# Ubicarse en carpeta de proyecto
WORKDIR /usr/src/frontend

# Copiar package.json
COPY package.json /usr/src/frontend/package.json

# Instalar dependencias
RUN npm install