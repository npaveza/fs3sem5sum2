#FROM node:alpine

#WORKDIR /usr/src/app

#COPY . /usr/src/app

#RUN npm install -g @angular/cli

#RUN npm install

#EXPOSE 4200

#CMD ["ng", "serve", "--host", "0.0.0.0"]

# Imagen base de Angular
#FROM node:18-alpine as build
FROM nginx:alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación Angular
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

# Construye la aplicación Angular
RUN npm run build

# Usa NGINX como base
FROM nginx:alpine

# Copia configuración personalizada de NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Copia el contenido del build de Angular al directorio que NGINX sirve
COPY dist/frontend/browser /usr/share/nginx/html

COPY ./dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80