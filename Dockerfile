#FROM node:alpine

#WORKDIR /usr/src/app

#COPY . /usr/src/app

#RUN npm install -g @angular/cli

#RUN npm install

#EXPOSE 4200

#CMD ["ng", "serve", "--host", "0.0.0.0"]

# Imagen base de Angular
FROM node:18-alpine as build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Servidor para Angular
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html

